import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import Auth from '../screens/Auth';
import AuthVK from '../screens/AuthVK';
import LinkingConfiguration from './LinkingConfiguration';
import TourLinking from './TourLinking';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [user_id, setuser_id] = React.useState(null)
  React.useEffect(() => {
    console.log(228);
  }, [])
  if(user_id){
    return (
      <NavigationContainer
        linking={TourLinking}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <TourNavigator />
      </NavigationContainer>
    );
  }else{
    return (
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    );
  }
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

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
