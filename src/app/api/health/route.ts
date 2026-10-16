import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DB_CHECK_TIMEOUT_MS = 2000;

/** True when a trivial query answers within the timeout. Never throws. */
async function dbReachable(): Promise<boolean> {
  const db = getPrisma();
  if (!db) return false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error("timeout")), DB_CHECK_TIMEOUT_MS);
    });
    await Promise.race([db.$queryRaw`SELECT 1`, timeout]);
    return true;
  } catch {
    return false;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/**
 * Liveness + DB reachability for uptime monitors. Always 200 while the app
 * process answers; `db` says whether the database responded. Exposes no
 * secrets, versions or error details.
 */
export async function GET() {
  return NextResponse.json(
    { ok: true, db: await dbReachable() },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}
