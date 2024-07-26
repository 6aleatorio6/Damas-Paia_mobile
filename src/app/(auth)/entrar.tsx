import FormMolde from '@/components/FormMolde';
import Input from '@/components/FormInput';
import ButtonSubmit from '@/components/FormSubmit';
import { useAuth } from '@/libs/mutationOrQuery/authToken';
import { router } from 'expo-router';

export default function EntrarAuth() {
  const { setToken } = useAuth();

  return (
    <FormMolde
      title="ENTRE NA SUA CONTA"
      submitOptions={(axios) => ({
        async mutationFn(values) {
          const { data } = await axios.post('/auth/login', values);

          setToken(data.token);
          router.replace('/');
        },
      })}
      style={{ marginTop: '18%' }}
    >
      <Input field="username" name="Nome de usuario" textContentType="nickname" />
      <Input field="password" name="senha" textContentType="password" secureTextEntry />
      <ButtonSubmit title="Entrar" />
    </FormMolde>
  );
}
