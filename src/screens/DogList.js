import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, Text } from 'react-native';
import { Container, Content, Header, Button, Left, Body, Icon } from 'native-base';
import { fetchDogs } from '../actions';
import DogListItem from './DogListItem';

class DogList extends Component {

  constructor(props) {
  super(props);
//  this.renderRow = this.renderRow.bind(this);
}
  componentWillMount() {
    this.props.fetchDogs();
  }

  componentWillReceiveProps(nextProps) {

  }
  showDog(dog) {
     this.props.navigation.navigate('editdog', { dog });
}

  render() {
    console.log(this.props);
    return (
      <Container>
          <Header style={{ height: 80, backgroundColor: '#03a5f0'  }}>
            <Left>
              <Button
              transparent
              onPress={() => this.props.navigation.navigate('swipe')}
              >
              <Icon name='arrow-back' type='MaterialIcons' />
              </Button>
            </Left>
            <Body>
              <Text>Dogs List</Text>
            </Body>
          </Header>
          <Content>
            <FlatList
              data={this.props.dogs}
              renderItem={
                ({ item }) => (
                  <DogListItem
                    dog={item}
                    navigation={this.props.navigation}
                    onRowPress={(dog) => this.showDog(dog)}
                  />
                )
              }
              keyExtractor={(item, index) => item.uid}
            />
            <Button
            block
            onPress={() => this.props.navigation.navigate('newdog')}
            >
              <Text>Add Dog</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const dogs = _.map(state.dogs, (val, uid) => {
    return { ...val, uid };
  });

  return { dogs };
};

export default connect(mapStateToProps, { fetchDogs })(DogList);
