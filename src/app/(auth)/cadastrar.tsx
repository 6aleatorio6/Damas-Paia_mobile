import FormMolde from '@/components/FormMolde';
import Input from '@/components/FormInput';
import ButtonSubmit from '@/components/FormSubmit';
import { useAuth } from '@/libs/mutationOrQuery/authToken';
import { router } from 'expo-router';

export default function CadastrarAuth() {
  const { setToken } = useAuth();

  return (
    <FormMolde
      title="CRIE SUA CONTA"
      submitOptions={(axios) => ({
        async mutationFn(values) {
          await axios.post('/user', values);
          const { data } = await axios.post('/auth/login', values);

          setToken(data.token);
          router.replace('/');
        },
      })}
    >
      <Input field="email" textContentType="emailAddress" />
      <Input field="username" name="Nome de usuario" textContentType="nickname" />
      <Input field="password" name="senha" textContentType="password" secureTextEntry />
      <ButtonSubmit title="CADASTRAR" />
    </FormMolde>
  );
}
