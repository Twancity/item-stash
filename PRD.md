# Stash — Product Requirements Document (V1)

**Tagline:** Remember where you put everything.
**Status:** V1 MVP completed.

## 1. Product Overview

Stash is a responsive, mobile-first web application for recording where household items are stored and retrieving that location later through search. A user captures an item's name, the room it lives in, and its exact storage spot. Later, a partial-name search surfaces it in seconds.

## 2. Problem Statement

Household items are stored in places people cannot recall later — bins, drawers, shelves, closets, attics. The cost is repeated searching, duplicate purchases, and frustration. Existing home-inventory tools optimize for insurance valuation or asset cataloging, which requires heavy data entry and does not solve fast retrieval.

## 3. Target Users

- Homeowners and renters with storage spread across multiple rooms
- Households with garages, basements, attics, or bin-based storage
- People who store seasonal items for long periods
- Anyone who has re-bought an item they already owned

## 4. Product Goal

Reduce the time it takes a person to answer **"Where did I put it?"** to a few seconds, with capture effort low enough that people actually log items.

## 5. Non-Goals (V1)

- User accounts, authentication, or profiles
- Cloud database, backend services, or cross-device sync
- Multi-user or shared household inventories
- Photos, barcodes, QR codes, or voice input
- Quantities, values, insurance/warranty tracking, expiration dates
- Categories, tags, sorting, or filtering beyond name search
- Notifications, reminders, or analytics dashboards

## 6. MVP Scope

Three screens only:

1. **Home / Search** — logo, tagline, prominent search field, Add Item button, list of saved items (name, room/area, exact location).
2. **Add Item** — form with Item Name (required), Room / Area (required), Exact Location (required), Notes (optional), Save Item.
3. **Item Details** — name, room, exact location (visually dominant), notes if present, Edit and Delete actions.

Plus: edit flow for all fields, delete with confirmation, and localStorage persistence.

## 7. User Stories

| # | As a… | I want to… | So that… |
| --- | --- | --- | --- |
| 1 | household member | record an item and its exact storage spot in seconds | logging doesn't feel like a chore |
| 2 | user | search by part of an item's name | I don't have to remember exact wording |
| 3 | user | see the exact location prominently | I can act on it at a glance |
| 4 | user | add optional notes | I can capture context like "outdoor lights only" |
| 5 | user | edit an item | the record stays accurate when I move things |
| 6 | user | delete an item, with a confirmation | I can clean up without losing data by accident |
| 7 | user | have my items persist after closing the browser | the app is worth using long term |
| 8 | user | use it on my phone while standing in the garage | I can log and look up items where they live |
| 9 | first-time user | start immediately without signing up | there's no barrier to trying it |

## 8. Functional Requirements

- **FR-1** Item Name, Room / Area, and Exact Location are required; save is blocked until all three are provided.
- **FR-2** Notes are optional and only rendered on the details screen when present.
- **FR-3** Search filters the item list in real time on partial, case-insensitive item-name matches (e.g. "christmas" matches "Christmas Lights").
- **FR-4** Selecting an item opens its details screen.
- **FR-5** The exact storage location is the most visually prominent element on the details screen.
- **FR-6** Edit pre-fills all current values and applies updates immediately on save.
- **FR-7** Delete requires an explicit confirmation before removal.
- **FR-8** After adding or editing, the user is returned to the relevant screen with the change visible.
- **FR-9** All items are persisted to browser localStorage and reloaded on startup.
- **FR-10** Empty state: "Nothing stashed yet." with "Add your first item so you never have to wonder where you put it again." and an Add Item button.
- **FR-11** Search empty state: "We couldn't find that in your Stash."
- **FR-12** Layout is mobile-first and responsive to desktop, with touch-friendly targets and accessible contrast.

## 9. Acceptance Criteria — V1 Results

| # | Criterion | Result |
| --- | --- | --- |
| 1 | A user can add an item | PASS |
| 2 | The item appears on the Home screen | PASS |
| 3 | A user can search for an item by partial name | PASS |
| 4 | A user can open the item's details | PASS |
| 5 | The correct room and exact location are displayed | PASS |
| 6 | A user can edit an item | PASS |
| 7 | A user can delete an item | PASS |
| 8 | Stored items survive a browser refresh | PASS |
| 9 | The experience works on mobile and desktop | PASS |
| 10 | No authentication is required | PASS |

**Overall: 10 / 10 PASS.**

## 10. Success Metrics (proposed, not yet collected)

These are the metrics defined to evaluate Stash once it is in real use. No data has been collected to date.

- **Time to capture** — median seconds from opening Add Item to saving (target: under 20s)
- **Time to retrieve** — median seconds from opening the app to viewing an item's details
- **Search success rate** — share of searches that end in an item being opened
- **Retention of the loop** — share of users who return to search after an initial add session
- **Items per active user** — proxy for whether capture friction is low enough to build a real inventory

## 11. Risks and Constraints

| Risk | Impact | Mitigation / position |
| --- | --- | --- |
| localStorage is device- and browser-scoped | Data does not follow the user across devices | Accepted for V1; sync is a roadmap decision, not a default |
| Clearing browser data erases the inventory | Total data loss | Accepted for V1; export/backup is a candidate for a later release |
| Capture friction may still be too high when typing | Users stop logging items | Voice capture (V1.1 / V1.2) directly targets this |
| Search is name-only | Users who forget the item's name can't find it | Conversational retrieval (V2) targets this |
| Single-user model | No value for shared households | Addressed intentionally at V5 |

## 12. Product Decisions and Tradeoffs

- **localStorage over a backend.** V1 tests the capture-and-retrieve loop on one device. Adding a database and accounts would increase scope and setup friction without improving the test.
- **No authentication.** Sign-up is the largest drop-off point for a utility this small. Zero-friction entry was prioritized.
- **Name-only search.** Room and location filtering were cut to keep the interaction to one input field. Broader retrieval is a V2 concern.
- **Three screens, hard scope cap.** Any feature that does not shorten the path to "Where did I put it?" was excluded.
- **Exact location given visual dominance.** The details screen is designed around the one field the user actually came for.
- **Sample data seeded on first run.** Makes the search behavior legible immediately instead of presenting a cold empty app during development and demos.

## 13. Future Roadmap

| Version | Theme | Status |
| --- | --- | --- |
| V1 | MVP | Completed |
| V1.1 | Voice Search | Planned concept |
| V1.2 | Voice Add | Planned concept |
| V2 | Conversational Retrieval | Planned concept |
| V3 | Photo recognition / storage-bin image assistance | Planned concept |
| V4 | QR storage labels | Planned concept |
| V5 | Shared household inventory | Planned concept |

Detail: [docs/ROADMAP.md](docs/ROADMAP.md).
