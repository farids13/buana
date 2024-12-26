import {z} from "zod";

export const mobilSchema = z.object({
    id: z.string().uuid().optional(),
    car_license_number: z.string().nullish().optional(),
    car_year: z.number().nullish().optional(),
    cm_id: z.string().uuid().optional(),
    car_model : z.object({
        id: z.string().uuid(),
        cm_name: z.string()
    }),
    car_brand : z.object({
        id: z.string().uuid(),
        cb_name: z.string()
    }),
    customer_car:z.array(
        z.object({
            customer: z.object({
                id: z.string().uuid(),
                cus_name: z.string()
            })
        })
    ),
    car_is_active: z.boolean().nullish(),    
});

export type MobilSchema = z.infer<typeof mobilSchema>;