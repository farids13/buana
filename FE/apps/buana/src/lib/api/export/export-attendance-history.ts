import { httpClient } from "@/lib/http";
import type { PaginatedParams } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export const exportAttendanceHistoryKey = "exportAttendanceHistory";

export const useExportAttendanceHistory = (
  eventId: string,
  params?: PaginatedParams & { date?: string },
) => {
  return useMutation({
    mutationKey: [exportAttendanceHistoryKey, eventId, params],
    mutationFn: async (exportType: string) => {
      const response = await httpClient.get(
        `/export/event/attend/history/${eventId}`,
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
        `attendance-history-list-${Date.now()}.${
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
