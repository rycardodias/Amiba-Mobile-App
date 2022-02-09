import React from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message'
import { LoginComponent } from '../components/LoginComponent';

export const SettingsScreen = () => {
  return <View style={styles.container}>

    <LoginComponent />
    <Toast />

  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});