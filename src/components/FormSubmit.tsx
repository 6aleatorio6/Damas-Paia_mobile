import { useForm } from '@/libs/form/formHooks';
import ButtonSubmit, { ButtonSubmitProps } from './ButtonSubmit';

export default function FormSubmit(props: Pick<ButtonSubmitProps, 'height' | 'style' | 'title'>) {
  const { isFormValidy, mutation, valuesFields } = useForm();

  return <ButtonSubmit {...props} disabled={!isFormValidy} mutateData={valuesFields} useApi={mutation} />;
}
