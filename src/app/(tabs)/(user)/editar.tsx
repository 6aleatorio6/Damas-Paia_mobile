import Input from '@/components/form/FormInput';
import FormMolde from '@/components/form/FormMolde';
import FormSubmit from '@/components/form/FormSubmit';
import { UserDelete } from '@/components/user/UserDelete';
import { queryClientPaia } from '@/libs/apiHooks/reactQuery/queryContext';
import { useUserPut } from '@/libs/apiHooks/mutations';
import { useGetUser } from '@/libs/apiHooks/querys';
import { useForm } from '@/libs/form/formHooks';
import { router } from 'expo-router';
import { Alert, ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useValidsPaia } from '@/libs/form/validacoes';

export default function Indextabs() {
  const { styles } = useStyles(stylesPaia);
  const { data } = useGetUser({});
  const validsPaia = useValidsPaia();

  const formSenha = useForm();
  const formName = useForm({
    username: [(t) => t === data?.username && 'altere seu nome', ...validsPaia.username],
  });

  const onSuccess = () => {
    queryClientPaia.invalidateQueries({ queryKey: ['user'] });
    Alert.alert('Sucesso', 'Dados alterados com sucesso');
    router.navigate('/(tabs)/(user)');
  };

  const nameMutation = useUserPut({ onSuccess });
  const senhaMutation = useUserPut({ onSuccess });

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
            submit={nameMutation}
            style={styles.buttonSubmit}
            height={55}
            title="SALVAR NOME"
          />
        </FormMolde>

        <FormMolde title="ALTERAR SENHA" style={styles.form} titleStyle={styles.textStyle}>
          <Input form={formSenha} field="password" name="senha" textContentType="password" secureTextEntry />
          <FormSubmit
            form={formSenha}
            submit={senhaMutation}
            style={styles.buttonSubmit}
            height={55}
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
    marginBottom: '2%',
  },
  buttonSubmit: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.warning,
    fontSize: 20,
  },
}));
