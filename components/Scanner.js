'use strict';
 
import React, { Component, PropTypes } from 'react';
import Home from './Home'
import Popup from './Popup'
 
import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  Image
} from 'react-native';
 
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class Scanner extends Component {
  static propTypes = {
      title: PropTypes.string,
      navigator: PropTypes.object.isRequired
    }

  state = {
    modalVisible: false,
    currentProduct: {},
    sessionArray: [],
    sessionType: this.props.title,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onSuccess(e) {
    fetch(`https://inventory-manager-ls.herokuapp.com/api/v1/products/${e.data}`)
      .then(res => res.json())
      .then(product => {
        this.setState({modalVisible: true, currentProduct: product})
      })
      .catch(() => {
        alert('Product Not Found!')
      })
  }

  render() {
    if (!this.state.modalVisible) {
       return (
        <NavigatorIOS
          initialRoute={{
            component: QRCodeScanner,
            title: 'Scanner',
            passProps: {
              onRead: this.onSuccess.bind(this),
              topContent: <Text style={styles.centerText}> <Text style={styles.textBold}>Scan Item</Text> </Text>,
              bottomContent: <View style={styles.navContainer}><TouchableOpacity style={styles.buttonTouchable}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity><TouchableOpacity style={styles.buttonTouchable}><Text style={styles.buttonText}>Review</Text></TouchableOpacity></View>
            }
          }}
          style={{flex: 1}}
        />
      )   
    }  else {
      return (
        <View>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
           <View style={styles.modalView}>
            <View>
              <Text style={styles.textBold}>{this.state.currentProduct.name}</Text>
              <Image
                source={{uri: this.state.currentProduct.image}}
                style={styles.productImage}
              />
              <TouchableHighlight onPress={() => {
                this.setModalVisible(false)
              }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>

            </View>
           </View>
          </Modal>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  productImage: {
    height: 200,
    width: 200,
    borderRadius: 100
  },
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
