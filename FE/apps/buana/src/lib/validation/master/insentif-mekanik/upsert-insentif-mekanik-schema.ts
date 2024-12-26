import { InsentifMekanikEnum } from "@/src/lib/enum/master/insentif-mekanik-enum";
import { z } from "zod";

export const upsertInsentifMekanikSchema = z.object({
    id : z.string().uuid().optional(),  
    ins_code : z.string(),
    ins_type : z.nativeEnum(InsentifMekanikEnum),
    ins_value : z.number(),
});

export type UpsertInsentifMekanikSchema = z.infer<typeof upsertInsentifMekanikSchema>;


// for form Withoud Id
export const upsertInsentifMekanikSchemaForm = upsertInsentifMekanikSchema.omit({id: true});
export type UpsertInsentifMekanikSchemaForm = z.infer<typeof upsertInsentifMekanikSchemaForm>;