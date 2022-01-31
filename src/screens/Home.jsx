import React from 'react';
import { Text, Button } from 'react-native';
import useAuth from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Home = ({ navigation }) => {
  const { logout } = useAuth()

  async function handleExplorations() {
    await AsyncStorage.setItem('ExplorationId', 'd8f72b54-1143-4654-b5c1-3cfde3863802')
  }
  return <Button
    title="Procurar explorações"
    onPress={handleExplorations} />;
};
