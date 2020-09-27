import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AsyncStorage, ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import Auth from '../screens/Auth';
import AuthVK from '../screens/AuthVK';
import LinkingConfiguration from './LinkingConfiguration';
import TourLinking from './TourLinking';

export class index1 extends Component {
  async componentDidMount() {
    if(await AsyncStorage.getItem("user_id")){
      this.setState({ user_id: await AsyncStorage.getItem("user_id") })
    }
  }
  
  render() {
    const { user_id } = this.state
    if(!user_id){
      return (
        <NavigationContainer
          linking={TourLinking}
          theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root">
                {props => <Auth {...props} setuser_id={async (insertedId) => {
                  await AsyncStorage.setItem("user_id", insertedId)
                  this.setState({ user_id: insertedId })
                }} />}
            </Stack.Screen>
            <Stack.Screen name="AuthVK" component={AuthVK} options={{ headerShown: true }}/>
          </Stack.Navigator>
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
}

export default index1
