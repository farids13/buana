
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KondisiMobilService } from "../kondisi-mobil-service";
import { getKondisiMobilKey } from "./use-get-kondisi-mobil-query";

export const useDeleteKondisiMobilQuery = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id :string) => KondisiMobilService.delete(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: [getKondisiMobilKey]})
        }
    })
}