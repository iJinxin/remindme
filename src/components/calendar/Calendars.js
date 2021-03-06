// react-native-calendars doc: https://github.com/wix/react-native-calendars
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {
  Calendar,
  CalendarList,
  Agenda
} from 'react-native-calendars';

export default class Calendars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: `Item for ${strTime}`,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      // console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach((key) => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }


  render() {
    const calendars = (
      <Agenda
        items={
          {
            '2018-05-22': [{ text: 'item 1 - any js object' }],
            '2018-05-23': [{ text: 'item 2 - any js object' }],
            '2018-05-24': [],
            '2018-05-25': [{ text: 'item 3 - any js object' }, { text: 'any js object' }],
          }
        }
      />
    );

    return (
      <View>
        {calendars}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});
