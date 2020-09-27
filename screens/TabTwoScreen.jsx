import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, AsyncStorage } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    fetch("http://192.168.43.113:3000/park/getItem/"+data)
    .then(response => response.json())
    .then(data => {
      if(data.type === 'ok'){
        Alert.alert(
          `Оплатить ${data.result.prices.child} рублей?`,
          data.result.name,
          [
            {
              text: "Отмена",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Оплата", onPress: () => {
              paySubmit(data)
            } }
          ],
          { cancelable: false }
        );
      }
    })
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const paySubmit = async (data) => {
    console.log('qqqq');
    fetch("http://192.168.43.113:3000/pay/pay", {
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify({
        "user_id": await AsyncStorage.getItem('user_id'),
        "money": data.result.prices.child,
        "item": data.result._id
      })
    })
    .then(response => response.json())
    .then(res => {
      console.log(res);
      Alert.alert(
        "Успешно оплачено",
        "Покажите этот код управляющему аттракционом: "+res.code,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    })
    .catch(err => {
      console.error(err);
    });
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%'
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Нажми, чтобы сканировать снова'} onPress={() => setScanned(false)} />}
    </View>
  );
}
