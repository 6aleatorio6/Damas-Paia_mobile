import FormMolde from '@/components/FormMolde';
import Input from '@/components/FormInput';
import ButtonSubmit from '@/components/FormSubmit';

import { useCadastrar } from '@/libs/apiHooks/mutations';

export default function CadastrarAuth() {
  const submitOptions = useCadastrar();

  return (
    <FormMolde title="CRIE SUA CONTA" submitOptions={submitOptions}>
      <Input field="email" textContentType="emailAddress" />
      <Input field="username" name="Nome de usuario" textContentType="nickname" />
      <Input field="password" name="senha" textContentType="password" secureTextEntry />
      <ButtonSubmit title="CADASTRAR" />
    </FormMolde>
  );
}
