'use strict';
 
import React, { Component, PropTypes } from 'react';
import Home from './Home'
import ButtonGroup from './ButtonGroup.js'
import Review from './Review.js'

import { 
  KeyboardAvoidingView, 
  Text, 
  TextInput, 
  Image, 
  TouchableHighlight, 
  View 
} from 'react-native';

import styles from '../styles/ScannerStyles.js'

const QtyPopup = ({ image, name, code, measure, qty, hideModal, pushItem, onChangeQty }) =>
    (
       <KeyboardAvoidingView behavior="padding" style={styles.modalView}>
        <View style={styles.infoContainer}>
          <Text style={styles.textBold}>{name}</Text>           
          <Image
            source={{uri: image}}
            style={styles.productImage}
          />
        </View>
        <View style={styles.qtyConatiner}>
          <Text style={styles.textBold}>UPC: {code}</Text>  
          <Text style={styles.textBold}>Enter {measure}: </Text>
          <TextInput 
            onChangeText={onChangeQty}
            value={qty}
            style={styles.qtyInput} 
            keyboardType={'number-pad'}
            autoFocus={true}
            ref='TextInput'
          />
        </View>
        <ButtonGroup 
          cancel={hideModal}
          enter={pushItem} 
          cancelText= {'Cancel'}
          enterText= {'Enter'}
        />

          <ScrollView>  
            {itemArray.map((item, i) => 
              <ReviewItem 
                key={i}
                name={item.name}
                qty={+item.quantity}
              />
            )}
          </ScrollView>
      </KeyboardAvoidingView> 
    );

export default QtyPopup
