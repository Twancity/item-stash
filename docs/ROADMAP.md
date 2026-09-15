# Stash — Product Roadmap

Everything beyond V1 is a **planned concept**, not a shipped or committed feature. Sequencing runs from reducing capture friction, to improving retrieval, to expanding beyond a single person.

---

## V1 — MVP — **Completed**

Add an item with room/area, exact location, and optional notes. Real-time partial-name search, item details, edit, delete with confirmation, localStorage persistence, responsive mobile and desktop experience, no login.

**Result:** 10 / 10 acceptance criteria passed.

---

## V1.1 — Voice Search — **Completed**

A microphone control in the Home search field uses browser-native speech recognition to turn spoken words into the search term, reusing the existing real-time partial-name filter. Unsupported browsers, denied permission, and recognition errors fall back to manual search with a short message.

**Result:** 10 / 10 acceptance criteria passed (manual testing).

---

## V1.2 — Voice Add — *Planned concept*

Spoken natural-language input (e.g. "Christmas lights are in the blue bin on the left shelf in the garage") is parsed into structured Item Name, Room / Area, and Exact Location fields, presented to the user for review and correction before saving. Targets the biggest remaining capture-friction cost: typing three fields.

---

## V2 — Conversational Retrieval — *Planned concept*

The user asks a question in natural language — "Where did I put my Christmas lights?" — and receives the stored location as a direct answer, rather than matching exact item names. Removes the requirement that the user remember what they named an item.

---

## V3 — Photo Recognition / Storage-Bin Image Assistance — *Planned concept*

Attach photos to items and storage locations, with image assistance to help identify bin contents and confirm the right container visually.

---

## V4 — QR Storage Labels — *Planned concept*

Generate printable QR labels for bins and shelves. Scanning a label opens its contents list; scanning while adding an item pre-fills the storage location.

---

## V5 — Shared Household Inventory — *Planned concept*

Multiple household members share one inventory, so anyone can find or update where something lives. This is the point at which accounts and a synced backend become genuinely necessary — which is why they were deliberately excluded from V1.
