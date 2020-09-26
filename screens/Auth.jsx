import * as React from 'react';
import { Button, Image, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import logo from '../logoParkoved.png'

export default function TabOneScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={logo} width={200} height={200} resizeMode="center"/>
      <Text style={styles.title}>Привет!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.text}>Рады приветствовать тебя в приложении{'\n'} парковед!</Text>
      <View>
        <Button
          style={styles.button}
          title="Войти через VK"
          onPress={async () => {
            navigation.navigate("AuthVK")
          }}
        />
      </View>
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
