import React, { useEffect, useState } from 'react';
import { View, Button, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Avatar } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Divider } from 'react-native-elements';
import Toast from 'react-native-toast-message'
import { List } from 'react-native-paper';

export const ListAnimal = (props) => {
  const { t } = useTranslation()

  const [explorations, setexplorations] = useState([])
  const [animalList, setanimalList] = useState([]);
  const [loading, setloading] = useState(true);

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      handleList()
        .catch(error => console.log(error));
    }
  }, [isFocused]);

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
    let newList = animalList
    newList = await newList.filter(item => item.identifier !== identifier)

    await AsyncStorage.setItem('AnimalStorage', JSON.stringify(newList))
    await handleList()
  }

  // ### Explorations names
  function getExplorationName(id) {
    const filtered = explorations.filter(item => item.id === id)
    return filtered[0].name
  }

  // ### TOASTS

  function handleToast() {
    const { type, text1, text2 } = props.toastObject
    if (!(type && text1 && text2)) return

    Toast.show({
      type: type,
      text1: text1,
      text2: text2
    });
  }

  useEffect(() => {
    handleToast()
  }, [props.toastObject])



  return <View style={{ height: '100%' }}>
    <ScrollView >
      {!loading && animalList &&
        animalList.map((l, i) => (
          <ListItem key={i} bottomDivider topDivider>
            {/* <Avatar source={{ uri: l.avatar_url }} /> */}
            <ListItem.Swipeable
              rightContent={
                <Button title={t("Delete")} onPress={() => handleDeleteItem(l.identifier)} />
              }
            // leftContent={
            //   <Button title={t("Edit")} onPress={() => handleEditItem(l.identifier)} />
            // }
            >
              <ListItem.Title>{l.identifier}</ListItem.Title>
              <ListItem.Subtitle>{`${getExplorationName(l.ExplorationId)}\nRaça: ${l.race} Genero: ${l.gender} Peso: ${l.weight}`}</ListItem.Subtitle>
            </ListItem.Swipeable>
          </ListItem>
        ))
      }
    </ScrollView >
    <Toast />
  </View>
};
