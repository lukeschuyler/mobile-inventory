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
        <KeyboardAvoidingView behavior="padding" style={styles.reviewItemEdit}>
          <View style={styles.itemLabel}>
           <Text style={styles.labelText}>{this.props.name}</Text>
           <Text style={styles.labelText}>{this.props.code}</Text>
          </View>
          <KeyboardAvoidingView style={styles.doneBtnContainer}>
            <TouchableHighlight 
              underlayColor='rgb(0,122,255)' style={styles.doneBtn} 
              onPress={() => { this.done(this.state.qty, this.state.index ) } }
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableHighlight>
          </KeyboardAvoidingView>
          <View style={styles.editInputContainer}>
            <Text style={styles.labelText}>{this.props.measure}: </Text>
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
            <View style={styles.itemLabelNoEdit}>
             <View style={styles.nameCont}><Text style={styles.labelText}>{this.props.name}</Text></View>
             <Text style={styles.labelText}>{this.props.code}</Text>
            </View>
            <View style={styles.editInputContainer}> 
              <Text style={styles.boldText}>{this.props.measure}: {this.state.qty}</Text>
            </View>
          </View>
          </TouchableHighlight>        
      )
    }
  }
}
 export default ReviewItem
