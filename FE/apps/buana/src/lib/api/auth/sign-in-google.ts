import { httpClient } from "@/lib/http";
import type { SignInGoogleFormValues } from "@/lib/validations/auth";
import type { AuthResponse } from "@/stores/use-auth-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/use-auth-store";
import { v4 } from "uuid";

export const useSignInGoogle = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.loginWithGoogle);

  return useMutation({
    mutationFn: async (data: SignInGoogleFormValues) => {
      const response = await httpClient.post<AuthResponse>("/auth/login/google", {
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
