import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'
import { Title, DataTable, Avatar, Card, Button, Paragraph, Portal, Dialog } from 'react-native-paper'

export class Profile extends Component {
  state = {
    visible: null
  }

  render() {
    const { visible } = this.state
    return (
      <View style={{
        padding: 25,
        marginTop: 50,
        flex: 1,
        height: '100%'
      }}>
        <View>
          <Avatar.Image size={50} source={{ uri: 'https://sun4-10.userapi.com/impf/c851132/v851132253/1ee31/xqST6TNH_Lk.jpg?size=50x0&quality=88&crop=767,232,709,709&sign=cb1a6b2467259c4b938c90da7c604509&c_uniq_tag=JesqQdASySACcYnvE_iZyy9-lc3qySXulrTbr1mkYT4&ava=1' }} />
          <Title>Привет, Никита!</Title>
        </View>
        <View style={{marginTop: 20 }}>
          <Card>
            <Card.Title title="5f6f4c7546c04e152b164a8d" subtitle="Баланс: 750₽" />
            {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
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
}

export default Profile
