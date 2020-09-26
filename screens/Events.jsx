import React, {Component} from 'react';
import {
    AppRegistry,
    View
} from 'react-native';
import moment from 'moment';
import { Title, DataTable, Avatar, Card, Button, Paragraph, Portal, Dialog } from 'react-native-paper'

import CalendarStrip from 'react-native-calendar-strip';
import { ScrollView } from 'react-native-gesture-handler';
 
export default class Example extends Component {
    state = {
      datesWhitelist: [{
        start: moment(),
        end: moment().add(3, 'days')  // total 4 days enabled
      }],
      datesBlacklist: [ moment().add(1, 'days') ]
    }
 
    render() {
      const {
        datesWhitelist,
        datesBlacklist
      } = this.state
        return (
            <View>
                <CalendarStrip
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                    style={{height: 100, paddingTop: 20, paddingBottom: 10}}
                    calendarHeaderStyle={{color: 'black'}}
                    calendarColor={'white'}
                    dateNumberStyle={{color: 'black'}}
                    dateNameStyle={{color: 'black'}}
                    highlightDateNumberStyle={{color: 'yellow'}}
                    highlightDateNameStyle={{color: 'yellow'}}
                    disabledDateNameStyle={{color: 'grey'}}
                    disabledDateNumberStyle={{color: 'grey'}}
                    datesWhitelist={datesWhitelist}
                    datesBlacklist={datesBlacklist}
                    iconContainer={{flex: 0.1}}
                />
                <ScrollView>
                <Card style={{ margin: 30,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5, }}>
                  <Card.Title title="Концерт группы корни" subtitle="19:00 30.09.2020" />
                  <Card.Content>
                    <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ratione unde doloribus quod recusandae fugit non cum odit. Accusantium, qui sapiente. Voluptatum incidunt repellat praesentium provident, blanditiis laborum odit rerum?</Paragraph>
                  </Card.Content>
                  <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                  
                </Card>
                <Card style={{ margin: 30,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5, }}>
                  <Card.Title title="Концерт группы корни" subtitle="19:00 30.09.2020" />
                  <Card.Content>
                    <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ratione unde doloribus quod recusandae fugit non cum odit. Accusantium, qui sapiente. Voluptatum incidunt repellat praesentium provident, blanditiis laborum odit rerum?</Paragraph>
                  </Card.Content>
                  <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                  
                </Card>
                <Card style={{ margin: 30,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5, }}>
                  <Card.Title title="Концерт группы корни" subtitle="19:00 30.09.2020" />
                  <Card.Content>
                    <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ratione unde doloribus quod recusandae fugit non cum odit. Accusantium, qui sapiente. Voluptatum incidunt repellat praesentium provident, blanditiis laborum odit rerum?</Paragraph>
                  </Card.Content>
                  <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                  
                </Card>
                </ScrollView>
            </View>
        );
    }
}