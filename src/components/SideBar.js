import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Content, Button, Icon } from 'native-base';
import firebase from 'firebase';
import { DrawerNavigator } from 'react-navigation';
import AddDog from '../screens/AddDog';

class SideBar extends Component {

  render() {

    return (
      <Container>
        <Content style={{ backgroundColor: 'white' }}>
          <Button
          iconLeft
          full info large
          style={{ marginTop: 200, marginBottom: 1, backgroundColor: '#03a5f0' }}
          onPress={() => this.props.navigation.navigate('profile')}
          >
            <Icon name='account-edit' type='MaterialCommunityIcons' style={{ marginRight: 20 }} />
            <Text style={{ color: 'white' }}>Edit Profile</Text>
         </Button>

        <Button
        iconLeft
        full large
        style={{ marginBottom: 1, backgroundColor: '#03a5f0' }}
        onPress={() => this.props.navigation.navigate('doglist')}
        >
          <Icon name='guide-dog' type='Foundation' style={{ marginRight: 20 }} />
          <Text style={{ color: 'white' }}>Your Dogs</Text>
       </Button>

       <Button
       iconLeft
       full large
       style={{ backgroundColor: '#03a5f0' }}
       onPress={() => this.props.navigation.navigate('settings')}
       >
         <Icon name='settings' type='Octicons' style={{ marginRight: 20 }} />
         <Text style={{ color: 'white' }}>Settings</Text>
      </Button>

      <Button
      iconLeft
      block danger
      style={{ marginTop: 50, marginLeft: 20, marginRight: 20 }}
      onPress={() => firebase.auth().signOut()}
      >
        <Text>Log Out</Text>
     </Button>
  </Content>
</Container>

    );
  }
}

export default SideBar;
