import ButtonSubmit from '@/components/ButtonSubmit';
import Input from '@/components/FormInput';
import FormMolde from '@/components/FormMolde';
import FormSubmit from '@/components/FormSubmit';
import { editarFormOptions, useDeleteUser } from '@/libs/apiHooks/mutations';
import { useGetUser } from '@/libs/apiHooks/querys';
import { validsPaia } from '@/libs/form/validacoes';
import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Indextabs() {
  const { styles } = useStyles(stylesPaia);
  const { data } = useGetUser();
  const optionsDelete = useDeleteUser();

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
          submitOptions={editarFormOptions}
        >
          <Input
            field="username"
            name="Nome de usuario"
            textContentType="nickname"
            defaultValue={data?.username}
          />
          <FormSubmit style={styles.buttonSubmit} height={70} title="SALVAR NOME" />
        </FormMolde>

        <FormMolde
          title="ALTERAR SENHA"
          style={styles.form}
          titleStyle={styles.textStyle}
          submitOptions={editarFormOptions}
        >
          <Input field="password" name="senha" textContentType="password" secureTextEntry />
          <FormSubmit style={styles.buttonSubmit} height={70} title="SALVAR SENHA" />
        </FormMolde>

        <ButtonSubmit style={styles.buttonDelete} title="EXCLUIR CONTA" useApi={optionsDelete} />
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
