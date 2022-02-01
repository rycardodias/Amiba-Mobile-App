import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './src/screens/Login';
import { AuthProvider } from './src/contexts/AuthContext';
import { AddAnimal } from './src/screens/AddAnimal';
import { ListAnimal } from './src/screens/ListAnimal';
import { SettingsScreen } from './src/screens/SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import "./src/i18n"
import 'intl-pluralrules'
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const { t } = useTranslation()
  const Tab = createBottomTabNavigator()

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer >
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName

                if (route.name === "Home") {
                  iconName = 'home'
                } else if (route.name === "Settings") {
                  iconName = focused ? 'settings' : 'settings';
                } else if (route.name === "AddAnimal") {
                  iconName = focused ? 'add-circle' : 'add-circle';
                } else if (route.name === "ListAnimal") {
                  iconName = "list"
                }

                return <Ionicons name={iconName} size={size} color={route.name === "Home" ? "gray" : color} />
              }
            })}>
            {false ? <Tab.Screen name='Login' component={Login} />
              :
              <>
                {/* <Tab.Screen name='Home' component={Home} options={{ title: t("Home") }} /> */}

                <Tab.Screen name='AddAnimal' component={AddAnimal} options={{ title: t("Add") }} />

                <Tab.Screen name='ListAnimal' component={ListAnimal} options={{ title: t("List") }} />
                <Tab.Screen name='Settings' component={SettingsScreen} options={{ title: t("Settings") }} //listeners={{ tabPress: e => e.preventDefault() }} 
                />
              </>
            }
          </Tab.Navigator>
        </NavigationContainer>
      </AuthProvider >
    </SafeAreaProvider>
  );
}

