type _Obj = Record<string, any>;

/**
 * não encontrei um nome melhor
 *
 * ele apenas é o separador de caminho
 *
 * ex:
 * separador = '-'; path-path2-path
 */
const separador = '-';

/**
 * mapeia o objeto e retorna os caminhos
 */
export type CaminhoParaAsPontasDoObj<T> = T extends _Obj
  ? {
      [K in keyof T]: T[K] extends _Obj
        ? `${K & string}${typeof separador}${CaminhoParaAsPontasDoObj<T[K]>}`
        : K;
    }[keyof T]
  : never;

/**
 * percorre o caminho e pega o tipo do fim do caminho
 */
export function getByPath<
  O extends Record<string, any>,
  P extends CaminhoParaAsPontasDoObj<O>,
>(obj: O, path: P) {
  const keys = path.split(separador);

  let value;
  for (const key of keys) {
    value = (value ? value : obj)[key];
  }

  /**
   * percorre o caminho e pega o tipo do fim do caminho
   */
  type GetValueByPath<
    O extends _Obj,
    P extends string,
  > = P extends `${infer Key}${typeof separador}${infer Resto}`
    ? GetValueByPath<O[Key], Resto>
    : O[P];

  return value as GetValueByPath<O, P>;
}
