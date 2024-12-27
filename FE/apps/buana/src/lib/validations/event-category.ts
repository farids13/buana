import { z } from "zod";

export const eventCategoryDropdownSchema = z.object({
  id: z.string().uuid(),
  eventCategoryName: z.string(),
});

export const eventCategorySchema = z.object({
  id: z.string().uuid(),
  eventCategoryName : z.string().min(3),
  countEvents : z.number().nullable(),
})
export type EventCategorySchema = z.infer<typeof eventCategorySchema>

export const updateEventCategorySchemaForm = eventCategorySchema.omit({countEvents : true});
export type UpdateEventCategorySchemaForm = z.infer<typeof updateEventCategorySchemaForm>

export const eventCategorySchemaForm = eventCategorySchema.omit({id : true, countEvents : true});
export type EventCategorySchemaForm = z.infer<typeof eventCategorySchemaForm>