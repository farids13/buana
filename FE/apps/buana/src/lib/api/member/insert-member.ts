import { httpClient } from "@/lib/http";
import type { MemberForm } from "@/lib/validations/member";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMemberKey } from "./get-member";
import { toast } from "react-toastify";
import router from "next/router";

export const useInsertMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: MemberForm) => {
      await httpClient.post("/members", body);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getMemberKey] });
      toast.success("Member created successfully");
      router.push("/members");
    },
  });
};
