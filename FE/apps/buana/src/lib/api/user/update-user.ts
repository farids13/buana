import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProfileForm } from "@/lib/validations/profile";
import { getUserDetailKey } from "./get-user-detail";
import { toast } from "react-toastify";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileForm) => {
      await httpClient.put("/user/update", data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getUserDetailKey] });
      toast.success("Profile updated successfully");
    },
  });
};
