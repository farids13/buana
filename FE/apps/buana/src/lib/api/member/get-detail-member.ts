import { httpClient } from "@/lib/http";
import { memberSchema } from "@/lib/validations/member";
import { useQuery } from "@tanstack/react-query";

export const getDetailMemberKey = "getDetailMember";

export const useGetDetailMember = (memberId?: string) => {
  return useQuery({
    queryKey: [getDetailMemberKey, memberId],
    queryFn: async () => {
      const res = await httpClient.get(`/members/${memberId}`);

      return memberSchema.parseAsync(res.data);
    },
    enabled: Boolean(memberId),
  });
};
