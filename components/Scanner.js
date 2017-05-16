'use strict';
 
import React, { Component, PropTypes } from 'react';
import Home from './Home'

import styles from '../styles/ScannerStyles.js'
import ButtonGroup from './ButtonGroup.js'
import Review from './Review.js'
import axios from 'axios'
import Toast from 'react-native-simple-toast';
 
import {
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

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      review: false,
      currentProduct: {},
      sessionArray: this.props.sessionArray,
      qty: '',
      sessionType: this.props.route.title
    }
    this.onCancel = this.onCancel.bind(this)
    this.onReview = this.onReview.bind(this)
  }

  static propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired
  }

  onEnter(item) {
    this.state.sessionArray.push(item)
    this.setModalVisible(false)
    this.setState({qty: ''})
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  // SCANNER CALLBACK

  onSuccess(e) {
    axios.get(`https://inventory-manager-ls.herokuapp.com/api/v1/products/${e.data}`)
      .then(product => {
        this.setState({modalVisible: true, currentProduct: product.data})
        this.refs.TextInput.focus()
      })
      .catch((err) => {
        Toast.show('Product Not Found');
      })
  }

  // GO BACK TO HOME

  onCancel() {
    this.props.navigator.popToTop()
  }

  // REVIEW SESSION

  onReview() {
    this.props.navigator.push({
      component: Review,
      title: 'Review',
      passProps: { itemArray: this.state.sessionArray, sessionType: this.state.sessionType },
      barTintColor: '#ccc',
      navigationBarHidden: true
    })
  }

  // RENDER

  render() {
    if (!this.state.modalVisible && !this.state.review) {
       return (
        <NavigatorIOS
          initialRoute={{
            component: QRCodeScanner,
            title: 'Scanner',
            passProps: {
              onRead: this.onSuccess.bind(this),
              topContent: <Text style={styles.centerText}> <Text style={styles.textBold}>Scan {this.state.sessionType} Item</Text> </Text>,
              bottomContent: <View style={styles.navContainer}>
                                <TouchableOpacity onPress={this.onCancel} style={styles.buttonTouchable}>
                                  <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {this.onReview()} } style={styles.buttonTouchable}>
                                  <Text style={styles.buttonText}>Review</Text>
                                </TouchableOpacity>
                              </View>
            }
          }}
          style={{flex: 1}}
        />
      )   
    }  else if (this.state.modalVisible) {
      let currentProduct = this.state.currentProduct
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
                  resizeMode={Image.resizeMode.contain}
                />
              </View>
              <View style={styles.qtyConatiner}>
                <Text style={styles.textBold}>UPC: {this.state.currentProduct.upc_code}</Text>  
                <Text style={styles.textBold}>Enter {this.state.currentProduct.measure}: </Text>
                <TextInput 
                  onChangeText={(qty) => this.setState({qty})}
                  value={this.state.qty}
                  style={styles.qtyInput} 
                  keyboardType={'numeric'}
                  autoFocus={true}
                  ref='TextInput'
                />
              </View>
              <ButtonGroup 
                cancel={() => { this.setModalVisible(false) } }
                enter={() => { this.onEnter({
                                measure: this.state.currentProduct.measure,
                                quantity: +(this.state.qty), 
                                product_id: this.state.currentProduct.id, 
                                session_id: +(this.state.session_id),
                                name: this.state.currentProduct.name,
                                upc_code: this.state.currentProduct.upc_code }
                              )}} 
                cancelText= {'Cancel'}
                enterText= {'Enter'}
              />
            </KeyboardAvoidingView>
          </Modal>
      </View>
      )
    }
  }
}
