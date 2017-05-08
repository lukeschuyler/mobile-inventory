'use strict';
 
import React, { Component, PropTypes } from 'react';
import Home from './Home'

import { 
  View,
  Text,
  ScrollView,
  ListView
} from 'react-native'

import styles from '../styles/ScannerStyles.js'
import ButtonGroup from './ButtonGroup.js'

const Review = ({ itemArray }) =>
    (
      <View style={styles.reviewSection}>
        <Text>Review Selection</Text>
        <ScrollView>  
          {itemArray.map((item, i)=> {
            return <Text key={i}>{itemArray.name}</Text>
          })}
        </ScrollView>
      </View>
    )

export default Review
