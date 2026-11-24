import { DateTime } from "luxon";
import db from "../config/db.js";

const TIME_ZONE = "America/Chicago"
const FIRST_START_HOUR = 8;
const LAST_START_HOUR = 14;
const APPOINTMENT_HOURS = 4;

const findOverlap = db.prepare(`
  SELECT id
  FROM appointments
  WHERE starts_at < ?
    AND ends_at > ?
  LIMIT 1
`);

export default function getAvailableSlots(date) {
  if (
    typeof date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date)
  ) {
    throw new Error("Date must use YYYY-MM-DD format.");
  }

  const day = DateTime.fromISO(date, {
    zone: TIME_ZONE,
    locale: "en-US"
  });

  if (!day.isValid) {
    throw new Error("Please provide a valid calendar date.");
  }

  if (day.weekday > 5) {
    return [];
  }

  const now = DateTime.now().toMillis();
  const availableSlots = [];

  for (
    let hour = FIRST_START_HOUR;
    hour <= LAST_START_HOUR;
    hour++
  ) {
    const start = day.set({
      hour,
      minute: 0,
      second: 0,
      millisecond: 0
    });

    const end = start.plus({ hours: APPOINTMENT_HOURS });

    const startsAt = start.toMillis();
    const endsAt = end.toMillis();

    if (startsAt <= now) {
      continue;
    }

    const overlap = findOverlap.get(endsAt, startsAt);

    if (overlap) {
      continue;
    }

    availableSlots.push({
      startsAt,
      endsAt,
      label: start.toFormat("h:mm a")
    });
  }

  return availableSlots;
}
