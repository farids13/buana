import { httpClient } from "@/lib/http";
import type { SignInFormValues } from "@/lib/validations/auth";
import type { AuthResponse } from "@/stores/use-auth-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/use-auth-store";
import { v4 } from "uuid";

export const useSignIn = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (data: SignInFormValues) => {
      const response = await httpClient.post<AuthResponse>("/auth/signin", {
        ...data,
        deviceId: v4(),
      });
      return response.data;
    },
    onSuccess: (data) => {
      login(data);
      router.push("/dashboard");
    },
  });
};
