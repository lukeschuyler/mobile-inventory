'use strict';
 
import React, { Component } from 'react';

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
      editing: false,
      index: this.props.index
    }
    this.edit = this.edit.bind(this)
    this.done = this.done.bind(this)
  }

  componentDidUpdate() {
    this.state.editing ? this.refs.editInput.focus() : null
  }

  edit() {
    this.setState({editing: true})
  }

  done(qty, index) {
    this.props.editQty(qty, index)
    this.setState({editing:false})
  }


  render() {
    if(this.state.editing) {
      return  (
        <View style={styles.reviewItem}>
          <View style={styles.itemLabel}>
           <Text>{this.props.name}</Text>
           <Text>{this.props.code}</Text>
          </View>
          <Text>{this.props.measure}: </Text>
          <TextInput
            onChangeText={ (qty) => { this.setState({qty}) }}
            value={this.state.qty.toString()}
            style={styles.reviewInput} 
            autoFocus={true}
            keyboardType={'numeric'}
            defaultValue={this.state.qty.toString()}
            ref='editInput'
          />
          <TouchableHighlight onPress={() => { this.done(this.state.qty, this.state.index ) } }><Text>Done</Text></TouchableHighlight>
        </View>
      )
    } else {
      return (
        <TouchableHighlight onPress={this.edit}>
        <View style={styles.reviewItem}>
          <View style={styles.itemLabel}>
           <Text>{this.props.name}</Text>
           <Text>{this.props.code}</Text>
          </View>
          <Text>{this.props.measure}: {this.state.qty}</Text>
        </View>
        </TouchableHighlight>        
      )
    }
  }
}
 export default ReviewItem