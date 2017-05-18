'use strict';
 
import React, { Component } from 'react';
import Home from './components/Home'
import Scanner from './components/Scanner'
 
import {
  AppRegistry,
  NavigatorIOS
} from 'react-native';
 
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class App extends Component {
  render() {
      return (
        <NavigatorIOS 
          initialRoute={{
            component: Home,
            title: 'Home',
          }}
          style={{flex: 1}}
        />
      )
    }
}


AppRegistry.registerComponent('mobile_inventory', () => App);
