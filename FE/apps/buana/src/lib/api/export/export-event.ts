import { httpClient } from "@/lib/http";
import type { PaginatedParams } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export const exportEventKey = "exportEvent";

export const useExportEvent = (params?: PaginatedParams) => {
  return useMutation({
    mutationKey: [exportEventKey, params],
    mutationFn: async (exportType: string) => {
      const response = await httpClient.get("/export/event/list", {
        params: {
          ...params,
          exportType,
        },
        responseType: "blob",
      });

      return response.data as Blob;
    },
    onSuccess: (data, exportType) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `event-list-${Date.now()}.${exportType === "EXCEL" ? "xlsx" : "csv"}`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  });
};
