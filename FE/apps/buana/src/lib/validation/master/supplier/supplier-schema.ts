import { z } from 'zod';

export const supplierSchema = z.object({
    id: z.string().optional(),
    s_code: z.string(),
    s_name: z.string().optional(),
    s_address: z.string().optional(),
    s_contact_person: z.string().optional(),
    s_desc: z.string().optional(),
    s_email: z.string().optional(),
    s_city: z.string().optional(),
    s_phone_number: z.string().optional(),
    s_payment_method: z.string().optional(),
    s_cc_payment_term: z.number().optional(),
});

export type SupplierSchema = z.infer<typeof supplierSchema>;
