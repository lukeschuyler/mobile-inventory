import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

class Popup extends Component {
  render() {
    return (
      <View style={{marginTop: 22}}>


        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

export default Popup
