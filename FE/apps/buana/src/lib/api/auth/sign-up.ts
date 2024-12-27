import { API_URL } from "@/lib/http";
import type { SignUpFormValues } from "@/lib/validations/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignUpFormValues) => {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      return response.data;
    },
    onSuccess: () => {
      router.push("/auth/sign-in");
    },
  });
}; 