import { EventType } from "./event-type.model";

export interface EventPayload {
  title: string;
  description?: string;
  type: EventType;
  address: string;
  city: string;
  phoneNo: string;
  email: string;
}

export interface Event extends EventPayload {
  id: number;
  imageUrl?: string;
}
