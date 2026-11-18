# Appointment Booking: Package Files Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this lesson inline. The user requested a guided walkthrough; stop after explaining this lesson rather than implementing the entire application.

**Goal:** Populate and explain the frontend and backend package files.

**Architecture:** Separate npm packages for the React/Vite frontend and Express backend. Backend timezone handling uses Luxon; SQLite will use Node.js built-in support.

**Tech Stack:** Node.js 24, npm, React 19, Vite 7, Express 5, Luxon 3.

**Spec:** ../specs/2026-11-18-appointment-booking-design.md

## Global Constraints
- Teach one small step at a time using existing files.
- No application logic in this lesson.
- Require Node.js >=24.0.0; local version is v24.21.0.

## Review Focus
- Empty existing package files must become valid JSON.
- Both packages must be private to avoid accidental npm publication.
- ES module syntax must be enabled for later imports.
- Run commands must point to the existing backend entry point and Vite frontend.
- Explain that dependencies are declared, not yet installed, and empty source files cannot run the application.

## Task 1: Package configuration and walkthrough

**Files:** Modify frontend/package.json and backend/package.json.

**Interfaces:** Frontend exposes dev/build/preview scripts; backend exposes dev/start scripts. Later lessons supply frontend/src/main.jsx and backend/src/server.js implementations.

- [x] Populate frontend/package.json with private=true, type=module, Node >=24, React/React DOM dependencies, and Vite/@vitejs/plugin-react development dependencies. Scripts: dev=vite, build=vite build, preview=vite preview.
- [x] Populate backend/package.json with private=true, type=module, Node >=24, Express/Luxon dependencies. Scripts: dev=node --watch src/server.js, start=node src/server.js.
- [x] Parse both files using Node, inspect npm's interpretation with npm pkg get, and run git diff --check. This is reversible metadata, so no application test is appropriate yet.
- [x] Explain every field, dependency versus development dependency, version ranges, and the commands. State explicitly that installing dependencies and application startup are later steps.

## Subsequent lessons
Plan each lesson before its implementation: server/app and health endpoint; centralized errors; SQLite and timezone scheduling with tests for overlaps, concurrency, DST, past dates, weekends, and contact requirements; React entry points; form and API; styling and full booking checks. Do not populate those files during this lesson.

## Verification record

Both `npm pkg get` commands succeeded and returned the intended package fields. `git diff --check` passed. Dependencies have not been installed; application code remains empty. The accompanying walkthrough explains the package fields and commands.
