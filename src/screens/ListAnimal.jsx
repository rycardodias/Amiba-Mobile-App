import React, { useEffect, useState } from 'react';
import { View, Button, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet } from 'react-native';

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


  return <View style={{ height: '100%' }}>
    {/* <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");

      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text >Hello World!</Text>
        </View>
      </View>
    </Modal> */}
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
    {/* <Toast /> */}

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
