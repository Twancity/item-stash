# Stash — Product Requirements Document (V1, V1.1, V1.2)

**Tagline:** Remember where you put everything.  
**Status:** V1 MVP completed. V1.1 Voice Search completed. V1.2 Voice Add completed.

## 1. Product Overview

Stash is a responsive, mobile-first web application for recording where household items are stored and retrieving that location later through search. A user captures an item's name, the room it lives in, and its exact storage spot. Later, a partial-name search surfaces it in seconds.

## 2. Problem Statement

Household items are stored in places people cannot recall later — bins, drawers, shelves, closets, attics. The assumed cost is repeated searching, duplicate purchases, and frustration.

*Unvalidated hypothesis (not yet tested with users):* existing home-inventory tools are oriented toward cataloging and valuation rather than fast retrieval, leaving the "where is it right now?" question underserved.

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
- **FR-3** Search filters the item list in real time on partial, case-insensitive item-name matches.
- **FR-4** Selecting an item opens its details screen.
- **FR-5** The exact storage location is the most visually prominent element on the details screen.
- **FR-6** Edit pre-fills all current values and applies updates immediately on save.
- **FR-7** Delete requires an explicit confirmation before removal.
- **FR-8** After adding or editing, the user is returned to the relevant screen with the change visible.
- **FR-9** All items are persisted to browser localStorage and reloaded on startup.
- **FR-10** Empty state provides an Add Item path.
- **FR-11** Search empty state explains no match was found.
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

- **Time to capture** — median seconds from opening Add Item to saving
- **Time to retrieve** — median seconds from opening the app to viewing an item's details
- **Search success rate** — share of searches that end in an item being opened
- **Retention of the loop** — share of users who return to search after an initial add session
- **Items per active user** — proxy for whether capture friction is low enough to build a real inventory

## 11. Risks and Constraints

| Risk | Impact | Mitigation / position |
| --- | --- | --- |
| localStorage is device- and browser-scoped | Data does not follow the user across devices | Accepted for V1; sync is a roadmap decision |
| Clearing browser data erases the inventory | Total data loss | Accepted for V1; export/backup is a later candidate |
| Capture friction may still be too high when typing | Users stop logging items | V1.2 Voice Add targets this |
| Search is name-only | Users who forget the item's name can't find it | Conversational retrieval (V2) targets this |
| Single-user model | No value for shared households | Addressed intentionally at V5 |

## 12. Product Decisions and Tradeoffs

- **localStorage over a backend.** V1 tests the capture-and-retrieve loop on one device.
- **No authentication.** Zero-friction entry was prioritized.
- **Name-only search.** Broader retrieval was deferred.
- **Three screens, hard scope cap.** Features outside the core job were excluded.
- **Exact location given visual dominance.** The details screen emphasizes the answer the user came for.
- **Sample data seeded on first run.** Makes the core workflow visible immediately.

## 13. V1.1 Enhancement — Voice Search (Completed)

**Problem / opportunity.** Reduce retrieval friction when typing is inconvenient.

**User story.** As a Stash user, I want to search by voice so I can find an item without typing.

**Scope.**
- Microphone control inside the existing Home search field
- Browser-native speech-to-text
- Existing partial-name filter reused
- Visible listening state
- Manual typing preserved

**Non-goals.**
- Voice Add
- AI interpretation or conversational retrieval
- Backend or account changes
- Paid third-party dependencies

**Result:** **10 / 10 PASS** in manual acceptance testing.

## 14. V1.2 Enhancement — Voice Add (Completed)

**Problem / opportunity.** Reduce capture friction on the Add Item form while preserving user control over the saved data.

**User story.** As a Stash user, I want to add an item's details by voice so I can log where I stored something without typing every field.

**Scope.**
- Add by voice control on the existing Add Item screen
- Guided voice sequence for Item Name, Room / Area, Exact Location, and optional Notes
- Each spoken response populates the existing form field
- Automatic advancement between guided steps
- Notes can be spoken or skipped
- User can stop/cancel the flow
- All populated fields remain manually editable
- Existing Save Item action remains mandatory; no automatic save
- Existing validation, localStorage persistence, and Voice Search remain unchanged

**Non-goals.**
- One-shot AI parsing of a full sentence
- Automatic saving
- Voice Add on Edit Item
- Conversational retrieval
- Backend, accounts, cloud sync, photo recognition, QR labels, or sharing

**Acceptance criteria — V1.2 results**

| # | Criterion | Result |
| --- | --- | --- |
| 1 | Add by voice control appears on Add Item screen | PASS |
| 2 | Tapping it starts the guided voice flow when supported | PASS |
| 3 | Spoken item name populates Item Name | PASS |
| 4 | Spoken room/area populates Room / Area | PASS |
| 5 | Spoken exact location populates Exact Location | PASS |
| 6 | Notes can be spoken or skipped | PASS |
| 7 | User can stop/cancel the voice flow | PASS |
| 8 | Populated fields remain editable manually | PASS |
| 9 | Item is not automatically saved; user must tap Save Item | PASS |
| 10 | Existing manual Add Item flow still works normally | PASS |
| 11 | Existing Voice Search still works normally | PASS |
| 12 | Permission/failure/unsupported scenarios fall back gracefully | PASS |
| 13 | Saved voice-entered items persist through existing localStorage behavior | PASS |
| 14 | Mobile and desktop layouts remain usable | PASS |

**Overall: 14 / 14 PASS** (manual acceptance testing).

## 15. Future Roadmap

| Version | Theme | Status |
| --- | --- | --- |
| V1 | MVP | Completed |
| V1.1 | Voice Search | Completed |
| V1.2 | Voice Add | Completed |
| V2 | Conversational Retrieval | Planned concept |
| V3 | Photo recognition / storage-bin image assistance | Planned concept |
| V4 | QR storage labels | Planned concept |
| V5 | Shared household inventory | Planned concept |

Detail: [docs/ROADMAP.md](docs/ROADMAP.md).
