import { UseFormR } from '@/libs/form/formHooks';
import ButtonSubmit, { ButtonSubmitProps } from '../ButtonSubmit';
import { UseMutationResult } from '@tanstack/react-query';

interface FormSubmitProps<C extends string> extends Pick<ButtonSubmitProps, 'height' | 'style' | 'title'> {
  form: UseFormR<C>;
  submit: UseMutationResult<unknown, Error, Record<C, string>>;
}
export default function FormSubmit<C extends string>(props: FormSubmitProps<C>) {
  const { valuesFields, formValidyState } = props.form;

  return (
    <ButtonSubmit
      {...props}
      disabled={!formValidyState[0]}
      mutateData={valuesFields}
      mutation={props.submit}
    />
  );
}
