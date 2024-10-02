import { View, Text, Modal } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface ModalTemplateProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  modalVisible: boolean;
  onRequestClose?: () => void;
  width?: string;
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
        <View style={styles.modalView(props.width)}>
          {props.title && <Text style={styles.modalTitle}>{props.title}</Text>}
          {props.subtitle && <Text style={styles.modalSubtitle}>{props.subtitle}</Text>}
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
  modalView: (width = '80%') => ({
    width,
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
  }),
  modalTitle: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 19,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: theme.colors.textPri,
  },
  modalSubtitle: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: theme.colors.textSec,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
}));
