import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { getMemberKey } from "./get-member";
import { getDetailMemberKey } from "./get-detail-member";
import { toast } from "react-toastify";
import { MemberForm } from "@/lib/validations/member";

export const useUpdateMember = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async ({ body, memberId }: { body: MemberForm; memberId: string }) => {
            await httpClient.put(`/members/${memberId}`, body);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: [getMemberKey]})
            void queryClient.invalidateQueries({queryKey: [getDetailMemberKey]})
            router.push("/members");
            toast.success("Member updated successfully");
        },
    });
}