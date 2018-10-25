import _ from 'lodash';
import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { Container, Content, Header, Button, Left, Icon } from 'native-base';
import { connect } from 'react-redux';
import { getProfile } from '../actions';
import ProfileItems from './ProfileItems';

class Profile extends Component {
  componentWillMount() {
    this.props.getProfile();
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
                <Icon name='arrow-back' type='MaterialIcons' />
              </Button>
            </Left>
          </Header>
          <Button
          block danger
          onPress={() => this.props.navigation.navigate('editProfile')}
          >
            <Text>Update Profile</Text>
          </Button>
          <FlatList
            data={this.props.dongs}
            renderItem={
              ({ item }) => (
                <ProfileItems
                  dong={item}

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
  const dongs = _.map(state.dongs, (val, uid) => {
    return { ...val, uid };
  });

  return { dongs };
};

export default connect(mapStateToProps, { getProfile })(Profile);
