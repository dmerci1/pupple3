import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Content, Header, Button, Left, Icon } from 'native-base';

class Settings extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Header style={{ height: 80, backgroundColor: '#03a5f0'  }}>
            <Left>
              <Button
              transparent
              onPress={() => this.props.navigation.navigate('swipe')}
              >
                <Icon name='arrow-back' type='MaterialIcons' />
              </Button>
            </Left>
          </Header>
          <Text>Settings Screen</Text>
        </Content>
      </Container>
    );
  }
}

export default Settings;
