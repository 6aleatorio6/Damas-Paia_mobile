import FormMolde from '@/components/FormMolde';
import Input from '@/components/FormInput';
import ButtonSubmit from '@/components/FormSubmit';

export default function EntrarAuth() {
  return (
    <FormMolde
      title="ENTRE NA SUA CONTA"
      submitOptions={() => ({})}
      replaceValids={{ username: null, senha: null }}
      style={{ marginTop: '18%' }}
    >
      <Input field="username" name="Nome de usuario" textContentType="nickname" />
      <Input field="senha" textContentType="password" secureTextEntry />
      <ButtonSubmit title="Entrar" />
    </FormMolde>
  );
}
