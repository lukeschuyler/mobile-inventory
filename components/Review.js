'use strict';
 
import React, { Component, PropTypes } from 'react';
import Home from './Home'
import ButtonGroup from './ButtonGroup.js'

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
        <View style={styles.reviewHeader}><Text>Review Selection</Text></View>
        <ScrollView style={styles.reviewScroll}>  
          {itemArray.map((item, i)=> {
            return <Text key={i}>Test</Text>
          })}
        </ScrollView>
        <ButtonGroup 
          cancel={}
          enter={} 
          cancelText= {'Cancel'}
          enterText= {'Enter'}
        />
      </View>
    )

export default Review
