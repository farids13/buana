import { httpClient } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: async (storageId: string) => {
      await httpClient.delete(`/storage/agenda/${storageId}`);
    },
  });
};
