import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import Profile from '../screens/Profile';
import Item from '../screens/Item';
import Events from '../screens/Events';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint}}>
      <BottomTab.Screen
        name="Карта"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="map-o" size={25} color={color}/>,
        }}
      />
      <BottomTab.Screen
        name="Оплата"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="money" size={25} color={color}/>,
        }}
      />
      <BottomTab.Screen
        name="Евенты"
        component={TabEvent}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="event" size={25} color={color}/>,
        }}
      />
      <BottomTab.Screen
        name="Профиль"
        component={TabProfile}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={25} color={color}/>,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerShown: false }}
      />
      <TabOneStack.Screen
        name="Item"
        component={Item}
        options={{ headerShown: true }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Оплата' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabProfTabProfile = createStackNavigator<TabTwoParamList>();

function TabProfile() {
  return (
    <TabProfTabProfile.Navigator>
      <TabProfTabProfile.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </TabProfTabProfile.Navigator>
  );
}

const EventsTab = createStackNavigator<TabTwoParamList>();

function TabEvent() {
  return (
    <EventsTab.Navigator>
      <EventsTab.Screen
        name="Events"
        component={Events}
        options={{ headerShown: true }}
      />
    </EventsTab.Navigator>
  );
}

