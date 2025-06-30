import { differenceInCalendarDays, getYear, isFuture } from 'date-fns';
import { useField, useForm } from 'vee-validate';
import { DateUtil } from '../../../../../../core/utils/date.util';
import { UserDetailResponse } from '@/business/repositories/user.repository';
import { useUserStore } from '@/business/stores/user.store';
import yup from '@/shared/validators/number-string.validator';
import { useApiHandler } from '@core/compositions/api-error-handler.composition';
import { $t } from '@shared/utils/i18n.util';

interface UserRegisterForm {
  name: string | undefined;
  email: string | undefined;
  detail: string | undefined;
  birthday: string | undefined;
  validPeriod: Array<Date> | undefined;
}

const userEditFormSchema = yup.object({
  global: yup.string(),
  name: yup.string().max(15).required(),
  email: yup.string().email().max(50).required(),
  detail: yup.string().max(200),
  birthday: yup.string().required(),
  validPeriod: yup
    .array()
    .required()
    .test('futureDate', function (value) {
      if (
        value === undefined ||
        value.length < 2 ||
        !(value[0] instanceof Date) ||
        !(value[1] instanceof Date)
      ) {
        return false;
      }

      const endDate = value[1] as Date;
      const startDate = value[0] as Date;
      if (getYear(startDate) < getYear(new Date())) {
        return this.createError({
          message: $t('ValidMessages.CustomerMsg1')
        });
      }
      if (!isFuture(endDate)) {
        return this.createError({
          message: $t('ValidMessages.CustomerMsg2')
        });
      }
      if (differenceInCalendarDays(endDate, startDate) < 7) {
        return this.createError({
          message: $t('ValidMessages.CustomerMsg3')
        });
      }

      return true;
    })
});

const dateFormatter = 'yyyy-MM-dd';

export const useUserEditForm = (
  user: UserDetailResponse | undefined,
  popModal: () => void
) => {
  const userStore = useUserStore();

  const formInitialValue = user
    ? {
        name: user.name,
        email: user.email,
        detail: user.detail,
        birthday: user.birthday ? user.birthday : undefined,
        validPeriod: [
          user.validStartDate ? user.validStartDate : undefined,
          user.validEndDate ? user.validEndDate : undefined
        ]
      }
    : {
        name: undefined,
        email: undefined,
        detail: undefined,
        birthday: undefined,
        validPeriod: undefined
      };

  const { meta: formMeta, setFieldError } = useForm<UserRegisterForm>({
    validationSchema: userEditFormSchema as never,
    initialValues: formInitialValue as never
  });

  const { value: nameField, errorMessage: nameError } =
    useField<string>('name');
  const { value: emailField, errorMessage: emailError } =
    useField<string>('email');
  const { value: detailField, errorMessage: detailError } =
    useField<string>('detail');
  const { value: birthdayField, errorMessage: birthdayError } =
    useField<string>('birthday');
  const { value: validPeriodField, errorMessage: validPeriodError } =
    useField<Array<Date>>('validPeriod');

  const apiMethod = async () => {
    if (user) {
      await userStore.editUserDetail(user.id, {
        name: nameField.value,
        email: emailField.value,
        detail: detailField.value,
        birthday: birthdayField.value,
        validStartDate: DateUtil.format(
          validPeriodField.value[0],
          dateFormatter
        ),
        validEndDate: DateUtil.format(validPeriodField.value[1], dateFormatter)
      });
      await userStore.loadUserDetail(user.id);
    } else {
      await userStore.addUser({
        name: nameField.value,
        email: emailField.value,
        detail: detailField.value,
        birthday: birthdayField.value,
        validStartDate: DateUtil.format(
          validPeriodField.value[0],
          dateFormatter
        ),
        validEndDate: DateUtil.format(validPeriodField.value[1], dateFormatter)
      });
    }
    await userStore.loadUserList();
  };

  const { handleApi, loading } = useApiHandler<void>(
    () => apiMethod(),
    setFieldError,
    true
  );

  const onSummit = async () => {
    if (!formMeta.value.valid) {
      return;
    }

    await handleApi();
    popModal();
  };

  return {
    loading,
    nameField,
    nameError,
    emailField,
    emailError,
    detailField,
    detailError,
    birthdayField,
    birthdayError,
    validPeriodField,
    validPeriodError,
    formMeta,
    onSummit
  };
};
