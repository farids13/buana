import { httpClient } from "@/lib/http";
import { listAudiencesUserSchema } from "@/lib/validations/audience";

export const getListAudienceKey = "getListAudience";
export const useGetListAudience = async (audienceIds: string[]) => {
    const resp = await httpClient.post(`/audience/users`, {
        audienceIds
    });
    return listAudiencesUserSchema.parseAsync(resp.data);


}