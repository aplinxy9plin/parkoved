import React, {Component} from 'react';
import {
    AppRegistry,
    View
} from 'react-native';
import moment from 'moment';
import 'moment/locale/ru'
import { Title, DataTable, Avatar, Card, Button, Paragraph, Portal, Dialog } from 'react-native-paper'

import CalendarStrip from 'react-native-calendar-strip';
import { ScrollView } from 'react-native-gesture-handler';
moment.locale('ru')
export default class Example extends Component {
    state = {
      datesWhitelist: [{
        start: moment(),
        end: moment().add(3, 'days')  // total 4 days enabled
      }],
      datesBlacklist: [ moment().add(1, 'days') ]
    }
    
    componentDidMount() {
      fetch("http://192.168.43.113:3000/park/getEvents")
      .then(response => response.json())
      .then(data => this.setState({ events: data.result }))
    }
    

    render() {
      const {
        datesWhitelist,
        datesBlacklist,
        events
      } = this.state
        return (
            <View>
                {/* <CalendarStrip
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
                /> */}
                <ScrollView>
                  {
                    events && (
                      events.map((item) => 
                      <Card style={{ margin: 30,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5, }}>
                        <Card.Title title={item.name} subtitle={moment(new Date(item.date)).format("Do MMMM YYYY, h:mm")} />
                        <Card.Content>
                    <Paragraph>{item.description}</Paragraph>
                        </Card.Content>
                        <Card.Cover source={{ uri: item.images.filter((img) => img)[0] }} />
                        
                      </Card>
                      )
                    )
                  }
                </ScrollView>
            </View>
        );
    }
}