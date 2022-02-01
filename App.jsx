import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { Login } from './src/screens/Login';
import { AuthProvider } from './src/contexts/AuthContext';
import { Home } from './src/screens/Home';
import useAuth from './src/hooks/useAuth';
import { AddAnimal } from './src/screens/AddAnimal';
import { ListAnimal } from './src/screens/ListAnimal';
import { SettingsScreen } from './src/screens/SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import "./src/i18n"
import 'intl-pluralrules'
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation()
  const Tab = createBottomTabNavigator()

  return (
    <AuthProvider>
      <NavigationContainer >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName

              if (route.name === "Home") {
                iconName = focused
                  ? 'home' : 'home'
              } else if (route.name === "Settings") {
                iconName = focused ? 'settings' : 'settings';
              } else if (route.name === "AddAnimal") {
                iconName = focused ? 'add-circle' : 'add-circle';
              } else if (route.name === "ListAnimal") {
                iconName = "list"
              }

              return <Ionicons name={iconName} size={size} color={color} />
            }
          })}>
          {false ? <Tab.Screen name='Login' component={Login} />
            :
            <>
              <Tab.Screen name='AddAnimal' component={AddAnimal} options={{ title: t("Add") }} />

              <Tab.Screen name='Home' component={Home} options={{ title: t("Home") }} />
              <Tab.Screen name='ListAnimal' component={ListAnimal} options={{ title: t("List") }} />
              <Tab.Screen name='Settings' component={SettingsScreen} options={{ title: t("Settings") }} />
            </>
          }
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
