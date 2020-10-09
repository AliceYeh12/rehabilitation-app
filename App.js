import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList
} from "react-native";

import Constants from 'expo-constants'

import {
  Button,
  Provider,
  WingBlank
} from "@ant-design/react-native"
import enUS from '@ant-design/react-native/lib/locale-provider/en_US';

import NotificationBar from './components/NotifcationBar.jsx'
import SleepAnalysis from "./components/SleepAnalysis";
import TopBar from "./components/TopBar.jsx";

const sections = [
  {
    title: "Sleep",
    data: [<SleepAnalysis />]
  }
]

const styles = StyleSheet.create({
  notificationBar: {
    backgroundColor: '#CDDACC',
    height: Constants.statusBarHeight
  },
  topBar: {
    backgroundColor: "#FFE4C4",
    height: '3%',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  container: {
    margin: "1%",
    padding: "1%",
    flex: 1,
  },
  itemTitle: {
    fontSize: 32,
  }
});

export default class App extends React.Component {

  render() {
    return (
        <Provider locale={enUS}>
          <NotificationBar style = {styles.notificationBar}/>
          
          <TopBar style={styles.topBar}/>
          
          <SafeAreaView
            style={styles.container}
          >
            <SectionList
              sections={sections}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                item
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.itemTitle}>{title}</Text>
              )}
            />
          </SafeAreaView>
        </Provider>
    );
  }
}
