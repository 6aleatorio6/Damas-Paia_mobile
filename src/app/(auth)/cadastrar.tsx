import FormMolde from '@/components/form/FormMolde';
import Input from '@/components/form/FormInput';
import { useForm } from '@/libs/form/formHooks';
import FormSubmit from '@/components/form/FormSubmit';
import { useAuth } from '@/libs/apiHooks/auth/tokenContext';
import { router } from 'expo-router';
import { useUserPostAndLogin } from '@/libs/apiHooks/mutations';

export default function CadastrarAuth() {
  const { setToken } = useAuth();
  const form = useForm();

  const mutation = useUserPostAndLogin({
    async onSuccess(data) {
      await setToken(data.token);
      router.replace('/(tabs)');
    },
  });

  return (
    <FormMolde title="CRIE SUA CONTA">
      <Input form={form} field="email" textContentType="emailAddress" />
      <Input form={form} field="username" name="Nome de usuario" textContentType="nickname" />
      <Input form={form} field="password" name="senha" textContentType="password" secureTextEntry />
      <FormSubmit title="Cadastrar" form={form} submit={mutation} />
    </FormMolde>
  );
}
