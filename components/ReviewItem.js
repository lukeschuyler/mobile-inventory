'use strict';
 
import React, { Component } from 'react';

import { 
  Text,
  TextInput,
  View,
  TouchableHighlight,
  KeyboardAvoidingView
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
        <KeyboardAvoidingView style={styles.reviewItemEdit}>
          <View style={styles.itemLabel}>
           <Text style={styles.doneText}>{this.props.name}</Text>
           <Text style={styles.doneText}>{this.props.code}</Text>
          </View>
          <View>
            <TouchableHighlight 
              underlayColor="white" style={styles.doneBtn} 
              onPress={() => { this.done(this.state.qty, this.state.index ) } }
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableHighlight>
          </View>
          <View>
            <Text style={styles.doneText}>{this.props.measure}: </Text>
            <TextInput
              onChangeText={ (qty) => { this.setState({qty}) }}
              value={this.state.qty.toString()}
              style={styles.reviewInput} 
              autoFocus={true}
              keyboardType={'numeric'}
              defaultValue={this.state.qty.toString()}
              ref='editInput'
            />
          </View>
        </KeyboardAvoidingView>
      )
    } else {
      return (
          <TouchableHighlight style={styles.reviewItem} onPress={this.edit}>
          <View>
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
