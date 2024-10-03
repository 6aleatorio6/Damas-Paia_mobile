import FormMolde from '@/components/form/FormMolde';
import Input from '@/components/form/FormInput';
import { useForm } from '@/libs/form/formHooks';
import FormSubmit from '@/components/form/FormSubmit';
import { useAuth } from '@/libs/apiHooks/auth/tokenContext';
import { router, useFocusEffect } from 'expo-router';
import { useUserPostAndLogin } from '@/libs/apiHooks/mutations';
import { useCallback } from 'react';
import { AvoidSoftInput } from 'react-native-avoid-softinput';

export default function CadastrarAuth() {
  const { setToken } = useAuth();
  const form = useForm();

  const onFocusEffect = useCallback(() => {
    // This should be run when screen gains focus - enable the module where it's needed
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);
    return () => {
      // This should be run when screen loses focus - disable the module where it's not needed, to make a cleanup
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect); // register callback to focus events

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
