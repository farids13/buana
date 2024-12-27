import { httpClient } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useSendNotification = (eventId: string, link: string) => {
  return useMutation({
    mutationFn: async () => {
      await httpClient.get(`/event/send/agenda/${eventId}`, {
        params: {
          link,
        }
      });
    },
    onSuccess: (data) => {
      toast.success("Notification sent successfully");
    },
  });
};
