'use strict';
 
import React, { Component, PropTypes } from 'react';
import Home from './Home'

import { 
  Text,
  TextInput,
  View
} from 'react-native'

import styles from '../styles/ScannerStyles.js'
import ButtonGroup from './ButtonGroup.js'


class ReviewItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: this.props.qty
    }
  }
  render() {
    return  (
      <View style={styles.reviewSection}>
       <Text>{this.props.name}</Text>
        <TextInput
          onChangeText={(qty) => { this.setState({qty}) }}
          value={this.state.qty}
          style={styles.reviewInput} 
          autoFocus={false}
        />
      </View>
    )
  }
}
 export default ReviewItem
