import {z} from "zod";

export const upsertMobilSchema = z.object({
    id: z.string().optional(),
    cm_id: z.string().uuid().min(1, "Model mobil wajib diisi"),
    cb_id: z.string().uuid().min(1, "Merek mobil wajib diisi"),
    customers: z.array(z.string().uuid()).optional(),
    car_license_number: z.string().min(1, "Nomor polisi wajib diisi"),
    car_machine_number: z.string().nullish().optional(),
    car_year: z.number().nullish().optional(),
    car_note: z.string().nullish().optional(),
    car_is_active: z.boolean().nullish(),  
});

export type UpsertMobilSchema = z.infer<typeof upsertMobilSchema>;

export const upsertMobilSchemaForm = upsertMobilSchema.omit({id: true, customers: true});
export type UpsertMobilSchemaForm = z.infer<typeof upsertMobilSchemaForm>;

// detail mobil
export const upsertDetailMobilSchema = upsertMobilSchema.extend({
    customer_car:z.array(
        z.object({
            customer: z.object({
                id: z.string().uuid(),
                cus_name: z.string()
            })
        })
    ),
});

export type UpsertDetailMobilSchema = z.infer<typeof upsertDetailMobilSchema>;