import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAnimal } from '../lib/requests/animalsRequests';
import Toast from 'react-native-toast-message'
import { LoginComponent } from '../components/LoginComponent';
import { getOrganizations } from '../lib/requests/organizationsRequests';
import { getExplorations } from '../lib/requests/explorationsRequests';
import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';

export const SettingsScreen = () => {
  const { t } = useTranslation()

  const isFocused = useIsFocused()

  useEffect(() => {
    async function getInitialData() {
      const explorations = await AsyncStorage.getItem("Explorations")
      const organizations = await AsyncStorage.getItem("Organizations")

      await setexplorations(JSON.parse(explorations))
      await setorganizations(JSON.parse(organizations))
      console.log("terminou");
    }

    if (isFocused) {
      getInitialData()
    }

  }, [isFocused]);

  const [organizations, setorganizations] = useState([]);
  const [explorations, setexplorations] = useState([]);
  const [organizationId, setorganizationId] = useState("");
  const [explorationId, setexplorationId] = useState("");
  const [explorationsFiltered, setexplorationsFiltered] = useState([]);

  async function handleGetData() {
    const organizations = await getOrganizations()
    if (organizations.error || organizations.data.error) return
    await setorganizations(organizations.data.data)
    await AsyncStorage.setItem("Organizations", JSON.stringify(organizations.data.data))

    const explorations = await getExplorations()
    if (explorations.error || explorations.data.error) return
    await setexplorations(explorations.data.data)
    await AsyncStorage.setItem("Explorations", JSON.stringify(explorations.data.data))


    Toast.show({
      type: 'success',
      text1: 'Sucesso!',
      text2: `Dados atualizados!`
    });

    await AsyncStorage.setItem('ExplorationId', 'd8f72b54-1143-4654-b5c1-3cfde3863802')
  }

  async function handleChangeOrganization(value) {
    await setorganizationId(value)
    await AsyncStorage.setItem('ExplorationId', value)

    let filtered = explorations

    filtered = await filtered.filter(item => item.OrganizationId === value)

    await setexplorationsFiltered(filtered)
  }

  async function handleChangeExploration(value) {
    await setexplorationId(value)
    await AsyncStorage.setItem('ExplorationId', value)
  }

  // #### SYNC DE DADOS ####

  async function handleSync() {
    const animals = JSON.parse(await AsyncStorage.getItem('AnimalStorage'))
    let newArray = animals

    for (const element of animals) {
      const { identifier, race, ExplorationId, gender, birthDate, weight } = element

      const res = await createAnimal(identifier, race, ExplorationId, gender, birthDate, weight)

      if (res.error || res.data.error) {
        Toast.show({
          type: 'error',
          text1: 'Erro!',
          text2: `Erro ao inserir o animal ${identifier}!`
        });

      } else {
        newArray = await newArray.filter(item => item.identifier !== res.data.data.identifier)
      }
    }

    await AsyncStorage.setItem('AnimalStorage', JSON.stringify(newArray))

    Toast.show({
      type: 'success',
      text1: 'Sucesso!',
      text2: `Sincronização completa!`
    });
  }

  return <View >
    <Picker name="organizationId"
      selectedValue={organizationId} value={organizationId}
      onValueChange={handleChangeOrganization}
    >
      <Picker.Item key="" value="" label={t("Organization")} />
      {organizations && organizations.map(item => {
        return <Picker.Item key={item.id} value={item.id} label={t(item.name)} />
      })}
    </Picker>

    <Picker name="explorationId"
      selectedValue={explorationId} value={explorationId}
      onValueChange={handleChangeExploration}
    >
      <Picker.Item key="" value="" label={t("Exploration")} />
      {explorationsFiltered && explorationsFiltered.map(item => {
        return <Picker.Item key={item.id} value={item.id} label={t(item.name)} />
      })}
    </Picker>

    <Button
      title={`${t("Sync")} ${t("Explorations")}`}
      onPress={handleGetData} />


    {/* <Text>Sincronização de dados</Text> */}

    <Button
      title={t("Sync")}
      onPress={handleSync} />

    {/* <LoginComponent /> */}
    <Toast />
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    padding: 30,
    justifyContent: 'center',
  },
});