import FormMolde from '@/components/FormMolde';
import Input from '@/components/FormInput';
import { useForm } from '@/libs/form/formHooks';
import FormSubmit from '@/components/FormSubmit';
import useApi from '@/libs/apiHooks/useApi';
import { useAuth } from '@/libs/apiHooks/authToken';
import { router } from 'expo-router';

export default function EntrarAuth() {
  const form = useForm();

  const { setToken } = useAuth();
  const mutation = useApi('mutate', (axios) => ({
    async mutationFn(values) {
      const { data } = await axios.post('/auth/login', values);

      await setToken(data.token);
      router.replace('(tabs)');
    },
  }));

  return (
    <FormMolde title="ENTRE NA SUA CONTA">
      <Input form={form} field="username" name="Nome de usuario" textContentType="nickname" />
      <Input form={form} field="password" name="senha" textContentType="password" secureTextEntry />
      <FormSubmit title="Cadastrar" form={form} submit={mutation} />
    </FormMolde>
  );
}
