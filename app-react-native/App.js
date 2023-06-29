import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomePage from './src/Home';
import LoginPage from './src/Login';
import UsersPage from './src/UserSignUp';
import UpdateScreen from './src/UserUpdate';

const Stack = createNativeStackNavigator();

function StackedScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginPage} options={{ title: 'Acesso' }} />
        <Stack.Screen name='Home' component={HomePage} options={{title: 'Página Inicial', headerShown: false}}/>
        <Stack.Screen name='UserSignUp' component={UsersPage} options={{headerShown: false}}/>
        <Stack.Screen name='UserUpdate' component={UpdateScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <StackedScreens/>
  );
}


