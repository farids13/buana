import { z } from "zod";
import { provinceSchema } from "./province";

export const districtSchema = provinceSchema.extend({
  district: z.string(),
});
