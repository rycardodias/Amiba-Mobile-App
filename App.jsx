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
import { useState } from 'react';


export default function App() {
  const { t } = useTranslation()
  const Tab = createBottomTabNavigator()
  const [toastObject, settoastObject] = useState({ type: '', text1: '', text2: '' })
  const [showToast, setshowToast] = useState(false)

  async function handleToast(type, text1, text2) {
    if (!(type && text1 && text2)) {
      await setshowToast(false)
      await settoastObject({ type: type, text1: text1, text2: text2 })
    } else {
      await settoastObject({ type: type, text1: text1, text2: text2 })
      await setshowToast(true)
    }
  }


  const ListAnimalComponent = props => <ListAnimal toastObject={toastObject} showToast={showToast} {...props} />;
  const AddAnimalComponent = props => <AddAnimal toastObject={toastObject} showToast={showToast}   {...props} />;


  return (
    <>
      <SafeAreaProvider>
        <AuthProvider>
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
                  <Tab.Screen name='AddAnimal' component={AddAnimalComponent} options={{
                    title: t("Add"),
                    headerRight: () => (<SyncOrganizationsExplorations handleToast={handleToast} />)
                  }} />

                  <Tab.Screen name='ListAnimal' component={ListAnimalComponent}
                    options={{
                      title: t("List"),
                      headerRight: () => (<SyncAnimalsList handleToast={handleToast} />)
                    }}
                  />
                </>
              }
            </Tab.Navigator>
          </NavigationContainer>
        </AuthProvider >
      </SafeAreaProvider>
    </>
  );
}

