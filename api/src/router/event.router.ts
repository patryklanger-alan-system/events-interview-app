import { Router, Request, Response } from "express";
import { z } from "zod";
import multer from "multer";
import { eventQueryValidation, eventValidation } from "../model/event/event.validation";
import * as eventService from "../service/event.service";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    cb(null, file.mimetype.startsWith("image/"));
  },
});

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const result = eventQueryValidation.safeParse(req.query);

  if (!result.success) {
    res.status(400).json({ errors: z.flattenError(result.error).fieldErrors });
    return;
  }

  res.json(eventService.getAll(result.data));
});

router.get("/:id", (req: Request, res: Response) => {
  const event = eventService.getById(Number(req.params.id));

  if (!event) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  res.json(event);
});

router.post("/", (req: Request, res: Response) => {
  const result = eventValidation.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: z.flattenError(result.error).fieldErrors });
    return;
  }

  res.status(201).json(eventService.create(result.data));
});

router.put("/:id", (req: Request, res: Response) => {
  const result = eventValidation.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: z.flattenError(result.error).fieldErrors });
    return;
  }

  const updated = eventService.update(Number(req.params.id), result.data);

  if (!updated) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  res.json(updated);
});

router.delete("/:id", (req: Request, res: Response) => {
  const deleted = eventService.remove(Number(req.params.id));

  if (!deleted) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  res.status(204).send();
});

router.post("/:id/image", upload.single("image"), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "No image file provided" });
    return;
  }

  const id = Number(req.params.id);
  const ok = eventService.setImage(id, req.file.buffer, req.file.mimetype);

  if (!ok) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  res.json(eventService.getById(id));
});

router.delete("/:id/image", (req: Request, res: Response) => {
  const ok = eventService.removeImage(Number(req.params.id));

  if (!ok) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  res.status(204).send();
});

router.get("/:id/image", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!eventService.getById(id)) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  const image = eventService.getImage(id);

  if (!image) {
    res.status(404).json({ message: "No image for this event" });
    return;
  }

  res.setHeader("Content-Type", image.mimetype);
  res.send(image.buffer);
});

export default router;
