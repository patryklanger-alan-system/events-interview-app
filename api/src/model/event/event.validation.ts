import z from "zod";
import { EventType } from "./event-type.model";

export const eventQueryValidation = z.object({
  type: z.enum(EventType, { message: "type must be one of: cultural, sport, entertainment" }).optional(),
  city: z.string().max(50, { message: "city must be at most 50 chars long" }).optional(),
  sortBy: z.enum(["id", "title", "city"], { message: "sortBy must be one of: id, title, city" }).optional(),
  order: z.enum(["asc", "desc"], { message: "order must be asc or desc" }).optional(),
});

export const eventValidation = z.object({
  title: z
    .string("Title must be of type string")
    .min(1, { message: "Title must be at least 1 char long" })
    .max(100, { message: "Title must be at most 100 chars long" }),
  description: z.string("Description must be of type string").max(1000, { message: "Event must be at most 1000 chars long" }).optional(),
  type: z.enum(EventType, { message: "type must be one of: cultural, sport, entertainment" }),
  address: z
    .string("address must be of type string")
    .min(1, { message: "address must be at least 1 char long" })
    .max(100, { message: "address must be at most 100 chars long" }),
  city: z
    .string("city must be of type string")
    .min(1, { message: "city must be at least 1 char long" })
    .max(50, { message: "city must be at most 50 chars long" }),
  phoneNo: z
    .string("phoneNo must be of type string")
    .min(1, { message: "phoneNo must be at least 1 char long" })
    .max(15, { message: "phoneNo must be at most 15 chars long" }),
  email: z.email("email must be valid"),
});
