import { z } from "zod";

export const eventAddressSchema = z.object({
  id: z.string().uuid(),
  location: z.string(),
  districtName: z.string().nullish(),
  districtId: z.string().uuid().nullish(),
  provinceId: z.string().uuid().nullish(),
  provinceName: z.string().nullish(),
  address: z.string().nullish(),
});

export type EventAddress = z.infer<typeof eventAddressSchema>;

export const eventAddressFormSchema = z.object({
  id: z.string().uuid().nullish(),
  location: z.string().nullish(),
  provinceId: z.string().uuid().nullish(),
  districtId: z.string().uuid().nullish(),
  address: z.string().nullish(),
});

export type EventAddressFormSchema = z.infer<typeof eventAddressFormSchema>;
