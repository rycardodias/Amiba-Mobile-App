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
import { NativeBaseProvider, Box } from "native-base";

import { SyncOrganizationsExplorations } from './src/components/SyncOrganizationsExplorations';
import { SyncAnimalsList } from './src/components/SyncAnimalsList';
import Toast from 'react-native-toast-message'
import { useState } from 'react';
import { LoginModal } from './src/components/LoginModal';


export default function App() {
  const { t } = useTranslation()
  const Tab = createBottomTabNavigator()

  const [refreshList, setrefreshList] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [loggedIn, setloggedIn] = useState(false)

  async function handleRefreshList() {

    await setrefreshList(!refreshList)
  }

  async function handleShowModal() {
    await setModalVisible(!modalVisible)
  }

  async function handleloggedIn() {
    setloggedIn(!loggedIn)
  }

  const AnimalListComponents = props => <ListAnimal refresh={refreshList} />

  return (
    <>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <AuthProvider>
            <LoginModal visible={modalVisible} showModal={handleShowModal} loggedIn={handleloggedIn} />

            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName
                    if (route.name === "AddAnimal") iconName = focused ? 'add-circle' : 'add-circle';
                    else if (route.name === "ListAnimal") iconName = "list"

                    return <Ionicons name={iconName} size={size} color={route.name === "Home" ? "gray" : color} />
                  }
                })}>

                <Tab.Screen name='AddAnimal' component={AddAnimal} options={{
                  title: t("Add"),
                  headerRight: () => (<SyncOrganizationsExplorations showModal={handleShowModal} modalVisible={modalVisible} loggedIn={loggedIn} />)
                }} />

                < Tab.Screen name='ListAnimal' component={AnimalListComponents}
                  options={{
                    title: t("List"),
                    headerRight: () => (<SyncAnimalsList showModal={handleShowModal} handleRefreshList={handleRefreshList} />)
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </AuthProvider >

        </SafeAreaProvider>
      </NativeBaseProvider>
      <Toast />
    </>
  );
}


