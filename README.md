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

## Product Decision: localStorage for V1

localStorage was intentionally selected for V1. The core hypothesis to validate is the *single-device capture-and-retrieve loop*: can a person record a storage location in seconds and find it again later? A backend, accounts, and sync would add cost and scope without testing that loop any better. Multi-device and shared-household storage are deliberately deferred to the roadmap, where they are framed as distinct product bets rather than default infrastructure.

## Tech Stack

- **TanStack Start** (React 19 full-stack framework, file-based routing via TanStack Router)
- **TypeScript**
- **Vite** build tooling
- **Tailwind CSS v4** with a custom semantic token theme
- **shadcn/ui + Radix UI** primitives
- **localStorage** for data persistence
- Deployed via Lovable

## MVP Status

**Completed.**

## Acceptance Test Result

**10 / 10 passed.** See [docs/TESTING.md](docs/TESTING.md).

## Future Roadmap (Summary)

| Version | Theme | Status |
| --- | --- | --- |
| V1 | MVP — add, search, details, edit, delete, local persistence | Completed |
| V1.1 | Voice Search | Planned concept |
| V1.2 | Voice Add | Planned concept |
| V2 | Conversational Retrieval | Planned concept |
| V3 | Photo recognition / storage-bin image assistance | Planned concept |
| V4 | QR storage labels | Planned concept |
| V5 | Shared household inventory | Planned concept |

Full detail: [docs/ROADMAP.md](docs/ROADMAP.md).

## Product Management Approach

1. **Problem** — Framed a single, narrow user pain: forgetting where household items are stored.
2. **PRD** — Wrote scope, non-goals, user stories, and acceptance criteria before building. See [PRD.md](PRD.md). The guiding rule: if a feature doesn't help answer "Where did I put it?" faster, it isn't in V1.
3. **Prototype** — Built a working V1 rather than static mockups, so the retrieval loop could be exercised end to end.
4. **Acceptance testing** — Ran the 10 pre-defined acceptance criteria manually against the build; all passed.
5. **Iteration** — Kept V1 within its defined scope, deferring anything that did not shorten the path to "Where did I put it?".
6. **Roadmap** — Sequenced future bets from lowest-friction capture (voice) to highest-coordination value (shared household inventory).

*Note: this project has not been through user research, public release, or adoption/revenue measurement, and has no automated test coverage. No such claims are made.*
