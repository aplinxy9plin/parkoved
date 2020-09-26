import React, { Component } from 'react'
import { Image, Text, View, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import mapStyle from '../mapStyle.json'
import { FAB, DataTable, Avatar, Card, Button, Paragraph, List, Dialog, Divider } from 'react-native-paper'

export class TabOneScreen extends Component {
  state = {
    userLocation: null,
    maxZoom: 10,
    visible: false,
    filters: ['Аттракцион', 'Туалет', 'Другое']
  }

  async componentDidMount() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted')
      console.log(status);
      // setErrorMsg('Permission to access location was denied');
    
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.setState({
      userLocation: {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }
    })
    fetch("http://192.168.43.113:3000/park/getall")
    .then(response => response.json())
    .then(data => {
      this.setState({ visible: true, parks: data.result })
    })
  }
  

  load = (id) => {
    fetch("http://192.168.43.113:3000/park/get/"+id)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if(data.type === 'ok'){
        const center = this.getCenter(data.result.map.coordinates)
        fetch("http://192.168.43.113:3000/park/getItems/"+id)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if(data.type === 'ok'){
            console.log(center)
            this.setState({
              park: data.result,
              userLocation: {
                lat: center[0],
                lng: center[1]
              },
              maxZoom: 17,
              items: data.result,
              mainItems: data.result,
            })
            this.refs.map.fitToElements(true);
          }
        })
        .catch(err => {
          // window.location.href = "/login"
          console.error(err);
        });
      }
    })
    .catch(err => {
      // window.location.href = "/login"
      console.error(err);
    });
  }

  getCenter = (arr) => {
    var minX, maxX, minY, maxY;
    for (var i = 0; i < arr.length; i++)
    {
        minX = (arr[i]['lat'] < minX || minX == null) ? arr[i]['lat'] : minX;
        maxX = (arr[i]['lat'] > maxX || maxX == null) ? arr[i]['lat'] : maxX;
        minY = (arr[i]['lng'] < minY || minY == null) ? arr[i]['lng'] : minY;
        maxY = (arr[i]['lng'] > maxY || maxY == null) ? arr[i]['lng'] : maxY;
    }
    return [(minX + maxX) / 2, (minY + maxY) / 2];
  }

  checkFilter = (name) => {
    let { filters, mainItems } = this.state
    if(filters.indexOf(name) !== -1){
      filters.splice(filters.indexOf(name), 1)
    }else{
      filters.push(name)      
    }
    console.log(filters);
    this.setState({
      items: mainItems.filter((item) => filters.indexOf(item.type) !== -1),
      filters
    })
  }

  render() {
    const {
      userLocation,
      maxZoom,
      park,
      items,
      visible,
      parks,
      filter,
      filters,
    } = this.state
    return (
      <View>
        <FAB.Group
          style={{ zIndex: 100000000000 }}
          open={filter}
          icon={filter ? 'close' : 'filter'}
          actions={[
            {
              icon: filters.indexOf('Аттракцион') !== -1 ? 'check' : '',
              label: 'Аттракцион',
              onPress: () => this.checkFilter('Аттракцион'),
            },
            {
              icon: filters.indexOf('Туалет') !== -1 ? 'check' : '',
              label: 'Туалет',
              onPress: () => this.checkFilter('Туалет'),
            },
            {
              icon: filters.indexOf('Другое') !== -1 ? 'check' : '',
              label: 'Другое',
              onPress: () => this.checkFilter('Другое'),
            },
          ]}
          onStateChange={({open}) => this.setState({ filter: open })}
        />
        <MapView
          ref="map"
          customMapStyle={mapStyle}
          style={{
            width: '100%',
            height: '100%'
          }}
          initialRegion={{
            latitude: userLocation ? userLocation.lat : 56.47210929744213,
            longitude: userLocation ? userLocation.lat : 84.95424996403199,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          zoomEnabled
          minZoomLevel={maxZoom}
          showsUserLocation = {true}
          showsMyLocationButton={true}
        >
          {
            items && (
              items.map((item) => 
                <Marker
                  onPress={() => {
                    Alert.alert(
                      item.name,
                      `Возраст: от ${item.restrictions.age}\nРост от: ${item.restrictions.height}\nВес: от 40 кг`,
                      [
                        {
                          text: "Закрыть",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        { text: "Открыть", onPress: () => {
                          this.props.navigation.navigate("Item", item)
                        } }
                      ],
                      { cancelable: false }
                    );
                  }}
                  coordinate={{
                    latitude: item.coordinates.lat,
                    longitude: item.coordinates.lng
                  }}
                >
                  <Image source={{ uri: item.icon }} style={{ width: 50, height: 50, padding: 0, margin: 0 }} />
                </Marker>
              )
             )
          }
        </MapView>
        <Dialog visible={visible} onDismiss={() => this.setState({ visible: false })}>
          <Dialog.Title>Привет!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Я Парковед!{'\n'}И я нашел парочку прекрасных парков неподалеку.{'\n\n'}Выбери парк и я покажу его карту</Paragraph>
            <Divider />
            {
              parks && (
                parks.map((item) => 
                  <List.Item
                    title={item.name}
                    onPress={() => this.load(item.id)}
                  />
                )
              )
            }
          </Dialog.Content>
        </Dialog>
      </View>
    )
  }
}

export default TabOneScreen
