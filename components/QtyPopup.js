'use strict';
 
import React, { Component, PropTypes } from 'react';
import Home from './Home'

import { 
  KeyboardAvoidingView, 
  Text, 
  TextInput, 
  Image, 
  TouchableHighlight, 
  View 
} from 'react-native';


class QtyPopup extends Component {
  
  static propTypes = {
    sessionArray: PropTypes.array.isRequired,
    sessionId: PropTypes.number.isRequired.
    UPC: PropTypes.number.isRequired
  }

  state = {
    modalVisible: false,
  }

  componentDidMount = {
    fetch(`https://inventory-manager-ls.herokuapp.com/api/v1/products/${this.props.UPC}`)
      .then(res => res.json())
      .then(product => {
        this.setState({modalVisible: true, currentProduct: product})
        this.refs.TextInput.focus()
      })
      .catch((err) => {
        console.log(err)
      })
  }

 render() {
    (
       <KeyboardAvoidingView behavior="padding" style={styles.modalView}>

        <View style={styles.infoContainer}>
          <Text style={styles.textBold}>{this.state.currentProduct.name}</Text>           
          <Image
            source={{uri: this.state.currentProduct.image}}
            style={styles.productImage}
          />
        </View>

        <View style={styles.qtyConatiner}>
          <Text style={styles.textBold}>UPC: {this.state.currentProduct.upc_code}</Text>  
          <Text style={styles.textBold}>Enter {this.state.currentProduct.measure}: </Text>
          <TextInput 
            onChangeText={}
            value={qty}
            style={styles.qtyInput} 
            keyboardType={'number-pad'}
            autoFocus={true}
            ref='TextInput'
          />
        </View>

        <ButtonGroup 
          cancel={() => { this.setModalVisible(false) } }
          enter={() => { this.onEnter({quantity: +(this.state.qty), product_id: this.state.currentProduct.id, session_id: +(this.state.session_id) })} } 
          cancelText= {'Cancel'}
          enterText= {'Enter'}
        />

      </KeyboardAvoidingView>
    );
  }
}
























// const QtyPopup = ({ productName, productImage, productCode, productId, productMeasure, changeText, qty, cancel, enter }) => 
//   (
//      <KeyboardAvoidingView behavior="padding" style={styles.modalView}>

//       <View style={styles.infoContainer}>
//         <Text style={styles.textBold}>{this.state.currentProduct.name}</Text>           
//         <Image
//           source={{uri: this.state.currentProduct.image}}
//           style={styles.productImage}
//         />
//       </View>

//       <View style={styles.qtyConatiner}>
//         <Text style={styles.textBold}>UPC: {this.state.currentProduct.upc_code}</Text>  
//         <Text style={styles.textBold}>Enter {this.state.currentProduct.measure}: </Text>
//         <TextInput 
//           onChangeText={}
//           value={qty}
//           style={styles.qtyInput} 
//           keyboardType={'number-pad'}
//           autoFocus={true}
//           ref='TextInput'
//         />
//       </View>

//       <ButtonGroup 
//         cancel={() => { this.setModalVisible(false) } }
//         enter={() => { this.onEnter({quantity: +(this.state.qty), product_id: this.state.currentProduct.id, session_id: +(this.state.session_id) })} } 
//         cancelText= {'Cancel'}
//         enterText= {'Enter'}
//       />

//     </KeyboardAvoidingView>
//   );


export default QtyPopup
