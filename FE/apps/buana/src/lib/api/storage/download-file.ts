import { httpClient } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";
import type { Storage } from "@/lib/validations/storage";

export const useDownloadFile = () => {
  return useMutation({
    mutationFn: async (data: Omit<Storage, "type">) => {
      const response = await httpClient.get(
        `storage/agenda/${data.storageId}`,
        {
          responseType: "blob",
        },
      );

      return response.data as Blob;
    },
    onSuccess: (data, variables) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${variables.name}.${variables.format}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  });
};
