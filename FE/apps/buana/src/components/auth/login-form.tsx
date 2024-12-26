import { useForm, SubmitHandler } from 'react-hook-form';
import { login } from '@/src/services/auth/auth-service';
import { redirect } from 'next/navigation';

interface FormInputs {
  email: string;
  password: string;
}

// Hook untuk menangani login form
export const useLoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { email, password } = data;
    const result = await login(email, password);


    if (result.error) {
      console.error('Login failed:', result.error);
      return { success: false, error: result.error };
    } else {
      console.log('Login successful:', result.user);
      return { success: true, user: result.user };
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit
  };
};