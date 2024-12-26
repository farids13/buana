
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SatuanService } from "../satuan-service";
import { getSatuanKey } from "./use-get-satuan-query";

export const useDeleteSatuanQuery = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id :string) => SatuanService.delete(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: [getSatuanKey]})
        }
    })
}