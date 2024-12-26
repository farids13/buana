import { z } from "zod";
import { InsentifMekanikEnum } from "@/src/lib/enum/master/insentif-mekanik-enum";

export const insentifMekanikSchema = z.object({
    id : z.string().uuid().optional(),
    ins_code : z.string().optional(),
    ins_type : z.nativeEnum(InsentifMekanikEnum).optional(),
    ins_value : z.number().optional(),
});

export type InsentifMekanikSchema = z.infer<typeof insentifMekanikSchema>;