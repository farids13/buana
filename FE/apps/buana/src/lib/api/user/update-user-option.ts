import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { OptionFormValues } from "@/lib/validations/user";
import { getUserDetailKey } from "./get-user-detail";

export const useUpdateUserOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OptionFormValues & { logoUrl?: string }) => {
      await httpClient.put("/user/option", {
        logoUrl: data.logoUrl,
        userOptions: [
          { name: "notification", value: data.notification },
          { name: "dashboard", value: data.dashboard },
        ],
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getUserDetailKey] });
    },
  });
};
