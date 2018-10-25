import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, FlatList, Image, View } from 'react-native';
import { Container, Header, H3, Title, Content, Button, Left, Right, Body, Icon, Drawer, Card, CardItem } from 'native-base';
import { fetchAllDogs } from '../actions';
import DogCard from './DogCard';

class SwipeScreen extends Component {
  constructor(props) {
  super(props);
//  this.renderRow = this.renderRow.bind(this);
}
  componentWillMount() {
    this.props.fetchAllDogs();
    this.props.navigation.navigate('DrawerClose');
  }

    renderCard(item) {
      return (
        <Card style={{ height: 550 }}>
        <CardItem bordered>
         <Image
         style={{ height: 400, width: 330 }}
         source={{ uri: item.photo }} />
       </CardItem>
        <CardItem>
         <Text> { item.name } </Text>
       </CardItem>
       <CardItem>
        <Text> { item.age } </Text>
      </CardItem>

      </Card>
      );
    }

    renderNoMoreCards() {
      return (
        <Body style={{ backgroundColor: 'black' }}>
         <Image
         style={{ height: 300, width: 300, borderRadius: 100 }}
         source={{ uri: 'http://cdn2-www.dogtime.com/assets/uploads/2016/08/corgi-puppy-6.jpg' }} />
      </Body>


      );
    }

  render() {
    return (
        <Container>
          <Header style={{ height: 80, backgroundColor: '#03a5f0' }}>
            <Left>
              <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
              >
                <Icon name='menu' style={{ fontSize: 35 }}/>
              </Button>
            </Left>
            <Body style={{ alignItems: 'center' }}>
              <H3 style={{ marginLeft: 50, color: 'white' }}>Pupple</H3>
            </Body>
            <Right>
            <Button
            iconRight
            transparent
            onPress={() => this.props.navigation.navigate('matches')}
            >
              <Icon name='chat' type="MaterialIcons" style={{ color: 'white', fontSize: 30 }}  />
            </Button>
            </Right>
          </Header>


            <DogCard
          style={styles.cardStyle}
          data={this.props.dogs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />

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

const styles = {
  errorText: {
    fontSize: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    color: 'red'
  }
};

export default connect(mapStateToProps, { fetchAllDogs })(SwipeScreen);
