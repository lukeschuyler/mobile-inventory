'use strict';
 
import React, { Component, PropTypes } from 'react';
import Home from './Home'
import ButtonGroup from './ButtonGroup.js'
import axios from 'axios'
import ReviewItem from './ReviewItem.js'
import Spinner from 'react-native-loading-spinner-overlay';

import { 
  View,
  Text,
  ScrollView
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
  }

  static propTypes = {
      title: PropTypes.string,
      navigator: PropTypes.object.isRequired
    }

  postSession() {
    let sessionType;
    let sessionKey;
    if (this.state.sessionType === 'Waste') {
      sessionType = 'waste'
      sessionKey = 'waste_session_id'
    } else {
      sessionType = 'inv'
      sessionKey = 'inventory_session_id'
    }
    return axios.post(`https://inventory-manager-ls.herokuapp.com/api/v1/${sessionType}_sessions`, { username: 'lukeschuyler' })
      .then(session => session.data.id) 
      .catch(err => {
        console.log(err)
      })
  }

   upload() {
    this.setState({loading: true})
    let sessionType;
    let sessionKey;
    if (this.state.sessionType === 'Waste') {
      sessionType = 'waste'
      sessionKey = 'waste_session_id'
    } else {
      sessionType = 'inv'
      sessionKey = 'inventory_session_id'
    }
    this.postSession()
    .then(id => {
      Promise.all(this.state.itemArray.map(item => {
       const data = { product_id: +item.product_id, [sessionKey]: id, quantity: +item.quantity }
       return axios.post(`https://inventory-manager-ls.herokuapp.com/api/v1/${sessionType}_line_items`, data)
         .then((res) => {
            this.props.navigator.push({
              component: Home,
              title: 'Home'
            });            
          })
         .catch(err => {
          alert('Something happened! Please try again')
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
            <ScrollView>  
              {itemArray.map((item, i) => 
                <ReviewItem 
                  key={i}
                  name={item.name}
                  qty={+item.quantity}
                  code={+item.upc_code}
                  measure={item.measure}
                  itemArray={this.state.itemArray}
                  index={i}
                />
              )}
            </ScrollView>
          </View>
          <ButtonGroup 
            cancel={this.props.backToScan}
            enter={this.upload} 
            cancelText= {'Cancel'}
            enterText= {'Upload'}
          />
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Spinner visible={this.state.visible} textContent={"Uploading Session..."} textStyle={{color: '#FFF'}} />
        </View>
      )
    }
  }
}


export default Review
