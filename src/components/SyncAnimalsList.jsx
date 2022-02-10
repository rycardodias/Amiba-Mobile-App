import React from 'react'
import { Icon } from 'react-native-elements/';
import { Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAnimal } from '../lib/requests/animalsRequests'

export const SyncAnimalsList = (props) => {

    async function syncBtnPress() {
        Alert.alert(
            "Atenção!",
            "Deseja sincronizar todos os animais para a base de dados?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Sim", onPress: () => handleSyncAnimals() }
            ]
        );

    }

    async function handleSyncAnimals() {
        try {
            const animals = await JSON.parse(await AsyncStorage.getItem('AnimalStorage'))
            let newArray = animals

            if (!animals[0]) return await props.handleToast('error', 'Erro!', 'Não existem dados para submeter!')

            for (const element of animals) {
                const { identifier, race, ExplorationId, gender, birthDate, weight } = element

                const res = await createAnimal(identifier, race, ExplorationId, gender, birthDate, weight)

                if (res.error || res.data.error) {
                    props.handleToast('error', 'Erro!', `Erro ao inserir o animal ${identifier}!`)

                } else {
                    newArray = await newArray.filter(item => item.identifier !== res.data.data.identifier)
                }
            }
            await AsyncStorage.setItem('AnimalStorage', JSON.stringify(newArray))

            return await props.handleToast('success', 'Sucesso!', `Sincronização completa!`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Pressable
            onPress={() => syncBtnPress()}
            style={{ marginRight: 20, }}
        >
            <Icon name="cloud-upload"></Icon>
        </Pressable>
    )
}
