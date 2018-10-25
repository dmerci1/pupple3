import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { List, ListItem } from 'native-base';

class LikedDogs extends Component {
  constructor(props) {
    super(props);

    this.onRowPress = this.onRowPress.bind(this);
  }

  onRowPress() {
    const { dog, navigation } = this.props;
    navigation.navigate('editdog', { dog });
  }

  render() {
    const { item } = this.props;

    return (
      <List>
        <ListItem onPress={this.onRowPress}>
          <Text>{ item.name }</Text>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: item.photo }}
          />
        </ListItem>
      </List>
    );
  }
}

export default LikedDogs;
