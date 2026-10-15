import { getPrisma } from "@/lib/db/prisma";
import { logSystemEvent } from "@/lib/db/systemEvents";

/**
 * Retention promised in the Privacy policy (legal.privacy, "How long we keep it"):
 * a request is deleted 24 months after it last changed, together with its notes,
 * events and notification logs (onDelete: Cascade). System events carry IP addresses
 * and user agents, so they follow the same limit.
 */
export const RETENTION_MONTHS = 24;

export function retentionCutoff(now: Date, months = RETENTION_MONTHS): Date {
  const cutoff = new Date(now);
  cutoff.setUTCMonth(cutoff.getUTCMonth() - months);
  return cutoff;
}

/** Deletes what is past retention. Never throws; returns what it deleted. */
export async function purgeExpired(now = new Date()): Promise<{ leads: number; events: number }> {
  const db = getPrisma();
  if (!db) return { leads: 0, events: 0 };
  const cutoff = retentionCutoff(now);
  try {
    const leads = await db.lead.deleteMany({ where: { updatedAt: { lt: cutoff } } });
    const events = await db.systemEvent.deleteMany({ where: { createdAt: { lt: cutoff } } });
    if (leads.count || events.count) {
      await logSystemEvent({
        severity: "INFO",
        eventType: "retention.purged",
        message: `Deleted ${leads.count} lead(s) and ${events.count} system event(s) older than ${RETENTION_MONTHS} months`,
      });
    }
    return { leads: leads.count, events: events.count };
  } catch (error) {
    await logSystemEvent({
      severity: "ERROR",
      eventType: "retention.failed",
      message: error instanceof Error ? error.message : "retention purge failed",
    });
    return { leads: 0, events: 0 };
  }
}
