# Stash

**Remember where you put everything.**

**Live product:** https://stash-home-inventory.lovable.app

Stash is a working, mobile-first product built to solve one simple household problem: **“Where did I put it?”**

It demonstrates an end-to-end product workflow from problem framing and MVP definition through implementation, acceptance testing, iteration, and roadmap planning.

## Product Snapshot

| Area | Current state |
| --- | --- |
| Product stage | **V1, V1.1, and V1.2 shipped** |
| Live demo | **https://stash-home-inventory.lovable.app** |
| Core job | Record where an item is stored and retrieve that location later |
| Product artifacts | [PRD](PRD.md) · [Roadmap](docs/ROADMAP.md) · [Acceptance Testing](docs/TESTING.md) |
| Persistence | Browser localStorage |
| Voice capability | Browser-native Web Speech API |
| Build approach | Mobile-first responsive web application |
| Validation | Manual acceptance testing against predefined criteria |

## Problem

People store household items — tools, seasonal decorations, cables, documents, spare parts, supplies — in places they cannot recall weeks or months later. The result is wasted time searching, duplicate purchases, and low-grade household friction.

Stash exists to answer one question faster:

> **Where did I put it?**

## Target Users

- Homeowners and renters managing storage across multiple rooms
- People with garages, basements, attics, or bin-based storage systems
- Households that store seasonal items for long stretches
- Anyone who has bought a replacement because they could not find the original

## Product Goal

Reduce the time it takes a person to retrieve the location of a stored household item while keeping capture effort low enough that logging items does not feel like a chore.

## Shipped Product

### V1 — MVP

- Add an item with **Item Name**, **Room / Area**, and **Exact Location**
- Optional **Notes**
- Real-time partial-name search
- Item Details screen with the exact storage location emphasized
- Edit any existing item
- Delete with confirmation
- localStorage persistence
- Mobile-first responsive layout
- No login or setup

**Acceptance result: 10 / 10 manual criteria passed.**

### V1.1 — Voice Search

Voice Search was introduced to reduce retrieval friction when typing is inconvenient.

- Microphone control inside the Home search field
- Browser-native speech recognition
- Recognized speech reuses the existing partial-name filter
- Manual typing remains available
- Unsupported browsers and permission failures fall back gracefully

**Acceptance result: 10 / 10 manual criteria passed.**

### V1.2 — Voice Add

Voice Add was introduced to reduce capture friction without removing user control.

- Guided capture for **Item Name → Room / Area → Exact Location → Notes**
- Each spoken response fills the existing form field
- Notes can be spoken or skipped
- Voice-populated fields remain editable
- User can stop or cancel the guided flow
- The app **never auto-saves**
- The user reviews the captured values and explicitly presses **Save Item**

**Acceptance result: 14 / 14 manual criteria passed.**

## Key Product Decisions

### localStorage instead of a backend

The first hypothesis to test was the **single-device capture-and-retrieve loop**. Accounts, authentication, cloud sync, and a backend would add scope without improving that initial test.

Those capabilities are therefore treated as later product bets rather than default infrastructure.

### Guided voice capture instead of one-shot AI parsing

V1.2 captures one field at a time because the immediate goal is reducing typing friction while preserving predictable inputs and explicit user review.

Conversational interpretation remains a future product capability.

### No authentication in the MVP

The initial product optimizes for immediate use. Requiring account creation would introduce friction before the core value proposition had been validated.

## Product Management Artifacts

- **[Product Requirements Document](PRD.md)** — problem, users, scope, stories, functional requirements, acceptance criteria, metrics, risks, tradeoffs, and enhancement requirements
- **[Product Roadmap](docs/ROADMAP.md)** — completed releases and intentionally sequenced future bets
- **[Acceptance Testing](docs/TESTING.md)** — manual test evidence for V1, V1.1, and V1.2

## Tech Stack

- **TanStack Start**
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **shadcn/ui + Radix UI**
- **Web Speech API**
- **localStorage**
- Deployed via Lovable

## Future Roadmap

| Version | Theme | Status |
| --- | --- | --- |
| V1 | MVP — add, search, details, edit, delete, local persistence | Completed |
| V1.1 | Voice Search | Completed |
| V1.2 | Voice Add | Completed |
| V2 | Conversational Retrieval | Planned concept |
| V3 | Photo recognition / storage-bin image assistance | Planned concept |
| V4 | QR storage labels | Planned concept |
| V5 | Shared household inventory | Planned concept |

See the full [Product Roadmap](docs/ROADMAP.md).

## What This Project Demonstrates

1. **Problem framing** — Start with a narrow job to be done rather than a feature list.
2. **MVP discipline** — Keep the first release focused on the capture-and-retrieve loop.
3. **PRD ownership** — Define user stories, functional requirements, constraints, risks, and acceptance criteria before expanding scope.
4. **Evidence-based iteration** — Validate each release against predefined acceptance criteria.
5. **Product tradeoffs** — Explain why localStorage, no authentication, and guided voice capture are appropriate at the current stage.
6. **Roadmap sequencing** — Treat future capabilities as product bets tied to specific friction rather than an undifferentiated wishlist.
7. **Human control** — Voice input assists the user but does not silently persist data.

## Validation Notes

This project has **not** completed formal user research, public adoption measurement, revenue validation, automated test coverage, or a full accessibility/cross-browser audit.

The documented PASS results refer specifically to **manual acceptance testing against the defined release criteria**. No broader product-market-fit or business-outcome claims are made.
