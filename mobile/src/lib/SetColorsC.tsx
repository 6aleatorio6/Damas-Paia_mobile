import { CaminhoParaAsPontasDoObj } from '@/lib/typeComplexo';
import { StyledComponent } from 'nativewind';
import { ComponentProps, ReactNode } from 'react';
import { NativeMethods } from 'react-native';
import { DefaultColors } from 'tailwindcss/types/generated/colors';
import { Constructor } from 'react-native/types/private/Utilities';

/**
 * - Sim, fiquei hrs nisso dnv
 * - Sim, ficou um pouco complexo
 * - Sim, talvez não compensou o tempo
 * - Mas concordamos que ficou foda, ou nao
 *
 * @description
 * Esta função recebe um componente e um objeto de temas e retorna um componente
 * que pode aplicar cores com base nos temas fornecidos.
 *
 * Ela aceita um componente e um conjunto de temas, onde cada tema é associado a uma chave.
 * O componente resultante terá a capacidade de aplicar as cores definidas nos temas aos seus elementos internos,
 * permitindo uma fácil personalização do estilo com base no tema atual.
 *
 * Exemplo de uso:
 *
 * ```
 * const TematizadoTexto = SetColorAtComp(Text, {
 *   pri: [['bg-white', 'dark:bg-black']],,
 * });
 *
 * <TematizadoTexto ColorName="pri">Texto Primário</TematizadoTexto>
 * ```
 *
 */
export function SetColorAtComp<T extends ComponentType, C extends ColorObj>(
  Target: T,
  setColors: C,
) {
  type CompType = Exclude<T, Constructor<NativeMethods>>;

  type Props = { ColorName: keyof C } & ComponentProps<T>;
  // componente
  return function ComponentWithColor({ ColorName, ...props }: Props) {
    const classColorsArray = setColors[ColorName];

    const classColors = Array.isArray(classColorsArray)
      ? classColorsArray.join(' ')
      : '';

    return (
      <StyledComponent
        className={classColors}
        {...props}
        component={Target as CompType}
      />
    );
  };
}

type _C =
  `${'dark:' | ''}${'bg' | 'text'}-${CaminhoParaAsPontasDoObj<DefaultColors>}`;

type ColorObj<T extends string = 'pri' | 'sec' | 'ter' | 'qua'> = {
  [K in T]?: _C[];
};

type ComponentType =
  | ((props: Record<string, any>) => JSX.Element | ReactNode)
  | Constructor<NativeMethods>;
