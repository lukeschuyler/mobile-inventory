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
          <View style={styles.homeHeaderContainer}><Text style={styles.homeHeader}>Inventory Manager</Text></View>
          <View style={styles.homeBodyContainer}>
            <View style={styles.selectHeaderContainer}>
              <Text style={styles.homeHeader}>Select Action:</Text>
            </View>     
            <View style={styles.btnContainer}> 
              <TouchableHighlight underlayColor="white" onPress={this._onForwardWaste} style={styles.wasteButton}>
                <Text>Waste</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="white" onPress={this._onForwardInv} style={styles.invButton}>
                <Text>Inventory</Text>
              </TouchableHighlight>
            </View>
          </View> 
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1 
  },
  wasteButton: {
    backgroundColor: 'rgba(255,200,0,.8)',
    height: 70,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  invButton: {
    backgroundColor: 'rgba(0,90,255,.8)',
    height: 70,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  homeHeader: { 
    fontFamily: 'Avenir-Medium',
    fontSize: 25,
    padding: 5
  },
  homeHeaderContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  selectHeaderContainer: {
    flex: .1,
    alignItems: 'center'
  },
  homeBodyContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnContainer: {
    flex: 1    
  },
  footer: {

  }
});
