import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { AsyncStorage, Platform, Alert } from 'react-native'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Prompt from 'react-native-prompt-crossplatform';
import { View } from '../components/Themed';

export default class Auth extends Component {
  state = {
    vkData: null,
    visiblePrompt: null,
    age: null
  }
  
  handleWebViewNavigationStateChange = async (e) => {
    if(e.url.indexOf("access_token") !== -1){
      const token = e.url.split("access_token=")[1].split("&")[0]
      fetch(`https://api.vk.com/method/users.get?access_token=${token}&fields=contacts&v=5.92`)
      .then(response => response.json())
      .then(vkData => {
        console.log(vkData)
        this.setState({ vkData, visiblePrompt: true })
      })
      .catch(err => {
        console.error(err);
      });
      // this.props.navigation.navigate("Choose", { vk: true })
    }
  }

  submit = async () => {
    const device_id = await registerForPushNotificationsAsync()
    fetch("http://192.168.43.113:3000/users/add", {
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify({
        "name": this.state.vkData.response.first_name+" "+this.state.vkData.response.last_name,
        "device_id": device_id,
        "phone": this.state.vkData.response.mobile_phone
      })
    })
    .then(response => response.json())
    .then(newUserData => {
      if(newUserData.type === 'ok'){
        
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  render() {
    return (
        
        <WebView
          source={{ uri: 'https://oauth.vk.com/oauth/authorize?client_id=7609464&redirect_uri=http://api.vk.com/blank.html&scope=268435456&display=page&response_type=token&v=5.107&__q_hash=34229ba90d6dad6910c347ff835653ba' }}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
        />
    )
  }
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}