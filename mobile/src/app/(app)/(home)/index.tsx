import { clientQuery } from '@/app/_layout';
import ButtonForm from '@/components/ButtonForm';
import { FraseItem } from '@/components/Frases';
import InputText from '@/components/InputText';
import { TextPaia } from '@/components/themes';
import { useApi } from '@/lib/axiosApi';
import { useCreateFrase, useFrases } from '@/lib/querysMutations/useFrases';
import { RotateCcw } from 'lucide-react-native';

import { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';

export default function IndexHome() {
  const { data, isLoading, refetch } = useFrases();

  const useAllValue = useState({ frase: '' });

  const { mutate } = useCreateFrase(useAllValue[0].frase);

  return (
    <View className="flex-1 space-y-4   items-center ">
      <View className="w-11/12 flex-col space-y-5">
        <TextPaia
          ColorName="pri"
          className="font-semibold  text-lg text-center py-3 "
        >
          MINHA FRASE TRISTE DO DIA
        </TextPaia>
        <InputText
          field="frase"
          valState={useAllValue}
          className="dark:text-black items-center"
          placeholder="Digite a frase"
        />
        <ButtonForm className="py-2" onPress={mutate}>
          <TextPaia ColorName="pri" className="">
            Mandar para o mundo
          </TextPaia>
        </ButtonForm>
      </View>

      <View className="w-11/12 h-[53%] flex-col ">
        <View className="flex-row justify-between items-center pt-5 pb-3">
          <TextPaia
            ColorName="pri"
            className="font-semibold text-xl text-center align-text-bottom "
          >
            FRASES TRISTES DE TODO MUNDO
          </TextPaia>
          <TouchableOpacity onPress={() => refetch()}>
            <RotateCcw color={'orange'} size={'25'} />
          </TouchableOpacity>
        </View>
        {isLoading && (
          <TextPaia ColorName="pri" className="m-auto text-2xl">
            Carregando...
          </TextPaia>
        )}

        {!isLoading && (
          <FlatList
            data={data}
            renderItem={FraseItem}
            keyExtractor={(item, index) => index.toString()}
            className="border-2 border-gray-500 rounded-md"
          />
        )}
      </View>
    </View>
  );
}
