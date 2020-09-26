import * as React from 'react';
import { Image, StyleSheet, AsyncStorage } from 'react-native';
import { Button, Paragraph, Dialog, Portal, TextInput } from 'react-native-paper';
import { Text, View } from '../components/Themed';
import logo from '../logoParkoved.png'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function TabOneScreen({ navigation, route, setuser_id}) {
  const [state, setstate] = React.useState(null)
  const [visible, setvisible] = React.useState(false)
  const [age, setage] = React.useState(null)

  React.useEffect(() => {
    navigation.addListener('focus', async () => {
      const vk_data = await AsyncStorage.getItem("vk_data")
      if(vk_data){
        setstate(parseInt(vk_data))
        setvisible(true)
      }
    })
  }, [])

  const submit = async () => {
    const vk_data = JSON.parse(await AsyncStorage.getItem("vk_data"))
    const device_id = await registerForPushNotificationsAsync()
    console.log(vk_data)
    console.log({
      "name": vk_data[0].first_name,
      "device_id": device_id,
      "phone": vk_data[0].mobile_phone,
      "avatar": vk_data[0].photo_50,
      "age": age,
      "pays": []
    })
    fetch("http://192.168.43.113:3000/users/add", {
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify({
        "name": vk_data[0].first_name,
        "device_id": device_id,
        "phone": vk_data[0].mobile_phone,
        "avatar": vk_data[0].photo_50,
        "age": age,
        "pays": []
      })
    })
    .then(response => response.json())
    .then(newUserData => {
      if(newUserData.type === 'ok'){
        setuser_id(newUserData.id)
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  return (
    <View style={styles.container}>
      <Image source={logo} width={200} height={200} resizeMode="center"/>
      <Text style={styles.title}>Привет!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.text}>Рады приветствовать тебя в приложении{'\n'} парковед!</Text>
      <View>
        <Button
          style={{
            marginTop: 50
          }}
          mode="contained"
          onPress={async () => {
            navigation.navigate("AuthVK", { setstate })
          }}
        >Войти через VK</Button>
      </View>
      <Dialog visible={visible} onDismiss={() => setvisible(false)}>
        <Dialog.Title>Введите возраст</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Необходимо ввести ваш возраст.</Paragraph>
          <TextInput
            onChangeText={(e) => {
              setage(e)
            }}
            keyboardType="number-pad"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={submit}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
    textAlign: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    marginTop: 100
  }
});


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