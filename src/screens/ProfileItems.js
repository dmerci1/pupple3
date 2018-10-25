import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { List, ListItem } from 'native-base';

class ProfileItems extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { dong } = this.props;

    return (
      <List>
        <ListItem>
        <Text>Hi</Text>
          <Text>{ dong.name }</Text>
        </ListItem>
      </List>
    );
  }
}

export default ProfileItems;
