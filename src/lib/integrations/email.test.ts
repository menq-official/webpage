import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { createServer, type Server, type AddressInfo } from "node:net";
import { sendLeadEmail, sendRawEmail } from "./email";

/**
 * Minimal in-process SMTP server: speaks just enough of RFC 5321 for the real
 * nodemailer transport to deliver a message, and records what it received.
 * This exercises our transport options and sendMail call against the
 * installed nodemailer major, with no network access.
 */
type Received = { from: string; to: string[]; data: string };
let server: Server;
let port: number;
const received: Received[] = [];

beforeAll(async () => {
  server = createServer((socket) => {
    let buffer = "";
    let inData = false;
    let current: Received = { from: "", to: [], data: "" };
    socket.write("220 test ESMTP\r\n");
    socket.on("data", (chunk) => {
      buffer += chunk.toString("utf8");
      let idx: number;
      while ((idx = buffer.indexOf("\r\n")) >= 0) {
        const line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 2);
        if (inData) {
          if (line === ".") {
            inData = false;
            received.push(current);
            current = { from: "", to: [], data: "" };
            socket.write("250 OK queued\r\n");
          } else {
            current.data += line + "\n";
          }
          continue;
        }
        const cmd = line.slice(0, 4).toUpperCase();
        if (cmd === "EHLO" || cmd === "HELO") socket.write("250 test\r\n");
        else if (cmd === "MAIL") {
          current.from = line;
          socket.write("250 OK\r\n");
        } else if (cmd === "RCPT") {
          current.to.push(line);
          socket.write("250 OK\r\n");
        } else if (cmd === "DATA") {
          inData = true;
          socket.write("354 go ahead\r\n");
        } else if (cmd === "QUIT") {
          socket.end("221 bye\r\n");
        } else socket.write("250 OK\r\n");
      }
    });
    socket.on("error", () => {});
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  port = (server.address() as AddressInfo).port;
});

afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

const ENV_KEYS = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "EMAIL_FROM", "EMAIL_TO_LEADS"];
const saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
afterEach(() => {
  for (const k of ENV_KEYS) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
  received.length = 0;
});

function useTestSmtp() {
  process.env.SMTP_HOST = "127.0.0.1";
  process.env.SMTP_PORT = String(port);
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  process.env.EMAIL_FROM = "site@menq.test";
  process.env.EMAIL_TO_LEADS = "leads@menq.test";
}

const lead = {
  id: "l1",
  name: "Visitor",
  phone: "+37491001001",
  interestedSolution: "crm",
  message: "Please call me about a CRM.",
  locale: "en",
  createdAt: "2026-10-16T10:00:00.000Z",
};

describe("email integration (nodemailer)", () => {
  it("skips when SMTP is not configured", async () => {
    for (const k of ENV_KEYS) delete process.env[k];
    expect(await sendLeadEmail(lead)).toEqual({ channel: "email", outcome: "skipped" });
    expect(await sendRawEmail({ to: "a@b.test", subject: "s", text: "t" })).toEqual({
      sent: false,
      skipped: true,
    });
  });

  it("delivers a lead notification over SMTP", async () => {
    useTestSmtp();
    expect(await sendLeadEmail(lead)).toEqual({ channel: "email", outcome: "sent" });
    expect(received).toHaveLength(1);
    expect(received[0].from).toContain("site@menq.test");
    expect(received[0].to.join()).toContain("leads@menq.test");
    expect(received[0].data).toContain("Interested solution: crm");
  });

  it("delivers a transactional email over SMTP", async () => {
    useTestSmtp();
    expect(await sendRawEmail({ to: "new@menq.test", subject: "Invite", text: "hello" })).toEqual({
      sent: true,
    });
    expect(received[0].to.join()).toContain("new@menq.test");
  });

  it("reports a failed outcome (not a throw) when the server is unreachable", async () => {
    useTestSmtp();
    process.env.SMTP_PORT = "1"; // nothing listens there
    const r = await sendLeadEmail(lead);
    expect(r.channel).toBe("email");
    expect(r.outcome).toBe("failed");
  });
});
