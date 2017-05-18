import React, { Component } from 'react';
import styles from '../styles/ScannerStyles.js'

import { 
  View,  
  TouchableHighlight,
  Text
} from 'react-native'
  
const ButtonGroup = ({cancel, enter, cancelText, enterText}) =>
  (
    <View style={styles.btnContainer}>
      <TouchableHighlight 
        style={styles.cancelBtn} 
        onPress={cancel}>
       <Text>{cancelText}</Text>
      </TouchableHighlight>
      <TouchableHighlight 
        style={styles.enterBtn} 
        onPress={enter}
        underlayColor="white">
        <Text>{enterText}</Text>
      </TouchableHighlight>
    </View>
  )

export default ButtonGroup;
