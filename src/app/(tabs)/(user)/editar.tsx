import ButtonBig from '@/components/ButtonBig';
import Input from '@/components/FormInput';
import FormMolde from '@/components/FormMolde';
import ButtonSubmit from '@/components/FormSubmit';
import { useGetUser } from '@/libs/apiHooks/querys';
import { validsPaia } from '@/libs/form/validacoes';
import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Indextabs() {
  const { styles } = useStyles(stylesPaia);
  const { data } = useGetUser();

  return (
    <ScrollView>
      <View style={styles.container}>
        <FormMolde
          title="ALTERAR NOME"
          style={styles.form}
          titleStyle={styles.textStyle}
          replaceValids={{
            username: [(t) => t === data?.username && 'altere seu nome', ...validsPaia.username],
          }}
          submitOptions={(axios) => ({})}
        >
          <Input
            field="username"
            name="Nome de usuario"
            textContentType="nickname"
            defaultValue={data?.username}
          />
          <ButtonSubmit style={styles.buttonSubmit} height={70} title="Entrar" />
        </FormMolde>

        <FormMolde
          title="ALTERAR SENHA"
          style={styles.form}
          titleStyle={styles.textStyle}
          submitOptions={(axios) => ({})}
        >
          <Input field="username" name="Nome de usuario" textContentType="nickname" />
          <Input field="password" name="senha" textContentType="password" secureTextEntry />
          <ButtonSubmit style={styles.buttonSubmit} height={60} title="Entrar" />
        </FormMolde>

        <ButtonBig style={styles.button}>EXCLUIR CONTA</ButtonBig>
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
  },
  button: {
    marginTop: '10%',
    backgroundColor: theme.colors.bodySec,
    color: theme.colors.danger,
    fontSize: 30,
    paddingVertical: 10,
  },
}));
