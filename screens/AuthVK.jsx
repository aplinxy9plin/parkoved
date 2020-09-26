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
      fetch(`https://api.vk.com/method/users.get?access_token=${token}&fields=contacts,photo_50&v=5.92`)
      .then(response => response.json())
      .then(async vkData => {
        await AsyncStorage.setItem("vk_data", JSON.stringify(vkData.response))
        this.props.navigation.navigate("Root")
        // this.setState({ vkData, visiblePrompt: true })
      })
      .catch(err => {
        console.error(err);
      });
      // this.props.navigation.navigate("Choose", { vk: true })
    }
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