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
      sessionType: this.props.route.title,
      addNewProduct: false
    }
    this.onCancel = this.onCancel.bind(this)
    this.onReview = this.onReview.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
  }

  static propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired
  }

  onEnter(item) {
    this.state.sessionArray.push(item)
    this.setModalVisible(false)
    this.setState({qty: '', currentProduct: {}})
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  // SCANNER CALLBACK

  onSuccess(e) {
    axios.get(`https://inventory-manager-ls.herokuapp.com/api/v1/products/${e.data}`)
      .then(product => {
        if (product.data != null) {
          this.setState({modalVisible: true, currentProduct: product.data})
          this.refs.TextInput.focus()    
        } else {
          axios.post(`https://inventory-manager-ls.herokuapp.com/api/v1/search`, { query: e.data })
          .then(res => {
            if (res.data[0].UPC == e.data.slice(1)) {
              this.setState({addNewProduct: true, currentProduct: res.data[0]})
            } else if(res.data[1] && res.data[1].UPC == e.data) {
                console.log('1', res.data)
              this.setState({addNewProduct: true, currentProduct: res.data[1]})
            } else {
              Toast.show('Product Not Found');
            }
          })         
        }
      })
      .catch((err) => {
        axios.post(`https://inventory-manager-ls.herokuapp.com/api/v1/search`, { query: e.data })
        .then(res => {
          if (res.data[0].UPC == e.data.slice(1)) {
            this.setState({addNewProduct: true, currentProduct: res.data[0]})
          } else if(res.data[1] && res.data[1].UPC == e.data) {
            this.setState({addNewProduct: true, currentProduct: res.data[1]})
          } else {
            Toast.show('Product Not Found');
          }
        })
        .catch(error => {
            Toast.show('Product Not Found, please try again');
        })
      })
  }

  addProduct() {
    console.log('add')
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
    if (!this.state.modalVisible && !this.state.review && !this.state.addNewProduct) {
       return (
        <NavigatorIOS
          initialRoute={{
            component: QRCodeScanner,
            title: 'Scanner',
            passProps: {
              reactivate: true,
              reactivateTimeout: 2000,
              onRead: this.onSuccess,
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
                                upc_code: this.state.currentProduct.upc_code,
                                current_qty: this.state.currentProduct.current_qty }
                              )}} 
                cancelText= {'Cancel'}
                enterText= {'Enter'}
              />
            </KeyboardAvoidingView>
          </Modal>
      </View>
      )
    } else if (this.state.addNewProduct) {
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
                <Text style={styles.textBold}>Add Product to List?</Text>      
                <Text style={styles.textBold}>{currentProduct.name}</Text>           
                <Image
                  source={{uri: currentProduct.image}}
                  style={styles.productImage}
                  resizeMode={Image.resizeMode.contain}
                />
              </View>
              <ButtonGroup 
                cancel={() => { this.setState({addNewProduct: false}) } }
                enter={() => { this.addProduct() }} 
                cancelText= {'Cancel'}
                enterText= {'Add Product'}
              />
            </KeyboardAvoidingView>
          </Modal>
      </View>
      )
    }
  }
}
