import React, { Component } from 'react';
import { View } from 'react-native';
import PictureCamera from '../components/PictureCamera';

class Photos extends Component {
  state= {
    image: null,
  };

  render() {
      return (

          <PictureCamera />
        
      );
    }
}


export default Photos;
