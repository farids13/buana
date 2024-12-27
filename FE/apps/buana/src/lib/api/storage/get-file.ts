import { httpClient } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";

export const getFileKey = "getFile";

export const useGetFile = (bucket: string, storageId?: string | null) => {
  return useQuery({
    queryKey: [getFileKey, storageId],
    queryFn: async () => {
      const response = await httpClient.get(`/storage/${bucket}/${storageId}`, {
        responseType: "blob",
      });

      return response.data as Blob;
    },
    enabled: Boolean(storageId),
  });
};
