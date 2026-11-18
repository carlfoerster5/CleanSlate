# Appointment booking design

Approved in conversation on 2026-11-18.

## Intent
Build a client appointment booking application while teaching the owner each existing frontend and backend file, one small lesson at a time.

## Requirements
- One appointment at a time; each lasts four hours, with no travel buffer in this first version.
- Starts Monday through Friday, on the hour, from 08:00 through 14:00 inclusive.
- Interpret business dates and times in America/Chicago, including daylight saving changes.
- Require a date, an available start time, an address, a job description, and at least one of email or phone.
- Persist appointments and reject overlapping bookings, including simultaneous submissions.
- Show confirmation after a successful booking. Email and SMS delivery are outside this version.

## Approach
The user selected hourly starts over fixed starts for more flexibility. The frontend requests available slots; the backend recalculates availability during submission and stores the booking atomically. The backend is the authority for validation.

Use the existing React/Vite file structure with Express and SQLite, as proposed and approved. Implementation choice: Node.js 24 built-in SQLite and Luxon for business timezone calculations. SQLite keeps setup local and simple; a hosted, multi-server database can be considered if deployment requires it.

## Learning order
Package files, server and app, error handling, database, availability and booking, frontend entry points, page and form, API integration, styling, final checks. Explain purpose, syntax, connections, and verification at each step.

## Scope and remaining decisions
No administrator interface, payments, cancellations, automated messages, or travel buffer. Do not build these without a request. The user has not specified deployment or a booking horizon. Resolve those before they affect implementation. Reject past dates and starts when availability is implemented.
