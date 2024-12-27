import { httpClient } from "@/lib/http";
import type { EventAddressFormSchema } from "@/lib/validations/event-address";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getEventAddressKey } from "./get-event-address";
import { getEventAddressDropdownKey } from "./get-event-address-dropdown";
import { toast } from "react-toastify";

export const useInsertEventAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: EventAddressFormSchema) => {
      await httpClient.post("/event/address", body);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getEventAddressKey] });
      void queryClient.invalidateQueries({
        queryKey: [getEventAddressDropdownKey],
      });
      toast.success("Address created successfully");
    },
  });
};
