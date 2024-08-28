import { queryClientPaia } from '@/app/_layout';
import ButtonSubmit from '@/components/ButtonSubmit';
import Input from '@/components/FormInput';
import FormMolde from '@/components/FormMolde';
import FormSubmit from '@/components/FormSubmit';
import { useAuth } from '@/libs/apiHooks/authToken';
import { useGetUser } from '@/libs/apiHooks/querys';
import useApi from '@/libs/apiHooks/useApi';
import { useForm } from '@/libs/form/formHooks';
import { validsPaia } from '@/libs/form/validacoes';
import { router } from 'expo-router';
import { Alert, ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Indextabs() {
  const { logout } = useAuth();
  const { styles } = useStyles(stylesPaia);
  const { data } = useGetUser();

  const formName = useForm({
    username: [(t) => t === data?.username && 'altere seu nome', ...validsPaia.username],
  });
  const formSenha = useForm();

  const mutationPut = useApi('mutate', (axios) => ({
    async mutationFn(values) {
      await axios.put('/user', values);
      await queryClientPaia.invalidateQueries({ queryKey: ['user'] });
    },
    onSuccess() {
      Alert.alert('Sucesso', 'Usuário editado com sucesso');
      router.navigate('/(tabs)/(user)');
    },
  }));

  const mutationDelete = useApi('mutate', (axios) => ({
    mutationFn: async () => {
      Alert.alert('Tem certeza que deseja excluir sua conta?', 'Essa ação é irreversível', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            await axios.delete('/user');
            await logout();
            await queryClientPaia.invalidateQueries();
          },
        },
      ]);
    },
  }));

  return (
    <ScrollView>
      <View style={styles.container}>
        <FormMolde title="ALTERAR NOME" style={styles.form} titleStyle={styles.textStyle}>
          <Input
            form={formName}
            field="username"
            name="Nome de usuario"
            textContentType="nickname"
            defaultValue={data?.username}
          />
          <FormSubmit
            form={formName}
            submit={mutationPut}
            style={styles.buttonSubmit}
            height={70}
            title="SALVAR NOME"
          />
        </FormMolde>

        <FormMolde title="ALTERAR SENHA" style={styles.form} titleStyle={styles.textStyle}>
          <Input form={formSenha} field="password" name="senha" textContentType="password" secureTextEntry />
          <FormSubmit
            form={formSenha}
            submit={mutationPut}
            style={styles.buttonSubmit}
            height={70}
            title="SALVAR SENHA"
          />
        </FormMolde>

        <ButtonSubmit style={styles.buttonDelete} title="EXCLUIR CONTA" mutation={mutationDelete} />
      </View>
    </ScrollView>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
  },
  form: {
    marginTop: '10%',
  },
  textStyle: {
    fontSize: 20,
  },
  buttonSubmit: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.warning,
    fontSize: 30,
  },
  buttonDelete: {
    marginVertical: '10%',
    backgroundColor: theme.colors.bodySec,
    color: theme.colors.danger,
    fontSize: 30,
    height: 60,
    paddingVertical: 10,
  },
}));
