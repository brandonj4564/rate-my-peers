// form-context.ts file
import { createFormContext } from '@mantine/form';

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const [RegisterFormProvider, useRegisterFormContext, useRegisterForm] =
  createFormContext<RegisterFormValues>();
