import React, { useEffect, useState } from 'react';
import { View, Button, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Avatar } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export const ListAnimal = () => {
  const { t } = useTranslation()
  const [animalList, setanimalList] = useState([]);
  const [loading, setloading] = useState(true);
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      handleList();
    }

  }, [isFocused]);

  async function handleList() {
    await setloading(true)
    const existingData = await AsyncStorage.getItem('AnimalStorage')
    
    await setanimalList(JSON.parse(existingData))
    await setloading(false)
  }

  async function handleDeleteItem(identifier) {
    let newList = animalList
    newList = await newList.filter(item => item.identifier !== identifier)

    await AsyncStorage.setItem('AnimalStorage', JSON.stringify(newList))
    await handleList()
  }

  async function handleEditItem(identifier) {

  }

  return <ScrollView >
    {!loading && animalList &&
      animalList.map((l, i) => (
        <ListItem key={i} bottomDivider>
          {/* <Avatar source={{ uri: l.avatar_url }} /> */}
          <ListItem.Swipeable
            rightContent={
              <Button title={t("Delete")} onPress={() => handleDeleteItem(l.identifier)} />
            }
            leftContent={
              <Button title={t("Edit")} onPress={() => handleEditItem(l.identifier)} />
            }
          >
            <ListItem.Title>{l.identifier}</ListItem.Title>
            <ListItem.Subtitle>{l.ExplorationId}</ListItem.Subtitle>
          </ListItem.Swipeable>
        </ListItem>
      ))
    }
  </ScrollView >;
};
