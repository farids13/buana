import { httpClient } from "@/lib/http";
import type { EventCategorySchema, UpdateEventCategorySchemaForm} from "@/lib/validations/event-category";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { getEventCategoryKey } from "./get-event-categories";
import { getDetailEventCategoryKey } from "./get-detail-event-category";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useUpdateEventCategory = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const {t} = useTranslation();

    return useMutation({
        mutationFn :async (body: UpdateEventCategorySchemaForm) => {
            await httpClient.put(`/event/category/${body.id}`, body);
        },
        onSuccess : () => {
            void queryClient.invalidateQueries({queryKey : [getEventCategoryKey]});
            void queryClient.invalidateQueries({queryKey : [getDetailEventCategoryKey]});
            toast.success(t("Event category updated successfully"));
            router.push("/data-master/event-category");
        }
    })
}