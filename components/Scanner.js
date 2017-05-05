'use strict';
 
import React, { Component, PropTypes } from 'react';
import Home from './Home'
import Popup from './Popup'
import styles from '../styles/ScannerStyles.js'
 
import {
  AppRegistry,
  Text,
  NavigatorIOS,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  Image,
  TextInput,
  KeyboardAvoidingView
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
    qty: ''
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
            animationType={'none'}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
           <KeyboardAvoidingView behavior="padding" style={styles.modalView}>

            <View style={styles.infoContainer}>
              <Text style={styles.textBold}>{this.state.currentProduct.name}</Text>           
              <Image
                source={{uri: this.state.currentProduct.image}}
                style={styles.productImage}
              />

            </View>

              <View style={styles.qtyConatiner}>
                <Text style={styles.textBold}>UPC: {this.state.currentProduct.upc_code}</Text>  
                <Text style={styles.textBold}>Enter {this.state.currentProduct.measure}: </Text>
                <TextInput 
                  onChangeText={(qty) => this.setState({qty})}
                  value={this.state.qty}
                  style={styles.qtyInput} 
                  keyboardType='number-pad'
                />
              </View>

              <View style={styles.btnContainer}>
                <TouchableHighlight 
                  style={styles.cancelBtn} 
                  onPress={() => {
                    this.setModalVisible(false)
                  }}>
                  <Text>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                  style={styles.enterBtn} 
                  onPress={() => {
                    this.setModalVisible(false)
                  }}>
                  <Text>Enter</Text>
                </TouchableHighlight>
              </View>

          </KeyboardAvoidingView>

          </Modal>
        </View>
      )
    }
  }
}
