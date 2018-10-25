import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { List, ListItem } from 'native-base';

class ImageList extends Component {
  constructor(props) {
    super(props);

    this.onRowPress = this.onRowPress.bind(this);
  }

  onRowPress() {
    const { dog, navigation } = this.props;
    navigation.navigate('editdog', { dog });
  }

  render() {
    const { photo } = this.props;

    return (
      <List>
        <ListItem>
          <Image
            style={{ width: 200, height: 200 }}
            //source={{ uri: photo }}
          />
        </ListItem>
      </List>
    );
  }
}

export default ImageList;
