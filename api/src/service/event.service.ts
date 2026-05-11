import { Event, EventPayload } from "../model/event/event.model";
import { EventType } from "../model/event/event-type.model";

export interface EventQuery {
  type?: EventType;
  city?: string;
  sortBy?: "id" | "title" | "city";
  order?: "asc" | "desc";
}

interface StoredImage {
  buffer: Buffer;
  mimetype: string;
}

const events: Event[] = [];
const images = new Map<number, StoredImage>();
let nextId = 1;

export const getAll = (query: EventQuery = {}): Event[] => {
  const { type, city, sortBy = "id", order = "asc" } = query;

  let result = events.filter(e => {
    if (type && e.type !== type) {
      return false;
    }
    if (city && e.city.toLowerCase() !== city.toLowerCase()) {
      return false;
    }
    return true;
  });

  result.sort((a, b) => {
    const aVal = String(a[sortBy]);
    const bVal = String(b[sortBy]);
    const cmp = aVal.localeCompare(bVal, undefined, { numeric: sortBy === "id" });
    return order === "desc" ? -cmp : cmp;
  });

  return result;
};

export const getById = (id: number): Event | undefined => events.find(e => e.id === id);

export const create = (payload: EventPayload): Event => {
  const event: Event = { id: nextId++, ...payload };
  events.push(event);
  console.log(`[event] created:`, event);
  return event;
};

export const update = (id: number, payload: EventPayload): Event | undefined => {
  const index = events.findIndex(e => e.id === id);

  if (index === -1) {
    console.log(`[event] not found id=${id}`);
    return undefined;
  }

  events[index] = { id, ...payload };
  console.log(`[event] updated id=${id}:`, events[index]);
  return events[index];
};

export const remove = (id: number): boolean => {
  const index = events.findIndex(e => e.id === id);

  if (index === -1) {
    console.log(`[event] not found id=${id}`);
    return false;
  }

  events.splice(index, 1);
  images.delete(id);
  console.log(`[event] deleted id=${id}`);
  return true;
};

export const setImage = (id: number, buffer: Buffer, mimetype: string): boolean => {
  const index = events.findIndex(e => e.id === id);

  if (index === -1) {
    console.log(`[event] not found id=${id}`);
    return false;
  }

  images.set(id, { buffer, mimetype });
  console.log(`[event] image for event id=${id} added`);
  events[index].imageUrl = `/events/${id}/image`;
  return true;
};

export const getImage = (id: number): StoredImage | undefined => images.get(id);

export const removeImage = (id: number): boolean => {
  const index = events.findIndex(e => e.id === id);

  if (index === -1) {
    console.log(`[event] not found id=${id}`);
    return false;
  }

  images.delete(id);
  console.log(`[event] image for event id=${id} removed`);
  delete events[index].imageUrl;
  return true;
};
