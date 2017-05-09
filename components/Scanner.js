'use strict';
 
import React, { Component, PropTypes } from 'react';
import Home from './Home'

import styles from '../styles/ScannerStyles.js'
import ButtonGroup from './ButtonGroup.js'
import Review from './Review.js'
import axios from 'axios'
 
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
      review: false,
      currentProduct: {},
      sessionArray: [],
      session_id: '',
      qty: '',
      sessionType: this.props.route.title
    }
    this.onCancel = this.onCancel.bind(this)
    this.onReview = this.onReview.bind(this)
    this.upload = this.upload.bind(this)
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
    axios.post(`https://inventory-manager-ls.herokuapp.com/api/v1/${sessionType}_sessions`, { username: 'lukeschuyler' })
      .then(session => {
         this.setState({session_id: session.data.id})
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
    axios.get(`https://inventory-manager-ls.herokuapp.com/api/v1/products/${e.data}`)
      .then(product => {
        this.setState({modalVisible: true, currentProduct: product.data})
        this.refs.TextInput.focus()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // GO BACK TO HOME

  onCancel() {
    let sessionType;
    if (this.state.sessionType === 'Waste') {
      sessionType = 'waste'
    } else {
      sessionType = 'inv'
    }
    axios.delete(`https://inventory-manager-ls.herokuapp.com/api/v1/${sessionType}_sessions/${this.state.session_id}`)
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

  onReview() {
    this.setState({review: true})
  }

  upload() {
    let sessionType;
    let sessionKey;
    if (this.state.sessionType === 'Waste') {
      sessionType = 'waste'
      sessionKey = 'waste_session_id'
    } else {
      sessionType = 'inv'
      sessionKey = 'inventory_session_id'
    }
    Promise.all(this.state.sessionArray.map(item => {
      const data = { product_id: +item.product_id, [sessionKey]: +item.session_id, quantity: +item.quantity }
     return axios.post(`https://inventory-manager-ls.herokuapp.com/api/v1/${sessionType}_line_items`, data)
       .then((res) => {
          console.log(res)
        })
       .catch(err => {
        alert('Something happened! Please try again')
       })
    }))
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
              topContent: <Text style={styles.centerText}> <Text style={styles.textBold}>Scan Item</Text> </Text>,
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
                enter={() => { this.onEnter({
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
    } else {
      return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.review}
        onRequestClose={() => {alert("Modal has been closed.")}}
        >
        <Review 
          itemArray={this.state.sessionArray}
          upload={this.upload}
          backToScan={()=> { this.setState({ review: false }) }}
        />
      </Modal>
      )
    }
  }
}


              //         <QtyPopup 
              //   image={currentProduct.image}
              //   name={currentProduct.name}
              //   code={currentProduct.upc_code}
              //   measure={currentProduct.measure}
              //   qty={this.state.qty}
              //   hideModal={() => { this.setModalVisible(false) } }
              //   pushItem={() => { this.onEnter({
              //               quantity: +(this.state.qty), 
              //               product_id: this.state.currentProduct.id, 
              //               session_id: +(this.state.session_id),
              //               name: this.state.currentProduct.name,
              //               upc_code: this.state.currentProduct.upc_code }
              //             )}} 
              //   onChangeQty={(qty) => this.setState({qty})}
              // />
