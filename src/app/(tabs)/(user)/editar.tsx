import Input from '@/components/FormInput';
import FormMolde from '@/components/FormMolde';
import FormSubmit from '@/components/FormSubmit';
import { UserDelete } from '@/components/UserDelete';
import { queryClientPaia } from '@/libs/apiHooks/context/queryContext';
import { useGetUser } from '@/libs/apiHooks/querys';
import useApi from '@/libs/apiHooks/useApi';
import { useForm } from '@/libs/form/formHooks';
import { validsPaia } from '@/libs/form/validacoes';
import { router } from 'expo-router';
import { Alert, ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Indextabs() {
  const { styles } = useStyles(stylesPaia);
  const { data } = useGetUser();

  const formSenha = useForm();
  const formName = useForm({
    username: [(t) => t === data?.username && 'altere seu nome', ...validsPaia.username],
  });

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

        <UserDelete />
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
}));
