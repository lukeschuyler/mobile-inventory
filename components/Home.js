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

  _onForward = (nav) => {
    this.props.navigator.push({
      component: Scanner,
      title: nav,
      passProps: { sessionArray: [] },
      navigationBarHidden: true
    });
  }

  render() {
      return (
        <View style={styles.container}>
          <View style={styles.homeHeaderContainer}><Text style={styles.homeHeader}>Simply Managed Mobile</Text></View>
          <View style={styles.homeBodyContainer}>
            <View style={styles.selectHeaderContainer}>
              <Text style={styles.homeHeader}>Select Action:</Text>
            </View>   
            <View style={styles.btnGroupContainer}>  
              <View style={styles.btnContainer}> 
                <TouchableHighlight underlayColor="white" onPress={() => { this._onForward('Waste')} } style={styles.wasteButton}>
                  <Text>Waste</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="white" onPress={() => { this._onForward('Inventory')} } style={styles.invButton}>
                  <Text>Inventory</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.btnContainer}> 
                <TouchableHighlight underlayColor="white" onPress={() => { this._onForward('Receiving')} } style={styles.recButton}>
                  <Text>Receiving</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="white" onPress={() => { this._onForward('Sales')} } style={styles.salesButton}>
                  <Text>Sales</Text>
                </TouchableHighlight>
              </View>
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
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  invButton: {
    backgroundColor: 'rgba(0,90,255,.8)',
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  salesButton: {
    backgroundColor: 'rgba(217,24,31,.8)',
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  recButton: {
    backgroundColor: 'rgb(30, 200, 24)',
    height: 100,
    width: 100,
    borderRadius: 100,
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
    flex: 1,
    alignItems: 'center',
  },
  btnGroupContainer: {
    flex: 1,
    flexDirection: 'row'
  } 
});
