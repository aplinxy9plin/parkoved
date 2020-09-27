import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AsyncStorage } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import Auth from '../screens/Auth';
import AuthVK from '../screens/AuthVK';
import LinkingConfiguration from './LinkingConfiguration';
import TourLinking from './TourLinking';
import useCachedResources from './dich'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  return <NavigationContainer
  linking={LinkingConfiguration}>
  <RootNavigator />
</NavigationContainer>
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

function TourNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={Auth} />
      <Stack.Screen name="AuthVK" component={AuthVK} options={{ headerShown: true }}/>
    </Stack.Navigator>
  );
}
