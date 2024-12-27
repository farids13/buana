import { httpClient } from "@/lib/http";
import type { EventCategorySchemaForm } from "@/lib/validations/event-category";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { getEventCategoryKey } from "./get-event-categories";
import { getDetailEventCategoryKey } from "./get-detail-event-category";
import { getEventCategoryDropdownKey } from "./get-event-category";
import { toast } from "react-toastify";

export const useInsertEventCategory = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async (body: EventCategorySchemaForm) => {
            const resp = await httpClient.post("/event/category", body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getEventCategoryKey] });
            void queryClient.invalidateQueries({ queryKey: [getDetailEventCategoryKey] });
            void queryClient.invalidateQueries({ queryKey: [getEventCategoryDropdownKey] });
            toast.success("Event category created successfully");
            // router.push("/data-master/event-category");
        },
    })

}