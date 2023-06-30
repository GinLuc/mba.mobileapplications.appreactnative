import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomePage from './src/Home';
import LoginPage from './src/Login';
import UsersPage from './src/UserSignUp';
import UpdateScreen from './src/UserUpdate';
import SignUpScreen from './src/RoleSignUp';
import RoleUpdateScreen from './src/RoleUpdate';

const Stack = createNativeStackNavigator();

function StackedScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginPage} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={HomePage} options={{title: 'Página Inicial', headerShown: false}}/>
        <Stack.Screen name='UserSignUp' component={UsersPage} options={{headerShown: false}}/>
        <Stack.Screen name='UserUpdate' component={UpdateScreen} options={{headerShown: false}}/>
        <Stack.Screen name='RoleSignUp' component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name='RoleUpdate' component={RoleUpdateScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <StackedScreens/>
  );
}


