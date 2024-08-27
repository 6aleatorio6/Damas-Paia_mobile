import { UseFormR } from '@/libs/form/formHooks';
import ButtonSubmit, { ButtonSubmitProps } from './ButtonSubmit';
import { UseMutationResult } from '@tanstack/react-query';

interface FormSubmitProps extends Pick<ButtonSubmitProps, 'height' | 'style' | 'title'> {
  form: UseFormR<string>;
  submit: UseMutationResult;
}
export default function FormSubmit(props: FormSubmitProps) {
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
