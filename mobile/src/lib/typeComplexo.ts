type _Obj = Record<string, any>;

/**
 * mapeia o objeto e retorna os caminhos
 */
export type CaminhoParaAsPontasDoObj<T> = T extends _Obj
  ? {
      [K in keyof T]: T[K] extends _Obj
        ? `${K & string}:${CaminhoParaAsPontasDoObj<T[K]>}`
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
  const keys = path.split(':');

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
  > = P extends `${infer Key}:${infer Resto}`
    ? GetValueByPath<O[Key], Resto>
    : O[P];

  return value as GetValueByPath<O, P>;
}
