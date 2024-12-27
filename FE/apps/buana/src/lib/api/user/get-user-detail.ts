import { httpClient } from "@/lib/http";
import { profileSchema } from "@/lib/validations/user";
import { useQuery, useMutation } from "@tanstack/react-query";

export const getUserDetailKey = "getUserDetail";

export const useGetUserDetail = () => {
  return useQuery({
    queryKey: [getUserDetailKey],
    queryFn: async () => {
      const response = await httpClient.get("/users/me");
      return profileSchema.parse(response.data);
    },
  });
};

export const useDownloadUserImage = () => {
  const { data: userData } = useGetUserDetail();

  return useMutation({
    mutationFn: async () => {
      const imgUrl = userData?.imgUrl;
      if (!userData || !imgUrl) {return new Blob()};

      const response = await httpClient.get(`storage/agenda/${userData.imgUrl}`, {
        responseType: "blob",
      });

      return response.data as Blob;
    },
  });
};
