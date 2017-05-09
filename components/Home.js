'use strict';
 
import React, { Component, PropTypes } from 'react';

import Scanner from './Scanner'
 
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  View
} from 'react-native';


export default class Home extends Component {
  static propTypes = {
      title: PropTypes.string,
      navigator: PropTypes.object.isRequired
    }

  _onForwardWaste = () => {
    this.props.navigator.push({
      component: Scanner,
      title: 'Waste',
      passProps: { sessionArray: [] },
      navigationBarHidden: true
    });
  }

  _onForwardInv = () => {
    this.props.navigator.push({
      component: Scanner,
      title: 'Inventory',
      passProps: { sessionArray: [] },
      navigationBarHidden: true
    });
  }

  render() {
      return (
        <View style={styles.container}>
        <View style={styles.reviewHeaderContainer}><Text style={styles.reviewHeader}>Inventory Manager</Text></View>
          <TouchableHighlight onPress={this._onForwardWaste} style={styles.wasteButton}>
            <Text>Waste</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onForwardInv} style={styles.invButton}>
            <Text>Inventory</Text>
          </TouchableHighlight>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'   
  },
  wasteButton: {
    backgroundColor: 'rgba(255,255,0,.8)',
    height: 70,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  invButton: {
    backgroundColor: 'rgba(255,255,0,.8)',
    height: 70,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
});
