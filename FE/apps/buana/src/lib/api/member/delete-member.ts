import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getMemberKey } from "./get-member";
import { toast } from "react-toastify";

export const useDeleteMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (memberId: string) => {
            await httpClient.delete(`/members/${memberId}`);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getMemberKey] });
            toast.success("Member berhasil dihapus");
        },
    });
}