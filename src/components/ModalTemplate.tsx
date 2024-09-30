import { View, Text, Modal } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface ModalTemplateProps {
  children: React.ReactNode;
  title: string;
  modalVisible: boolean;
  onRequestClose: () => void;
}
export default function ModalTemplate(props: ModalTemplateProps) {
  const { styles } = useStyles(stylesPaia);

  return (
    <Modal
      presentationStyle="overFullScreen"
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{props.title}</Text>
          <View style={styles.buttonContainer}>{props.children}</View>
        </View>
      </View>
    </Modal>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    width: '80%',
    backgroundColor: theme.colors.body,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPri,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
}));
