'use strict';
 
import React, { Component, PropTypes } from 'react';
import Home from './Home'
import ButtonGroup from './ButtonGroup.js'
import ReviewItem from './ReviewItem.js'

import { 
  View,
  Text,
  ScrollView,
  ListView
} from 'react-native'

import styles from '../styles/ScannerStyles.js'
  


const Review = ({ itemArray, backToScan, upload }) =>
    (
      <View style={styles.reviewSection}>
        <View style={styles.reviewHeader}><Text>Review Selection</Text></View>
        <View style={styles.reviewScroll}>
          <ScrollView>  
            {itemArray.map((item, i) => 
              <ReviewItem 
                key={i}
                name={item.name}
                qty={item.qty}
              />
            )}
          </ScrollView>
        </View>
        <ButtonGroup 
          cancel={backToScan}
          enter={upload} 
          cancelText= {'Cancel'}
          enterText= {'Upload'}
        />
      </View>
    )

// const Review = ({ itemArray, upload, backToScan, editQty }) =>
//     (
//       <View style={styles.reviewSection}>
//         <View style={styles.reviewHeader}><Text>Review Selection</Text></View>
//         <View style={styles.reviewScroll}>
//           <ScrollView>  
//             {itemArray.map((item, i) => 
//              <Text key={i}>{item.name}</Text>
//               <TextInput
//                 onChangeText={}
//                 value={item.qty}
//                 style={styles.reviewInput} 
//                 autoFocus={false}
//                 ref='TextInput'
//               />
//             )}
//           </ScrollView>
//         </View>
//         <ButtonGroup 
//           cancel={backToScan}
//           enter={upload} 
//           cancelText= {'Cancel'}
//           enterText= {'Upload'}
//         />
//       </View>
//     )

export default Review
