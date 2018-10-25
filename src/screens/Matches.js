import _ from 'lodash';
import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Header, Button, Icon, Body, Right, Left, Form } from 'native-base';
import firebase from 'firebase';
import { fetchLikedDogs } from '../actions';
import LikedDogs from './LikedDogs';

class Matches extends Component {

  state= { showModal: false };
  onDecline() {
    this.setState({ showModal: false });
    navigation.navigate('editdog');

  }
  componentWillMount() {

  }
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
                <Icon name='paw' type='Foundation' style={{ fontSize: 35 }}/>
              </Button>
            </Left>
            <Body>
                <Icon name='chat' type="MaterialIcons" style={{ color: 'white', fontSize: 30, marginLeft: 75 }} />
            </Body>
            <Right>
              <Button
              iconRight
              transparent
              onPress={() => this.props.navigation.navigate('matches')}
              >
                <Icon name='search' type="FontAwesome" style={{ color: 'white', fontSize: 30 }}  />
              </Button>
            </Right>
          </Header>
          <Text>Matches Screen</Text>
          <Button
          style={{ flex: 1 }}
          rounded danger
          onPress={() => this.props.navigation.navigate('photos')}
          >
            <Text>photos</Text>
          </Button>
          <FlatList
            data={this.props.dogs}
            renderItem={
              ({ item }) => (
                <LikedDogs
                  dogitem={item}

                />
              )
            }
            keyExtractor={(item, index) => item.uid}
          />

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const item = _.map(state.item, (val, uid) => {
    return { ...val, uid };
  });

  return { item };
};

export default connect(mapStateToProps, { fetchLikedDogs })(Matches);
