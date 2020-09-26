import React, { Component } from 'react'
import { Text, View, Alert, AsyncStorage } from 'react-native'
import { Title, DataTable, Avatar, Card, Button, Paragraph, Portal, Dialog } from 'react-native-paper'

export class Profile extends Component {
  state = {
    visible: null,
    user: null
  }

  componentDidMount() {
    this.load()
    this.props.navigation.addListener('focus', this.load)
  }

  load = async () => {
    const user_id = await AsyncStorage.getItem("user_id")
    console.log(user_id);
    fetch("http://192.168.43.113:3000/users/get/?user_id="+user_id)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.type === 'ok'){
        this.setState({ user: data.result })
      }
    })
  }
  
  render() {
    const { visible, user } = this.state
    return (
      <View style={{
        padding: 25,
        marginTop: 50,
        flex: 1,
        height: '100%'
      }}>
        {
          user && (
            <View>
              <View>
                <Avatar.Image size={50} source={{ uri: user.avatar }} />
                <Title>Привет, {user.name}!</Title>
              </View>
              <View style={{marginTop: 20 }}>
                <Card>
                  <Card.Title title={user._id} subtitle={`Баланс: ${Number(user.money)}₽`} />
                  <Card.Actions>
                    <Button onPress={() => {
                      this.setState({ visible: true })
                      // Alert.alert(
                      //   "Alert Title",
                      //   "My Alert Msg",
                      //   [
                      //     {
                      //       text: "Cancel",
                      //       onPress: () => console.log("Cancel Pressed"),
                      //       style: "cancel"
                      //     },
                      //     { text: "OK", onPress: () => console.log("OK Pressed") },
                      //     { text: "OK", onPress: () => console.log("OK Pressed") },
                      //     { text: "OK", onPress: () => console.log("OK Pressed") },
                      //     { text: "OK", onPress: () => console.log("OK Pressed") },
                      //     { text: "OK", onPress: () => console.log("OK Pressed") },
                      //   ],
                      //   { cancelable: false }
                      // );
                    }}>Пополнить</Button>
                  </Card.Actions>
                </Card>
              </View>
              <Card style={{ marginTop: 30 }}>
              <Card.Title title="История"/>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Аттракцион</DataTable.Title>
                  <DataTable.Title>Цена</DataTable.Title>
                  <DataTable.Title>Дата</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>Колесо обозрения</DataTable.Cell>
                  <DataTable.Cell>150</DataTable.Cell>
                  <DataTable.Cell>14:12 26.09.20</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Колесо обозрения</DataTable.Cell>
                  <DataTable.Cell>150</DataTable.Cell>
                  <DataTable.Cell>14:15 26.09.20</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Колесо обозрения</DataTable.Cell>
                  <DataTable.Cell>200</DataTable.Cell>
                  <DataTable.Cell>14:18 26.09.20</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Туалет</DataTable.Cell>
                  <DataTable.Cell>20</DataTable.Cell>
                  <DataTable.Cell>14:30 26.09.20</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
              </Card>
              {/* <Portal> */}
                <Dialog visible={visible} onDismiss={() => this.setState({ visible: false })}>
                  <Dialog.Content>
                    <Button onPress={this.pay}>300₽</Button>
                    <Button onPress={this.pay}>500₽</Button>
                    <Button onPress={this.pay}>1000₽</Button>
                    <Button onPress={this.pay}>2000₽</Button>
                  </Dialog.Content>
                </Dialog>
              {/* </Portal> */}
            </View>
          )
        }
      </View>
    )
  }
}

export default Profile
