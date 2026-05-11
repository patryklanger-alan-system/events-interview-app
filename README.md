# Frontend Developer Interview Task

## Overview

Build a **React single-page application** for managing events. A working backend REST API is provided — your job is to implement the entire frontend against it.

This task is intentionally open-ended in areas like component library choice and visual design. We'll be evaluating your decision-making as much as your code.

Estimated time: **4–6 hours**

---

## Tech Stack — Required

| Concern           | Technology                   |
|-------------------|------------------------------|
| Framework         | React 18+ (Vite recommended) |
| Language          | TypeScript (strict mode)     |
| Forms             | React Hook Form              |
| Validation        | Zod                          |
| State management  | Redux Toolkit                |
| Translations      | i18next + react-i18next      |
| Component library | Your choice (see note below) |
| HTTP client       | Your choice                  |

> **Component library note:** Pick one you know well and can justify. Document your choice in `README.md` with a brief rationale.

---

## The Backend

A local Express + TypeScript API runs on `http://localhost:3001`. Start it with `npm install` followed by `npm run dev`.

### Event schema

| Field         | Type                                     | Required | Constraints                          |
|---------------|------------------------------------------|----------|--------------------------------------|
| `id`          | number                                   | —        | assigned by server                   |
| `title`       | string                                   | yes      | 1–100 chars                          |
| `description` | string                                   | no       | max 1000 chars                       |
| `type`        | `cultural` \| `sport` \| `entertainment` | yes      |                                      |
| `address`     | string                                   | yes      | 1–100 chars                          |
| `city`        | string                                   | yes      | 1–50 chars                           |
| `phoneNo`     | string                                   | yes      | 1–15 chars                           |
| `email`       | string                                   | yes      | valid email                          |
| `imageUrl`    | string                                   | no       | set automatically after image upload |

### Endpoints summary

| Method   | Path                | Description                                    |
|----------|---------------------|------------------------------------------------|
| `GET`    | `/events`           | List events (filter + sort via query params)   |
| `GET`    | `/events/:id`       | Get single event                               |
| `POST`   | `/events`           | Create event                                   |
| `PUT`    | `/events/:id`       | Full update                                    |
| `DELETE` | `/events/:id`       | Delete event                                   |
| `GET`    | `/events/:id/image` | Serve raw image                                |
| `POST`   | `/events/:id/image` | Upload image (`multipart/form-data`, max 5 MB) |
| `DELETE` | `/events/:id/image` | Remove image                                   |

Available query params for `GET /events`: `type`, `city`, `sortBy` (`id` \| `title` \| `city`), `order` (`asc` \| `desc`).

Validation errors from `POST` and `PUT` are returned as a `400` response with an `errors` object keyed by field name.

---

## Required Features

### 1. Event List page

- Display all events in a list or grid layout
- Show at minimum: title, type, city, and image (if available)
- Filter panel: filter by `type` and `city`
- Sort controls: sort by `id`, `title`, or `city`; toggle `asc`/`desc`
- Filter and sort state must live in Redux and survive navigation (going to a detail page and back should preserve them)
- Handle loading and empty states

### 2. Event Detail page

- Display all event fields
- Show image if present, with a fallback placeholder if not
- Edit and Delete actions
- Delete must show a confirmation dialog before proceeding; redirect to the list afterwards

### 3. Create Event page

- Full form validated with Zod and wired to React Hook Form
- `type` field rendered as a select with the three allowed values
- On success: redirect to the newly created event's detail page
- On error: display field-level errors — both client-side (Zod) and server-side (API `400` response)

### 4. Edit Event page

- Form pre-populated with the event's current data
- Same validation rules as Create
- Image management section:
  - Show current image if one exists
  - Allow uploading a new image (replaces the existing one)
  - Allow removing the existing image
  - Image upload is a **separate action** from the main form save — do not bundle them

### 5. Internationalisation

- Support **English** (`en`) and **Polish** (`pl`)
- Language switcher accessible from every page
- All visible strings go through i18next — no hardcoded UI text anywhere
- Persist the selected language to `localStorage`

---

## State Management

Use Redux Toolkit. How you structure slices is up to you. At minimum, filter and sort state must live in the store — not in local component state.

---

## Validation

Use Zod to define a schema that reflects the backend field constraints, and connect it to React Hook Form. When the API returns field-level errors in a `400` response, surface them on the relevant form fields as well.

---

## Bonus (nice to have, not required)

- Optimistic updates on delete
- URL-synced filters (query params reflect Redux filter state)
- Image drag-and-drop upload
- Skeleton loaders instead of spinners
- Unit tests for the Zod schema and at least one Redux slice

---

## Deliverables

1. Source code in a Git repository (GitHub, GitLab, or zip)
2. `README.md` covering:
   - How to run the project
   - Component library choice and rationale
   - Any architectural decisions worth highlighting
   - Known limitations or trade-offs

---

## Notes

- The backend stores data in memory and resets on restart — don't worry about persistence.
- You may add any additional packages you find useful.
- If something in the spec is ambiguous, make a reasonable call and note it in the README.
