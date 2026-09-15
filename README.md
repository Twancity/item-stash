# Stash

**Remember where you put everything.**

## Problem

People store household items — tools, seasonal decorations, cables, documents, spare parts, supplies — in places they can't recall weeks or months later. The result is wasted time searching, duplicate purchases, and low-grade household friction. Stash exists to answer one question faster: *"Where did I put it?"*

## Target Users

- Homeowners and renters managing storage across multiple rooms
- People with garages, basements, attics, or bin-based storage systems
- Households that store seasonal items for long stretches
- Anyone who buys a replacement because they can't find the original

## MVP Features (V1)

- Add an item with **Item Name**, **Room / Area**, and **Exact Location** (all required)
- Optional **Notes** field for extra context
- **Real-time partial-name search** on the Home screen
- **Item Details** screen with the exact storage location as the dominant visual element
- **Edit** any field of an existing item
- **Delete** an item with a confirmation step
- **localStorage persistence** — items survive a browser refresh
- **Responsive** mobile-first layout that also works on desktop
- No login, no account, no setup

## Shipped Enhancement: V1.1 — Voice Search

- Microphone control inside the existing Home search field
- Uses **browser-native speech recognition** (Web Speech API, including the WebKit-prefixed variant)
- Recognized speech populates the existing search field and reuses the existing real-time partial-name filter
- Listening can be stopped or cancelled
- Manual typing remains available before and after voice use
- Unsupported browsers, denied permission, and recognition errors fall back gracefully

**Acceptance test result: 10 / 10 manual criteria passed.**

## Shipped Enhancement: V1.2 — Voice Add

- **Add by voice** control on the existing Add Item form
- Guided capture sequence for **Item Name → Room / Area → Exact Location → Notes**
- Each spoken response fills the corresponding existing form field
- Notes can be spoken or skipped
- User can stop/cancel the guided flow
- Voice-populated fields remain fully editable
- The app **never auto-saves**; the user reviews the form and presses the existing Save Item button
- Uses the same browser-native speech recognition approach as V1.1
- Existing manual Add, Voice Search, validation, and localStorage behavior remain unchanged

**Acceptance test result: 14 / 14 manual criteria passed.**

## Product Decision: localStorage for V1

localStorage was intentionally selected for V1. The core hypothesis to validate is the *single-device capture-and-retrieve loop*: can a person record a storage location in seconds and find it again later? A backend, accounts, and sync would add cost and scope without testing that loop any better. Multi-device and shared-household storage are deliberately deferred to the roadmap, where they are framed as distinct product bets rather than default infrastructure.

## Tech Stack

- **TanStack Start** (React 19 full-stack framework, file-based routing via TanStack Router)
- **TypeScript**
- **Vite** build tooling
- **Tailwind CSS v4** with a custom semantic token theme
- **shadcn/ui + Radix UI** primitives
- **Web Speech API** (browser-native) for V1.1 Voice Search and V1.2 Voice Add
- **localStorage** for data persistence
- Deployed via Lovable

## Status

- **V1 MVP — Completed.** Shipped baseline.
- **V1.1 Voice Search — Completed.**
- **V1.2 Voice Add — Completed.**

## Acceptance Test Results

- V1: **10 / 10 passed**
- V1.1: **10 / 10 passed**
- V1.2: **14 / 14 passed**

See [docs/TESTING.md](docs/TESTING.md).

## Future Roadmap (Summary)

| Version | Theme | Status |
| --- | --- | --- |
| V1 | MVP — add, search, details, edit, delete, local persistence | Completed |
| V1.1 | Voice Search | Completed |
| V1.2 | Voice Add | Completed |
| V2 | Conversational Retrieval | Planned concept |
| V3 | Photo recognition / storage-bin image assistance | Planned concept |
| V4 | QR storage labels | Planned concept |
| V5 | Shared household inventory | Planned concept |

Full detail: [docs/ROADMAP.md](docs/ROADMAP.md).

## Product Management Approach

1. **Problem** — Framed a single, narrow user pain: forgetting where household items are stored.
2. **PRD** — Wrote scope, non-goals, user stories, and acceptance criteria before building. See [PRD.md](PRD.md).
3. **Prototype** — Built a working V1 rather than static mockups, so the retrieval loop could be exercised end to end.
4. **Acceptance testing** — Validated the shipped baseline manually against pre-defined acceptance criteria.
5. **Iteration** — Shipped V1.1 Voice Search to reduce retrieval friction, then V1.2 Voice Add to reduce capture friction while retaining explicit user review before save.
6. **Roadmap** — Sequenced future bets from conversational retrieval to shared household inventory.

*Note: this project has not been through user research, public release, or adoption/revenue measurement, and has no automated test coverage. No such claims are made.*
