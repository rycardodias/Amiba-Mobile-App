import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './src/screens/Login';
import { AuthProvider } from './src/contexts/AuthContext';
import { AddAnimal } from './src/screens/AddAnimal';
import { ListAnimal } from './src/screens/ListAnimal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import "./src/i18n"
import 'intl-pluralrules'
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SyncOrganizationsExplorations } from './src/components/SyncOrganizationsExplorations';
import { SyncAnimalsList } from './src/components/SyncAnimalsList';
import Toast from 'react-native-toast-message'
import { useState } from 'react';
import { Modal, StyleSheet, View, Text } from 'react-native';


export default function App() {
  const { t } = useTranslation()
  const Tab = createBottomTabNavigator()

  const [refreshList, setrefreshList] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  async function handleRefreshList() {
    await setrefreshList(!refreshList)
  }

  const AnimalListComponents = props => <ListAnimal refresh={refreshList} />

  return (
    <>
      <SafeAreaProvider>
        <AuthProvider>
          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={!modalVisible}
            onPress={() => setModalVisible(!modalVisible)}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);

            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text >Hello World!</Text>
              </View>
            </View>
          </Modal> */}
          <NavigationContainer >
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName
                  if (route.name === "AddAnimal") iconName = focused ? 'add-circle' : 'add-circle';
                  else if (route.name === "ListAnimal") iconName = "list"

                  return <Ionicons name={iconName} size={size} color={route.name === "Home" ? "gray" : color} />
                }
              })}>

              {false ? <Tab.Screen name='Login' component={Login} />
                :
                <>
                  <Tab.Screen name='AddAnimal' component={AddAnimal} options={{
                    title: t("Add"),
                    headerRight: () => (<SyncOrganizationsExplorations />)
                  }} />

                  < Tab.Screen name='ListAnimal' component={AnimalListComponents}
                    options={{
                      title: t("List"),
                      headerRight: () => (<SyncAnimalsList handleRefreshList={handleRefreshList} />)
                    }}
                  />
                </>
              }
            </Tab.Navigator>
          </NavigationContainer>
        </AuthProvider >

      </SafeAreaProvider>
      <Toast />
    </>
  );
}

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
