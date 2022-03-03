import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Alert } from 'react-native';
import { FlatList, Text, Box, HStack, VStack, Spacer, View, Pressable } from 'native-base';
import { genders, races } from '../lib/values/types';

export const ListAnimal = (props) => {
  const { t } = useTranslation()

  const [explorations, setexplorations] = useState([])
  const [animalList, setanimalList] = useState([]);
  const [loading, setloading] = useState(true);

  const isFocused = useIsFocused()

  useEffect(() => {
    let x = true
    if (isFocused)
      handleList()

    return () => { x = false }
  }, [isFocused, props.refresh]);

  async function handleList() {
    try {
      await setloading(true)
      const explorations = await AsyncStorage.getItem('Explorations')
      await setexplorations(JSON.parse(explorations))

      const existingData = await AsyncStorage.getItem('AnimalStorage')
      await setanimalList(JSON.parse(existingData))

      await setloading(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDeleteItem(identifier) {
    Alert.alert(
      "Atenção!",
      "Deseja eliminar o animal " + identifier + " ?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: async () => {
            await setloading(true)
            let newList = animalList
            newList = await newList.filter(item => item.identifier !== identifier)

            await AsyncStorage.setItem('AnimalStorage', JSON.stringify(newList))
            await handleList()
            await setloading(false)
          }
        }
      ]
    );

  }

  // ### Explorations names
  function getExplorationName(id) {
    const filtered = explorations.filter(item => item.id === id)
    return filtered[0].name
  }


  return <View style={{ height: '100%' }} >
    <FlatList data={animalList} renderItem={
      ({ item }) =>
        <Pressable onLongPress={() => handleDeleteItem(item.identifier)}>
          <Box key={item.identifier} style={{backgroundColor: '#fff'}}
           borderBottomWidth="1" _dark={{ borderColor: "gray.600" }} borderColor="coolGray.200" pl="4" pr="5" py="2">
            <HStack space={3} justifyContent="space-between">
              {/* <Avatar size="48px" source={{ uri: item.avatarUrl }} /> */}
              <VStack>
                <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>
                  {item.identifier}
                </Text>
                <Text color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                  {getExplorationName(item.ExplorationId)}
                </Text>
              </VStack>
              <Spacer />
              <VStack>
                <Text fontSize="xs" _dark={{ color: "warmGray.50" }} color="coolGray.800" alignSelf="flex-end">
                  {t(races.find(i => i.id === item.race).name)}
                </Text>
                <Text fontSize="xs" _dark={{ color: "warmGray.50" }} color="coolGray.800" alignSelf="flex-end">
                  {`[ ${item.weight} g ]  ${t(genders.find(i => i.id === item.gender).name)}`}
                </Text>
              </VStack>

            </HStack>
          </Box>
        </Pressable>
    } keyExtractor={item => item.id} />


  </View>
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
