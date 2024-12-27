import { API_URL, httpClient } from "@/lib/http";
import type { SignInFormValues } from "@/lib/validations/auth";
import type { AuthResponse } from "@/stores/use-auth-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/use-auth-store";
import { v4 } from "uuid";
import axios from "axios";

export const useSignIn = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (data: SignInFormValues) => {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
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
