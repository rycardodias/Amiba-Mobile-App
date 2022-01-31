import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Login } from './src/screens/Login';
import Toast from 'react-native-toast-message'
import { AuthProvider } from './src/contexts/AuthContext';
import { Home } from './src/screens/Home';
import useAuth from './src/hooks/useAuth';


export default function App() {

  const Tab = createBottomTabNavigator()
  const { isAuthenticated } = useAuth()
  return (
    <>
      <AuthProvider>
        <NavigationContainer>
          <Tab.Navigator>
            
            {!isAuthenticated ? <Tab.Screen name='Login' component={Login} />
              : <>
                <Tab.Screen name='Home' component={Home} />
              </>

            }

          </Tab.Navigator>
        </NavigationContainer>
        {/* <Toast /> */}
      </AuthProvider>
    </>
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
