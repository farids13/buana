import { httpClient } from "@/lib/http";
import type { PaginatedParams } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export const exportAudienceKey = "exportAudience";

export const useExportAudience = (
  eventId: string,
  params?: PaginatedParams,
) => {
  return useMutation({
    mutationKey: [exportAudienceKey, eventId, params],
    mutationFn: async (exportType: string) => {
      const response = await httpClient.get(
        `/export/event/audience/${eventId}`,
        {
          params: {
            ...params,
            exportType,
          },
          responseType: "blob",
        },
      );

      return response.data as Blob;
    },
    onSuccess: (data, exportType) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `audience-list-${Date.now()}.${
          exportType === "EXCEL" ? "xlsx" : "csv"
        }`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  });
};
