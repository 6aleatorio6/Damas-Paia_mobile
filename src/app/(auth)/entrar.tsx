import FormMolde from '@/components/FormMolde';
import Input from '@/components/FormInput';
import ButtonSubmit from '@/components/FormSubmit';
import { useLogin } from '@/libs/apiHooks/mutations';

export default function EntrarAuth() {
  const optionsSubmit = useLogin();

  return (
    <FormMolde title="ENTRE NA SUA CONTA" submitOptions={optionsSubmit}>
      <Input field="username" name="Nome de usuario" textContentType="nickname" />
      <Input field="password" name="senha" textContentType="password" secureTextEntry />
      <ButtonSubmit title="Entrar" />
    </FormMolde>
  );
}
