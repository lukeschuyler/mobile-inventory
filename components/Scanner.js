'use strict';
 
import React, { Component } from 'react';
 
import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native';
 
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class Scanner extends Component {
  onSuccess(e) {
    fetch(`https://inventory-manager-ls.herokuapp.com/api/v1/products/${e.data}`)
      .then(res => res.json())
      .then(product => {
        alert(product.image)
      })
  }

  render() {
      return (
        <NavigatorIOS
          initialRoute={{
            component: QRCodeScanner,
            title: 'Scan Code',
            passProps: {
              onRead: this.onSuccess.bind(this),
              topContent: <Text style={styles.centerText}> <Text style={styles.textBold}>Scan Item</Text> </Text>,
              bottomContent: <View style={styles.navContainer}><TouchableOpacity style={styles.buttonTouchable}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity><TouchableOpacity style={styles.buttonTouchable}><Text style={styles.buttonText}>Review</Text></TouchableOpacity></View>
            }
          }}
          style={{flex: 1}}
        />
      )
    }
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 50
  }
});
