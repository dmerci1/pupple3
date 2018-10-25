import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Content, Header, Button, Left } from 'native-base';

class other extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Header style={{ height: 80 }}>
            <Left>
              <Button
              block
              onPress={() => this.props.navigation.navigate('swipe')}
              >
                <Text>Other Screen</Text>
              </Button>
            </Left>
          </Header>
          <Text>Profile Screen</Text>
        </Content>
      </Container>
    );
  }
}

export default other;
