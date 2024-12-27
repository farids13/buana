import { httpClient } from "@/lib/http";
import {respEventLinkMeetSchema } from "@/lib/validations/event-link-meet";
import type { EventLinkMeet } from "@/lib/validations/event-link-meet";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";


export const useCreateLinkMeet = () => {
  return useMutation({
    mutationFn: async (data: EventLinkMeet) => {
      const response = await httpClient.post("/event/generate/googleMeet", {
        ...data
      });
      return respEventLinkMeetSchema.parse(response.data);
    },
    onSuccess: (data) => {
      toast.success("Link Created");
    }
  })

}