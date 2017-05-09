'use strict';
 
import React, { Component, PropTypes } from 'react';
import Home from './Home'

import { 
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native'

import styles from '../styles/ScannerStyles.js'
import ButtonGroup from './ButtonGroup.js'


class ReviewItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: this.props.qty,
      editing: false
    }
    this.edit = this.edit.bind(this)
    this.done = this.done.bind(this)
  }

  edit() {
    this.setState({editing: true})
  }

  done() {
    this.setState({editing:false})
  }

  render() {
    if(this.state.editing) {
      return  (
        <View style={styles.reviewItem}>
          <View style={styles.itemLabel}>
           <Text >{this.props.name}</Text>
           <Text >{this.props.code}</Text>
          </View>
          <Text>{this.props.measure}: </Text>
          <TextInput
            onChangeText={(qty) => { this.setState({qty}) }}
            value={this.state.qty.toString()}
            style={styles.reviewInput} 
            autoFocus={false}
            keyboardType={'number-pad'}
            defaultValue={this.state.qty.toString()}
          />
          <TouchableHighlight onPress={this.done}><Text>Done</Text></TouchableHighlight>
        </View>
      )
    } else {
      return (
        <View style={styles.reviewItem}>
          <View style={styles.itemLabel}>
           <Text >{this.props.name}</Text>
           <Text >{this.props.code}</Text>
          </View>
           <TouchableHighlight onPress={this.edit}><Text>{this.props.measure}: {this.state.qty}</Text></TouchableHighlight>
        </View>        
      )
    }
  }
}
 export default ReviewItem
