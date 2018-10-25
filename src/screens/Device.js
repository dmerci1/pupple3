import React, { Component } from 'react';
import { View } from 'react-native';
import DevicePhotos from '../components/DevicePhotos';

class Device extends Component {
  state= {
    image: null,
  };

  render() {
      return (
        <View>
          <DevicePhotos />
        </View>
      );
    }
}


export default Device;
