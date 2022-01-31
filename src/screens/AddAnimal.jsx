import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'

export const AddAnimal = () => {
    const emptyObject = {
        identifier: "",
        ExplorationId: "",
        race: "",
        gender: "",
        birthDate: "",
        slaughterDate: "",
        slaughterWeight: "",
        slaughterLocal: "",
        breeder: "",
    }

    const [animal, setanimal] = useState(emptyObject);

    async function handleAddAnimal() {
        try {
            const ExplorationId = await AsyncStorage.getItem('ExplorationId')
            let animalAux = { ...animal, ExplorationId: ExplorationId }

            let newArray = []

            const existingData = await AsyncStorage.getItem('AnimalStorage')

            if (!existingData) {
                await AsyncStorage.setItem('AnimalStorage', JSON.stringify([animalAux]))
            } else {
                const parsed = JSON.parse(existingData)

                for (const element of parsed) {
                    newArray.push(element)
                }
                newArray.push(animalAux)

                await AsyncStorage.setItem('AnimalStorage', JSON.stringify(newArray))
            }
            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Registo adicionado com sucesso!'
            });
            await setanimal(emptyObject)
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Erro ao adicionar registo!'
            });
        }
    }

    async function handleList() {
        const existingData = await AsyncStorage.getItem('AnimalStorage')
        console.log("existingData", JSON.parse(existingData));
    }

    async function handleDelete() {
        await AsyncStorage.removeItem('AnimalStorage')
    }

    return <View style={styles.container}>
        <Text>Introduzir animal</Text>
        <TextInput style={styles.input}
            value={animal.identifier}
            placeholder='Introduza o identificador'
            onChangeText={text => setanimal({ ...animal, identifier: text })} />
        <TextInput style={styles.input}
            value={animal.race}
            placeholder='Introduza a raça'
            onChangeText={text => setanimal({ ...animal, race: text })} />
        <TextInput style={styles.input}
            value={animal.gender}
            placeholder='Introduza o genero'
            onChangeText={text => setanimal({ ...animal, gender: text })} />
        <Button
            title='Adicionar Animal'
            onPress={handleAddAnimal} />
        <Button
            title='Listar Animal'
            onPress={handleList} />
        <Button
            title='Listar Animal'
            onPress={handleDelete} />
        <Toast />

    </View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
    input: {
        height: 30,
        margin: 10,
        borderWidth: 1,
        padding: 10
    }
});
