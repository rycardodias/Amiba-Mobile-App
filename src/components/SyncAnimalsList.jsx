import React from 'react'
import { Icon } from 'react-native-elements/';
import { Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAnimal } from '../lib/requests/animalsRequests'
import Toast from 'react-native-toast-message'
import useAuth from '../hooks/useAuth';

export const SyncAnimalsList = (props) => {
    const { login, logout } = useAuth()

    async function handleLogin() {
        let email, password = ''

        const loginRequest = await login(email, password)
    }

    async function syncBtnPress() {
        const animals = await JSON.parse(await AsyncStorage.getItem('AnimalStorage'))

        if (!animals) return Toast.show({ type: 'error', text1: 'Erro!', text2: 'Não existem dados para submeter!' });

        Alert.alert(
            "Atenção!",
            "Deseja sincronizar todos os animais para a base de dados?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sim", onPress: () => {
                        
                        handleLogin()
                        handleSyncAnimals(animals)
                    }
                }
            ]
        );

    }



    async function handleSyncAnimals(animals) {
        try {
            let newArray = animals

            if (!animals[0]) return Toast.show({ type: 'error', text1: 'Erro!', text2: 'Não existem dados para submeter!' });

            for (const element of animals) {
                const { identifier, race, ExplorationId, gender, birthDate, weight } = element

                const res = await createAnimal(identifier, race, ExplorationId, gender, birthDate, weight)

                if (res.error || res.data.error) return Toast.show({ type: 'error', text1: 'Erro!', text2: `Erro ao inserir o animal ${identifier}!` });

                newArray = await newArray.filter(item => item.identifier !== res.data.data.identifier)

            }
            await AsyncStorage.setItem('AnimalStorage', JSON.stringify(newArray))

            props.handleRefreshList()

            return Toast.show({ type: 'success', text1: 'Sucesso!', text2: 'Sincronização completa!' });
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
