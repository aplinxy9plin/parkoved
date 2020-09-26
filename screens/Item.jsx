import React, { Component } from 'react'
import { Image, View, SafeAreaView } from 'react-native'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Dimensions, StyleSheet } from 'react-native';
import { Title, Text, Subheading, Headline } from 'react-native-paper';
const { width: screenWidth } = Dimensions.get('window')

export class Item extends Component {
  state = {
    currentItem: {},
  }
  componentDidMount() {
    console.log(this.props.route.params);
    this.props.navigation.setOptions({
      headerTitle: this.props.route.params.name
    })
    fetch("http://192.168.43.113:3000/park/getImages/"+this.props.route.params._id)
    .then(response => response.json())
    .then(data => {
      if(data.type === 'ok'){
        this.props.route.params.images = data.result
        this.setState({
          currentItem: this.props.route.params
        })
      }
    })
    .catch(err => {
      console.error(err);
    });
  }
  

  _renderItem ({item, index}, parallaxProps) {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.1}
          {...parallaxProps}
          />
      </View>

    )
}

render () {
  const {
    currentItem,
  } = this.state
  return (
    <SafeAreaView style={{flex: 1, paddingTop: 50 }}>
      {
        currentItem.images && (
          <View>
            <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={currentItem.images.filter((item) => item)}
                renderItem={this._renderItem}
                hasParallaxImages={true}
            />
          </View>
        )
      }
      {
        currentItem && (
          <View style={{
            padding: 50,
            paddingTop: 0
          }}>
            <Title>{currentItem.name}</Title>
            <Subheading>Тип: {currentItem.type}</Subheading>
            <Text>{currentItem.description}</Text>
            <Headline>Ограничения:</Headline>
            {
              currentItem.restrictions && (
                 <View>
                    <Text>Возраст: от {currentItem.restrictions.age}</Text>
                    <Text>Рост: от {currentItem.restrictions.height}</Text>
                    <Text>{currentItem.restrictions.description}</Text>
                </View>
              )
            }
          </View>
        )
      }
    </SafeAreaView>
  );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: 'black'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
})


export default Item
