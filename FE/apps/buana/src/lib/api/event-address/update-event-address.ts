import { httpClient } from "@/lib/http";
import type { EventAddressFormSchema } from "@/lib/validations/event-address";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { getEventAddressKey } from "./get-event-address";
import { getDetailEventAddressKey } from "./get-detail-event-address";
import { toast } from "react-toastify";

export const useUpdateEventAddress = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn:async (body: EventAddressFormSchema) => {
            await httpClient.put(`/event/address/${body.id}`, body);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: [getEventAddressKey]})
            void queryClient.invalidateQueries({queryKey: [getDetailEventAddressKey]})
            router.push("/data-master/address");
            toast.success("Address updated successfully");
        },
    });
}