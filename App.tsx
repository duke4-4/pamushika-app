import "./global.css";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import VendorRegister from './src/screens/VendorRegister';
import VendorOnboarding from './src/screens/VendorOnboarding';
import VendorDashboard from './src/screens/VendorDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="VendorRegister" component={VendorRegister} />
        <Stack.Screen name="VendorOnboarding" component={VendorOnboarding} />
        <Stack.Screen name="VendorDashboard" component={VendorDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
