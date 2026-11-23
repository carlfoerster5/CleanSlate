import { DatabaseSync } from "node:sqlite"
import { mkdirSync } from "node:fs"

const dataDirectory = new URL("../../data/", import.meta.url);

mkdirSync(dataDirectory, { recursive: true });

const databaseFile = new URL("appointments.sqlite", dataDirectory);

const db = new DatabaseSync(databaseFile);

db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY,
    starts_at INTEGER NOT NULL,
    ends_at INTEGER NOT NULL,
    address TEXT NOT NULL,
    job_description TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    CHECK (ends_at > starts_at),
    CHECK (
      length(trim(coalesce(email, ''))) > 0
      OR length(trim(coalesce(phone, ''))) > 0
    )
  );
`);

export default db;