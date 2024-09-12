import FormMolde from '@/components/form/FormMolde';
import Input from '@/components/form/FormInput';
import { useForm } from '@/libs/form/formHooks';
import FormSubmit from '@/components/form/FormSubmit';
import { useAuth } from '@/libs/apiHooks/auth/tokenContext';
import { router } from 'expo-router';
import { useLoginPost } from '@/libs/apiHooks/mutations';

export default function EntrarAuth() {
  const { setToken } = useAuth();
  const form = useForm({ username: { omit: ['exists'] } });

  const mutation = useLoginPost({
    async onSuccess(data) {
      await setToken(data.token);
      router.replace('/(tabs)');
    },
  });

  return (
    <FormMolde title="ENTRE NA SUA CONTA">
      <Input form={form} field="username" name="Nome de usuario" textContentType="nickname" />
      <Input form={form} field="password" name="senha" textContentType="password" secureTextEntry />
      <FormSubmit title="Entrar" form={form} submit={mutation} />
    </FormMolde>
  );
}
