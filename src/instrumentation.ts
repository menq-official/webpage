const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Runs once when the server starts. The site is a single long-lived Node process, so the
 * retention purge runs here: a minute after start, then once a day. No cron and no secret.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || !process.env.DATABASE_URL) return;
  const { purgeExpired } = await import("@/lib/retention/purge");
  const run = () => void purgeExpired();
  setTimeout(run, 60_000).unref?.();
  setInterval(run, DAY_MS).unref?.();
}
