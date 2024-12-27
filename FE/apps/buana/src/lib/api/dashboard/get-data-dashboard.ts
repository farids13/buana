import { httpClient } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";

export const getDataDashboardKey = "getDataDashboard";

export type DataDashboard = {
    name: string;
    pre: Events[];
    post: Events[];
    onGoing: Events[];
}

type Events = {
    id : string;
    eventName: string;
    startAt : string;
    endAt : string;
    phase : string;
}

export const useGetDataDashboard = () => {

    return useQuery({
        queryKey: [getDataDashboardKey],
        queryFn: async () => {
            const response = await httpClient.get("/dashboard");
            return response.data as DataDashboard;
        },
    });
}