export const colorsLight = {
  primary: '#007bff', // Azul primário
  secondary: '#6c757d', // Cinza secundário
  success: '#28a745', // Verde para sucesso
  danger: '#dc3545', // Vermelho para perigo
  warning: '#ffc107', // Amarelo para aviso
  info: '#17a2b8', // Azul para informações
  light: '#f8f9fa', // Fundo claro
  dark: '#343a40', // Fundo escuro
  gray: '#6c757d', // Cinza padrão
  bodyBg: '#1e293b', // Cinza/azul escuro para cor de fundo do corpo
  bodyColor: '#343a40', // Cor do texto do corpo
  borderColor: '#ced4da', // Cor da borda
} as const;

export type Colors = keyof typeof colorsLight;
