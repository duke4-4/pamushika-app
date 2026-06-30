import "./global.css";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';

import Splash from './src/screens/Splash';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Favorites from './src/screens/Favorites';
import Profile from './src/screens/Profile';
import VendorRegister from './src/screens/VendorRegister';
import VendorOnboarding from './src/screens/VendorOnboarding';
import VendorDashboard from './src/screens/VendorDashboard';
import VendorProducts from './src/screens/VendorProducts';
import VendorPosts from './src/screens/VendorPosts';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user, profile, initializing } = useAuth();

  if (initializing) {
    return <Splash />;
  }

  const isVendor = !!user && profile?.userType === "vendor";

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="VendorRegister" component={VendorRegister} />
            <Stack.Screen name="VendorOnboarding" component={VendorOnboarding} />
          </>
        ) : isVendor ? (
          <>
            <Stack.Screen name="VendorDashboard" component={VendorDashboard} />
            <Stack.Screen name="VendorProducts" component={VendorProducts} />
            <Stack.Screen name="VendorPosts" component={VendorPosts} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="VendorRegister" component={VendorRegister} />
            <Stack.Screen name="VendorOnboarding" component={VendorOnboarding} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
