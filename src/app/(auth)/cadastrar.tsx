import FormMolde from '@/components/FormMolde';
import Input from '@/components/FormInput';
import ButtonSubmit from '@/components/FormSubmit';

export default function CadastrarAuth() {
  return (
    <FormMolde title="CRIE SUA CONTA" submitOptions={() => ({})}>
      <Input field="email" textContentType="emailAddress" />
      <Input field="username" name="Nome de usuario" textContentType="nickname" />
      <Input field="senha" textContentType="password" secureTextEntry />
      <ButtonSubmit title="CADASTRAR" />
    </FormMolde>
  );
}
