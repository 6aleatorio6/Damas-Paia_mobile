import { useEffect, useMemo, useRef, useState } from 'react';
import { useValidador, Valid } from './useValidador';
import { useValidsPaia } from './validacoes';
type ValidsPaia = ReturnType<typeof useValidsPaia>;

export function useForm(validsOptions?: ValidOptions) {
  const valuesRef = useRef({} as Record<keyof ValidsPaia, string>);
  const statusRef = useRef({} as Record<keyof ValidsPaia, boolean>);
  const formValidyState = useState(false);
  const valids = useValidsPaia();

  const validacoes = useMemo(() => createValidacoes(valids, validsOptions), [validsOptions]);

  return {
    valuesFields: valuesRef.current,
    statusFields: statusRef.current,
    formValidyState,
    validacoes,
  };
}

type ValidOptions = {
  [K in keyof ValidsPaia]?: {
    optional?: boolean;
    addStart?: Valid[];
    addEnd?: Valid[];
  } & ({ pick?: (keyof ValidsPaia[K])[]; omit?: never } | { omit?: (keyof ValidsPaia[K])[]; pick?: never });
};
function createValidacoes(ValidsDefault: ValidsPaia, validsOpts?: ValidOptions) {
  const validacoesDosCampos = {} as Record<string, Valid[]>;

  let key: keyof ValidsPaia;
  for (key in ValidsDefault) {
    const validacoes = [] as Valid[];
    const validDefaultCampo = ValidsDefault[key] as Record<string, Valid>;
    const { addStart, addEnd, pick, omit, optional } = validsOpts?.[key] || {};

    if (optional) validacoes.push('OPTIONAL');
    if (addStart) validacoes.push(...addStart);
    validacoes.push(
      ...(pick
        ? pick.map((k) => validDefaultCampo[k] as Valid)
        : omit
          ? Object.keys(validDefaultCampo)
              .filter((k) => !(omit as string[]).includes(k))
              .map((k) => validDefaultCampo[k])
          : Object.values(validDefaultCampo)),
    );
    if (addEnd) validacoes.push(...addEnd);

    validacoesDosCampos[key] = validacoes;
  }

  return validacoesDosCampos;
}

export interface UseFormR<Fields extends string> {
  valuesFields: Record<Fields, string>;
  statusFields: Record<Fields, boolean>;
  validacoes: Record<Fields, Valid[]>;
  formValidyState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
export function useInput<F extends UseFormR<K>, K extends string>(formData: F, field: K, dValue?: string) {
  const [value, setValue] = useState(dValue || '');
  const { status, error } = useValidador(value, formData.validacoes[field]);

  formData.valuesFields[field] = value;

  const isFieldValidy = status === 'VALIDY' || status === 'OFF';
  useEffect(() => {
    formData.statusFields[field] = isFieldValidy;

    const [isFormValidyAntigo, setStatusForm] = formData.formValidyState;
    const isFormValidyAtual = !Object.values(formData.statusFields).includes(false);

    if (isFormValidyAtual !== isFormValidyAntigo) setStatusForm(isFormValidyAtual);
  }, [isFieldValidy]);

  return { value, setValue, status, error };
}
