import { useField, useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import * as Yup from 'yup';
import { useAuthStore } from '../../stores/auth.store';
import { AUTH_TAB_PATH, MENU_PATH } from '@/business/routes';
import { useApiHandler } from '@core/compositions/api-error-handler.composition';

export const useLoginForm = () => {
  const auth = useAuthStore();
  const router = useRouter();

  const loginFormSchema = Yup.object({
    global: Yup.string(),
    mailAddress: Yup.string().required().email(),
    password: Yup.string().required().min(5)
  });

  const { meta: formMeta, setFieldError } = useForm({
    validationSchema: loginFormSchema
  });

  const { value: passwordField, errorMessage: passwordError } =
    useField<string>('password');
  const { value: mailAddressField, errorMessage: mailAddressError } =
    useField<string>('mailAddress');

  const { handleApi, loading } = useApiHandler<void>(
    () => auth.login(mailAddressField.value, passwordField.value),
    setFieldError,
    true
  );

  const onSubmit = async () => {
    if (!formMeta.value.valid) {
      return;
    }

    await handleApi();

    router.replace(MENU_PATH.AUTH + AUTH_TAB_PATH.USERS);
  };

  return {
    loading,
    passwordField,
    passwordError,
    mailAddressField,
    mailAddressError,
    formMeta,
    onSubmit
  };
};
