'use strict';
 
import React, { Component, PropTypes } from 'react';
import Home from './Home'

import styles from '../styles/ScannerStyles.js'
import ButtonGroup from './ButtonGroup.js'
 
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

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      currentProduct: {},
      sessionArray: [],
      session_id: '',
      qty: '',
      sessionType: this.props.route.title
    }
    console.log(this.state.sessionType)
    this.onCancel = this.onCancel.bind(this)
  }

  static propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired
  }

  componentDidMount() {
   let sessionType;
    if (this.state.sessionType === 'Waste') {
      sessionType = 'waste'

    } else {
      sessionType = 'inv'
    }
    fetch(`https://inventory-manager-ls.herokuapp.com/api/v1/${sessionType}_sessions`, 
      {
        method: 'POST',
        body: JSON.stringify({ username: 'lukeschuyler' })
      })
      .then(res => res.json())
      .then(session => {
         this.setState({session_id: session.id})
         console.log(session)
      }) 
      .catch(err => {
        console.log(err)
      })
  }

  onEnter(item) {
    this.state.sessionArray.push(item)
    this.setModalVisible(false)
    this.setState({qty: ''})
    console.log(this.state.sessionArray)
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onSuccess(e) {
    fetch(`https://inventory-manager-ls.herokuapp.com/api/v1/products/${e.data}`)
      .then(res => res.json())
      .then(product => {
        this.setState({modalVisible: true, currentProduct: product})
        this.refs.TextInput.focus()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onCancel() {
    let sessionType;
     console.log(this.state)
    if (this.state.sessionType === 'Waste') {
      sessionType = 'waste'
    } else {
      sessionType = 'inv'
    }
    fetch(`https://inventory-manager-ls.herokuapp.com/api/v1/${sessionType}_sessions/${this.state.session_id}`, 
      {
        method: 'DELETE'
      })
    .then(() => {
      this.props.navigator.push({
        component: Home,
        title: 'Home'
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  onReview(array) {
    console.log(array)
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
              bottomContent: <View style={styles.navContainer}>
                                <TouchableOpacity onPress={this.onCancel} style={styles.buttonTouchable}>
                                  <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {this.onReview(this.state.sessionArray)} } style={styles.buttonTouchable}>
                                  <Text style={styles.buttonText}>Review</Text>
                                </TouchableOpacity>
                              </View>
            }
          }}
          style={{flex: 1}}
        />
      )   
    }  else {
      return (
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
              keyboardType={'number-pad'}
              autoFocus={true}
              ref='TextInput'
            />
          </View>
          <ButtonGroup 
            cancel={() => { this.setModalVisible(false) } }
            enter={() => { this.onEnter({quantity: +(this.state.qty), product_id: this.state.currentProduct.id, session_id: +(this.state.session_id) })} } 
            cancelText= {'Cancel'}
            enterText= {'Enter'}
          />
        </KeyboardAvoidingView>

      )
    }
  }
}
