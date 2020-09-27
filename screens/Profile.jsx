import React, { Component } from 'react'
import { Text, View, Alert, AsyncStorage } from 'react-native'
import { Title, DataTable, Avatar, Card, Button, Paragraph, Portal, Dialog, Headline, Subheading } from 'react-native-paper'
import moment from 'moment';
import 'moment/locale/ru'
moment.locale('ru')

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
  
  pay = async e => {
    fetch("http://192.168.43.113:3000/pay/up", {
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify({
        "id": await AsyncStorage.getItem('user_id'),
        "money": e
      })
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ visible: false })
      this.load()
    })
    .catch(err => {
      console.error(err);
    });
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
                <Card style={{ zIndex: 1 }}>
                  <Card.Title title={user._id} subtitle={`Баланс: ${Number(user.money)}₽`} />
                  <Card.Content>
                    <Subheading>Пополнить на</Subheading>
                    <View style={{flexDirection:'row', flexWrap:'wrap' }}>
                      <Button mode="contained" style={{ margin: 5 }} onPress={() => this.pay(300)}>300₽</Button>
                      <Button mode="contained" style={{ margin: 5 }} onPress={() => this.pay(500)}>500₽</Button>
                      <Button mode="contained" style={{ margin: 5 }} onPress={() => this.pay(1000)}>1000₽</Button>
                      <Button mode="contained" style={{ margin: 5 }} onPress={() => this.pay(2000)}>2000₽</Button>
                      <Button mode="contained" style={{ margin: 5 }} onPress={() => this.pay(5000)}>5000₽</Button>
                    </View>
                  </Card.Content>
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
                {
                  user.pays && (
                    user.pays.map((item) => 
                      <DataTable.Row>
                        <DataTable.Cell>{item.name}</DataTable.Cell>
                        <DataTable.Cell>{item.price}</DataTable.Cell>
                        <DataTable.Cell>{moment(new Date(item.date)).format("DD.M.YY, h:mm")}</DataTable.Cell>
                      </DataTable.Row>
                    )
                  )
                }
              </DataTable>
              </Card>
              {/* <Portal> */}
              {/* </Portal> */}
            </View>
          )
        }
        <Dialog visible={visible} onDismiss={() => this.setState({ visible: false })} style={{ zIndex: 10000000000 }}>
          <Dialog.Content>
            <Title>Пополнить баланс на:</Title>
            <Button onPress={() => this.pay(300)}>300₽</Button>
            <Button onPress={() => this.pay(500)}>500₽</Button>
            <Button onPress={() => this.pay(1000)}>1000₽</Button>
            <Button onPress={() => this.pay(2000)}>2000₽</Button>
          </Dialog.Content>
        </Dialog>
      </View>
    )
  }
}

export default Profile
