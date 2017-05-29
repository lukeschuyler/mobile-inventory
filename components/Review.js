'use strict';
 
import React, { Component, PropTypes } from 'react';
import Home from './Home'
import ButtonGroup from './ButtonGroup.js'
import axios from 'axios'
import ReviewItem from './ReviewItem.js'
import Toast from 'react-native-simple-toast';

import { 
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native'

import styles from '../styles/ScannerStyles.js'

class Review extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemArray: this.props.itemArray,
      sessionType: this.props.sessionType,
      loading: false
    }
    this.upload = this.upload.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.editQty = this.editQty.bind(this)
  }

  static propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired
  }

  editQty(qty, index) {
    let itemArray = this.state.itemArray
    const newArray = itemArray.map((item, i) => {
      if (i == index) {
        item.quantity = qty
      }
      return item
    })
    this.setState({
      itemArray: newArray
    })
  }

  onCancel() {
    this.props.navigator.pop()
  }

  postSession(type) {
    return axios.post(`https://inventory-manager-ls.herokuapp.com/api/v1/${type}_sessions`, { username: 'lukeschuyler' })
      .then(session => session.data.id) 
      .catch(err => {
        Toast.show('Could not post Session. Please try again.');
      })
  }

  upload() {
    this.setState({loading: true})
    let sessionType;
    let sessionKey;
    if (this.state.sessionType === 'Waste') {
      sessionType = 'waste'
      sessionKey = 'waste_session_id'
    } else if (this.state.sessionType === 'Inventory') {
      sessionType = 'inv'
      sessionKey = 'inventory_session_id'
    } else if (this.state.sessionType === 'Sales') {
      sessionType = 'sales'
      sessionKey = 'sales_session_id'
    } else {
      sessionType = 'rec'
      sessionKey = 'receiving_session_id'
    }
    this.postSession(sessionType)
    .then(id => {
      Promise.all(this.state.itemArray.map(item => {
       const count = item.current_qty
       const lineItem = { product_id: +item.product_id, [sessionKey]: id, quantity: +item.quantity }
       const data = { lineItem, qty: count }
       return axios.post(`https://inventory-manager-ls.herokuapp.com/api/v1/${sessionType}_line_items`, data)
         .then((res) => {
          setTimeout(() => {
            Toast.show('Session uploaded successfully');
            this.props.navigator.popToTop() 
            }, 1000)
          })
         .catch(err => {
            Toast.show('Could not post Session. Please try again.');
         })
      }))      
    })
  }

  render() {
    let itemArray = this.state.itemArray
    if(!this.state.loading) {
      return (
        <View style={styles.reviewSection}>
          <View style={styles.reviewHeaderContainer}><Text style={styles.reviewHeader}>Review Selection</Text></View>
          <View style={styles.reviewScroll}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>  
              {itemArray.map((item, i) =>
                <ReviewItem 
                  key={i}
                  name={item.name}
                  qty={+item.quantity}
                  code={+item.upc_code}
                  measure={item.measure}
                  itemArray={this.state.itemArray}
                  index={i}
                  editQty={this.editQty}
                />
              )}
            </ScrollView>
          </View>
          <ButtonGroup 
            cancel={this.onCancel}
            enter={this.upload} 
            cancelText= {'Cancel'}
            enterText= {'Upload'}
          />
        </View>
      )
    } else {
      return (
        <View style={[styles.centering, { flex: 1 }]}>
          <ActivityIndicator
            animating={this.state.loading}
            style={{height: 80}}
            size="large"
          />
        </View>
      )
    }
  }
}


export default Review
