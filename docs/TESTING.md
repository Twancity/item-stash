# Stash — Acceptance Testing

Manual acceptance testing records for each shipped release. No automated test suite exists; nothing in this document represents unit, integration, or automated regression coverage.

---

# V1 Acceptance Testing

**Test type:** Manual MVP acceptance testing against the V1 build.
**Scope:** The 10 acceptance criteria defined in the PRD before implementation.
**Overall result:** **10 / 10 PASS**

No automated test suite exists for V1. Results below come from manual execution of each criterion; nothing here represents unit, integration, or automated regression coverage.

## Results

| # | Acceptance Criterion | Result |
| --- | --- | --- |
| 1 | A user can add an item | PASS |
| 2 | The item appears on the Home screen | PASS |
| 3 | A user can search for an item by partial name | PASS |
| 4 | A user can open the item's details | PASS |
| 5 | The correct room and exact location are displayed | PASS |
| 6 | A user can edit an item | PASS |
| 7 | A user can delete an item | PASS |
| 8 | Stored items survive a browser refresh (localStorage) | PASS |
| 9 | The experience works on mobile and desktop | PASS |
| 10 | No authentication is required | PASS |

## Notes

- Partial-name search was verified with the term "Christmas" returning "Christmas Lights".
- Persistence was verified by adding an item, reloading the browser, and confirming the item was still listed.
- Deletion was verified to require an explicit confirmation before the item was removed.
- No defect history was documented for V1; only the pass/fail outcome of each acceptance criterion above was recorded.

## Not Covered in V1

- Automated / regression test suite
- Cross-browser matrix testing
- Accessibility audit beyond contrast and touch-target sizing during design
- Performance testing at large item counts

---

# V1.1 Voice Search — Acceptance Testing

**Test type:** Manual acceptance testing against the V1.1 build. This is manual acceptance testing, not automated test coverage.
**Scope:** The 10 acceptance criteria defined for V1.1 before implementation.
**Overall result:** **10 / 10 PASS**

## Results

| # | Acceptance Criterion | Result |
| --- | --- | --- |
| 1 | Microphone control appears in the existing search field | PASS |
| 2 | Tapping microphone starts listening when supported | PASS |
| 3 | Spoken item name populates the search field | PASS |
| 4 | Spoken partial item name filters the existing list correctly | PASS |
| 5 | User can stop/cancel voice input | PASS |
| 6 | Manual text search still works normally | PASS |
| 7 | Permission denial/failure does not crash the app and shows a helpful message | PASS |
| 8 | Unsupported browsers fall back gracefully to manual search | PASS |
| 9 | Existing V1 add/edit/delete/details/localStorage workflows remain unchanged | PASS |
| 10 | Mobile and desktop layouts remain usable | PASS |

## Notes

- Voice input uses browser-native speech recognition only; the transcript is placed into the existing search field and filtered by the existing V1 search logic.
- Browsers without built-in speech recognition show a message directing the user to type, and manual search remains fully functional.
- Only the pass/fail outcome of each criterion above was recorded; no defect history was documented.

## Not Covered in V1.1

- Automated / regression test suite
- Full cross-browser and cross-device matrix testing
- Formal accessibility audit
- Recognition accuracy measurement across accents, languages, or noisy environments
