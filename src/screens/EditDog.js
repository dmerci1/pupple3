import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import Communications from 'react-native-communications';
import { Container, Content, Header, Button, Left, Card, CardItem } from 'native-base';
import DogForm from '../components/DogForm';
import { ConfirmModal } from '../components/ConfirmModal';
import { dogUpdate, dogSave, userDogSave, dogDelete, userDogDelete } from '../actions';

class EditDog extends Component {
  state= { showModal: false };

  componentWillMount() {
    //const { navigation, dogUpdate } = this.props;
    _.each(this.props.navigation.state.params.dog, (value, prop) => {
      this.props.dogUpdate({ prop, value });
    });
  }
  onButtonPress() {
    const { photo, name, breed, gender, age, bio, phone } = this.props;
    const navigationProps = this.props.navigation;

    this.props.dogSave({
      photo,
      name,
      breed,
      gender,
      age,
      bio,
      phone,
      uid: this.props.navigation.state.params.dog.uid,
      navigationProps
    });

  this.props.userDogSave({
    photo,
    name,
    breed,
    gender,
    age,
    bio,
    phone,
    uid: this.props.navigation.state.params.dog.uid,
    navigationProps
  });
}


  onTextPress() {
    const { phone, name } = this.props;

    Communications.text(phone, `Hello Schun, you name is ${name}`);
  }

onAccept() {
  const { uid } = this.props.navigation.state.params.dog;

  const navigationProps = this.props.navigation;
  this.props.dogDelete({ uid, navigationProps });
  this.props.userDogDelete({ uid, navigationProps });
}

onDecline() {
  this.setState({ showModal: false });
}
  render() {
    return (
      <Container>
        <Header style={{ height: 80, backgroundColor: '#03a5f0'  }}>
          <Left>
            <Button
            block
            onPress={() => this.props.navigation.navigate('doglist')}
            >
              <Text>Back To Dog List</Text>
            </Button>
          </Left>
        </Header>
        <Content>
          <DogForm {...this.props} />
          <Card>
          <CardItem>
          <Button
           block info
           onPress={this.onButtonPress.bind(this)}
          >
            <Text>Update</Text>
          </Button>
          </CardItem>
          <CardItem>
          <Button
           block danger
           onPress={this.onTextPress.bind(this)}
          >
            <Text>Text</Text>
          </Button>
          </CardItem>
            <CardItem>
              <Button
              onPress={() => this.setState({ showModal: !this.state.showModal })}
              >
                <Text>Delete</Text>
              </Button>
            </CardItem>
            <ConfirmModal
              visible={this.state.showModal}
              onAccept={this.onAccept.bind(this)}
              onDecline={this.onDecline.bind(this)}
            >
            Are you sure you want to delete this, you fuck?
          </ConfirmModal>
        </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { photo, name, breed, gender, age, phone, bio } = state.dogForm;

  return { photo, name, breed, gender, age, phone, bio };
};

export default connect(mapStateToProps, { dogUpdate, dogSave, userDogSave, dogDelete, userDogDelete })(EditDog);
