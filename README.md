# ❗️ *Design for a certain functionality or whole app is required*

# Frontend Developer Interview Task

## Overview

Build a **React single-page application** for managing events. A working backend REST API is provided — your job is to implement the entire frontend against it.

This task is intentionally open-ended in areas like component library choice and visual design. We'll be evaluating your decision-making as much as your code.

---

## Tech Stack — Required

| Concern   | Technology                   |
|-----------|------------------------------|
| Framework | React 18+ (Vite recommended) |
| Language  | TypeScript (strict mode)     |

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
- Filter and sort state must survive navigation (going to a detail page and back and also refreshing a page on a list should preserve them)
- Handle loading and empty states

### 2. Event Detail page

- Display all event fields
- Show image if present, with a fallback placeholder if not
- Edit and Delete actions
- Delete must show a confirmation dialog before proceeding; redirect to the list afterwards

### 3. Create Event page

- Form validation
- `type` field rendered as a select with the three allowed values
- On success: redirect to the newly created event's detail page
- On error: display field-level errors

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
- Persist the selected language

---

## Bonus (nice to have, not required)

- Optimistic updates on delete
- URL-synced filters
- Image drag-and-drop upload
- Skeleton loaders instead of spinners
- Unit tests

---

## Deliverables

1. Source code in a Git repository (GitHub, GitLab, or zip)
2. `README.md` covering:
   - How to run the project
   - Component library choice and rationale
   - Any architectural decisions worth highlighting
   - Known limitations or trade-offs
   - If you used AI assistance, please specify in what capacity/scope.

---

## Notes

- The backend stores data in memory and resets on restart — don't worry about persistence.
- You may add any additional packages you find useful.
- If something in the spec is ambiguous, make a reasonable call and note it in the README.
