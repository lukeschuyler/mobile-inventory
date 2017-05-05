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
  Image,
  ScrollView
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

            <View style={styles.infoContainer}>
              <Text style={styles.textBold}>{this.state.currentProduct.name}</Text>
              <Text style={styles.textBold}>UPC: {this.state.currentProduct.upc_code}</Text>             
              <Image
                source={{uri: this.state.currentProduct.image}}
                style={styles.productImage}
              />
              <ScrollView>
                <Text style={styles.textBold}>
                  {this.state.currentProduct.description}
                </Text>
              </ScrollView>
            </View>

            <View style={styles.qtyConatiner}>
              <TouchableHighlight 
                style={styles.cancelBtn} 
                onPress={() => {
                  this.setModalVisible(false)
                }}>
                <Text>Cancel</Text>
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
    flex: 1
  },
  infoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  qtyConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  productImage: {
    height: 200,
    width: 300,
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
    fontSize: 21,
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
