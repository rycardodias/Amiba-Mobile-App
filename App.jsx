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

export default function App() {
  const Tab = createBottomTabNavigator()

  return (
    <AuthProvider>
      <NavigationContainer >
        <Tab.Navigator>
          {false ? <Tab.Screen name='Login' component={Login} />
            :
            <>
              <Tab.Screen name='AddAnimal' component={AddAnimal} />

              <Tab.Screen name='Home' component={Home} />
              <Tab.Screen name='ListAnimal' component={ListAnimal} />
              <Tab.Screen name='Settings' component={SettingsScreen} />
            </>
          }
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
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
