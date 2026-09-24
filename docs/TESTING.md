# Stash: Acceptance Testing

Manual acceptance testing records for each shipped release. No automated test suite exists; nothing in this document represents unit, integration, or automated regression coverage.

---

# V1 Acceptance Testing

**Test type:** Manual MVP acceptance testing against the V1 build.  
**Overall result:** **10 / 10 PASS**

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

---

# V1.1 Voice Search: Acceptance Testing

**Test type:** Manual acceptance testing against the V1.1 build.  
**Overall result:** **10 / 10 PASS**

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

---

# V1.2 Voice Add: Acceptance Testing

**Test type:** Manual acceptance testing against the V1.2 build.  
**Overall result:** **14 / 14 PASS**

| # | Acceptance Criterion | Result |
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
| 12 | Permission/failure/unsupported scenarios fall back gracefully without breaking the form | PASS |
| 13 | Saved voice-entered items persist through existing localStorage behavior | PASS |
| 14 | Mobile and desktop layouts remain usable | PASS |

## V1.2 Notes

- Voice Add uses a guided sequence rather than one-shot AI parsing.
- Browser-native speech recognition fills the existing form fields one at a time.
- The user retains final control: recognized values can be edited before save.
- Voice Add never automatically saves an item.
- Notes are optional and can be skipped.
- Existing validation and localStorage persistence remain unchanged.

## Not Covered

- Automated / regression testing
- Full cross-browser and cross-device matrix testing
- Formal accessibility audit
- Speech-recognition accuracy measurement across accents, languages, or noisy environments
- Public user testing or adoption measurement
