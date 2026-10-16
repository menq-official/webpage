import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Module mocks: no DB, no Next request context, no SMTP ──
const db = {
  user: { findUnique: vi.fn(), create: vi.fn(), upsert: vi.fn(), update: vi.fn() },
  inviteToken: { findUnique: vi.fn(), create: vi.fn(), updateMany: vi.fn() },
  role: { findUnique: vi.fn() },
  userRole: { upsert: vi.fn() },
  session: { deleteMany: vi.fn() },
};
const sendRawEmail = vi.fn();
const redirect = vi.fn((url: string) => {
  throw new Error(`REDIRECT:${url}`);
});

vi.mock("@/lib/db/prisma", () => ({ getPrisma: () => db }));
vi.mock("@/lib/db/systemEvents", () => ({ logSystemEvent: vi.fn() }));
vi.mock("@/lib/integrations/email", () => ({ sendRawEmail: (...a: unknown[]) => sendRawEmail(...a) }));
vi.mock("next/navigation", () => ({ redirect: (u: string) => redirect(u) }));
vi.mock("next/headers", () => ({
  headers: async () => new Headers(),
  cookies: async () => ({ get: () => undefined, set: vi.fn(), delete: vi.fn() }),
}));
vi.mock("@/lib/adminI18n", async () => {
  const { adminEn } = await import("@/content/admin/en");
  return { getAdminDict: async () => adminEn };
});
vi.mock("./audit", () => ({ writeAuditLog: vi.fn() }));
vi.mock("./password", () => ({
  hashPassword: async (p: string) => `hash:${p}`,
  verifyPassword: vi.fn(),
  verifyDummyPassword: vi.fn(),
  isPasswordStrong: (p: string) => p.length >= 10,
}));
vi.mock("./rbac", () => ({
  getCurrentUser: vi.fn(),
  requirePermission: async () => ({ id: "admin-1", isSuperAdmin: false }),
}));

const { acceptInviteAction, createInviteAction } = await import("./actions");
const { adminEn } = await import("@/content/admin/en");

function form(fields: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

const validInvite = {
  id: "inv-1",
  email: "boss@menq.test",
  roleKey: "viewer",
  createdById: "admin-1",
  acceptedAt: null,
  expiresAt: new Date(Date.now() + 60_000),
};

beforeEach(() => {
  vi.clearAllMocks();
  db.inviteToken.findUnique.mockResolvedValue(validInvite);
  db.inviteToken.updateMany.mockResolvedValue({ count: 1 });
  db.inviteToken.create.mockResolvedValue({});
  db.role.findUnique.mockResolvedValue(null);
  db.session.deleteMany.mockResolvedValue({ count: 0 });
});

describe("acceptInviteAction", () => {
  it("never overwrites an existing (ACTIVE) user's password", async () => {
    db.user.findUnique.mockResolvedValue({ id: "super-1", status: "ACTIVE" });
    const r = await acceptInviteAction({}, form({ token: "t", password: "attacker-pass-123" }));
    expect(r.error).toBe(adminEn.errors.inviteInvalid);
    expect(db.user.upsert).not.toHaveBeenCalled();
    expect(db.user.update).not.toHaveBeenCalled();
    expect(db.user.create).not.toHaveBeenCalled();
    expect(db.inviteToken.updateMany).not.toHaveBeenCalled();
  });

  it("rejects when the account appears concurrently (unique constraint)", async () => {
    db.user.findUnique.mockResolvedValue(null);
    db.user.create.mockRejectedValue(new Error("P2002 unique constraint"));
    const r = await acceptInviteAction({}, form({ token: "t", password: "long-enough-pw" }));
    expect(r.error).toBe(adminEn.errors.inviteInvalid);
    expect(db.user.upsert).not.toHaveBeenCalled();
  });

  it("creates a new user and revokes that user's sessions", async () => {
    db.user.findUnique.mockResolvedValue(null);
    db.user.create.mockResolvedValue({ id: "new-1" });
    await expect(
      acceptInviteAction({}, form({ token: "t", password: "long-enough-pw" })),
    ).rejects.toThrow("REDIRECT:/admin/login?invited=1");
    expect(db.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ email: validInvite.email, passwordHash: "hash:long-enough-pw" }),
      }),
    );
    expect(db.session.deleteMany).toHaveBeenCalledWith({ where: { userId: "new-1" } });
  });
});

describe("createInviteAction", () => {
  it("refuses an email that already belongs to an account", async () => {
    db.user.findUnique.mockResolvedValue({ id: "super-1" });
    const r = await createInviteAction({ email: " Boss@MenQ.test ", roleKey: "viewer" });
    expect(r).toEqual({ error: adminEn.errors.emailInUse });
    expect(db.user.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { email: "boss@menq.test" } }),
    );
    expect(db.inviteToken.create).not.toHaveBeenCalled();
    expect(sendRawEmail).not.toHaveBeenCalled();
  });

  it("does not return the raw link when the invite email was delivered", async () => {
    db.user.findUnique.mockResolvedValue(null);
    sendRawEmail.mockResolvedValue({ sent: true });
    const r = await createInviteAction({ email: "new@menq.test", roleKey: "viewer" });
    expect(r).toEqual({ ok: true });
  });

  it("returns the link only when email delivery is unavailable (SMTP off)", async () => {
    db.user.findUnique.mockResolvedValue(null);
    sendRawEmail.mockResolvedValue({ sent: false, skipped: true });
    const r = await createInviteAction({ email: "new@menq.test", roleKey: "viewer" });
    expect(r.ok).toBe(true);
    expect(r.link).toMatch(/\/admin\/accept-invite\?token=[0-9a-f]{64}$/);
  });

  it("returns the link when sending throws", async () => {
    db.user.findUnique.mockResolvedValue(null);
    sendRawEmail.mockRejectedValue(new Error("smtp down"));
    const r = await createInviteAction({ email: "new@menq.test", roleKey: "viewer" });
    expect(r.ok).toBe(true);
    expect(r.link).toBeDefined();
  });
});
