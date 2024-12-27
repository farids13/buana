import { httpClient } from "@/lib/http";
import type { SendEmailNotification } from "@/lib/validations/event";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useSendEmailNotification = () => {
    return useMutation({
        mutationFn: async (data: SendEmailNotification) => {
            await httpClient.post(`/email`, data);
        },
        onSuccess: (data) => {
            toast.success("Notification sent successfully");
        },
    });
};