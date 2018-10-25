import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text, Image } from 'react-native';
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';
import { Container, Content, Body, Header, Form, Item, ListItem, CheckBox, Label, Input, Button, Left, Picker } from 'native-base';
import { DogForm } from '../components/DogForm';
import { dogUpdate, dogCreate, userDogCreate } from '../actions';

class AddDog extends Component {

  onButtonPress() {
    const { photo, name, breed, gender, age, bio, phone } = this.props;

    const navigationProps = this.props.navigation;
    this.props.userDogCreate({ photo, name, breed, gender, age: age || 1, bio, phone, navigationProps });
    this.props.dogCreate({ photo, name, breed, gender, age, bio, phone, navigationProps });
}

onChooseImagePress = async () => {
  let result = await ImagePicker.launchCameraAsync();
  //let result = await ImagePicker.launchImageLibraryAsync();

  if (!result.cancelled) {
    this.uploadImage(result.uri)
      .then(() => {
        Alert.alert("Success");
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }
}

uploadImage = async (uri, imageName) => {
//  var storageRef = firebase.storage().ref();

//}
  const response = await fetch(uri);
  const blob = await response.blob();
  const { currentUser } = firebase.auth();
  var ref = firebase.storage().ref(`/users/${currentUser.uid}`).child('/images');
  var p = firebase.database().ref(`/users/${currentUser.uid}`).child('/dogs');
var forestRef = ref.child('/images');
//  var pathReference = firebase.storage().ref(`/users/${currentUser.uid}`).child('/images').snapshot.getDownloadURL();

    const snapshot = await ref.put(blob);

const pick = this.props.photo;
    console.log(snapshot.downloadURL);
   return pick.push(p.snapshot.downloadURL)
   // snapshot.downloadURL;
}


  render() {

    const pick = this.props.photo;
    //'http://i.imgur.com/b9xWfQc.png' ;
    return (
      <Container>
      <Header style={{ height: 80, backgroundColor: '#03a5f0' }}>
        <Left>
          <Button
          block
          onPress={() => this.props.navigation.navigate('doglist')}
          >
            <Text>Back to Dog List</Text>
          </Button>
        </Left>
      </Header>
        <Content>
          <Form>
            <Image
              style={{ width: 200, height: 200, borderRadius: 100, align: 'center', border: 5, borderColor: 'black' }}
              source={{ uri: pick }}
            />

            <Button title="Choose image..." onPress={this.onChooseImagePress} >
            <Text>Add Image</Text>
            </Button>

            <Item stackedLabel>
              <Label>Name</Label>
                <Input
                value={this.props.name}
                onChangeText={value => this.props.dogUpdate({ prop: 'name', value })}
                />
              </Item>
              <Text>Breed</Text>
               <Picker
                mode="dropdown"
                selectedValue={this.props.breed}
                onValueChange={value => this.props.dogUpdate({ prop: 'breed', value })}
                >
                  <Item label="Labrador" value="Labrador" />
                  <Item label="Poodle" value="Poodle" />
                  <Item label="Doxin" value="Doxin" />
                  <Item label="Beagle" value="Beagle" />
                </Picker>
                  <Text>Gender</Text>
                   <Picker
                    mode="dropdown"
                    selectedValue={this.props.gender}
                    onValueChange={value => this.props.dogUpdate({ prop: 'gender', value })}
                    >
                      <Item label="Male" value="Male" />
                      <Item label="Female" value="Female" />
                    </Picker>
                 <Item stackedLabel>
                    <Label>Age</Label>
                      <Input
                      value={this.props.age}
                      onChangeText={value => this.props.dogUpdate({ prop: 'age', value })}
                      />
                    </Item>
                    <Item stackedLabel>
                      <Label>Bio</Label>
                        <Input
                        value={this.props.bio}
                        onChangeText={value => this.props.dogUpdate({ prop: 'bio', value })}
                        />
                      </Item>
                      <Item stackedLabel>
                        <Label>Phone Number</Label>
                          <Input
                          value={this.props.phone}
                          onChangeText={value => this.props.dogUpdate({ prop: 'phone', value })}
                          />
                        </Item>
                    </Form>
                    <Button
                     block info
                     onPress={this.onButtonPress.bind(this)}
                     >
                       <Text>Add Dog</Text>
                     </Button>
                  </Content>
                </Container>

    );
  }
}

const mapStateToProps = (state) => {
  const { photo, name, breed, gender, age, bio, phone } = state.dogForm;

  return { photo, name, breed, gender, age, bio, phone };
};

export default connect(mapStateToProps, { dogUpdate, dogCreate, userDogCreate })(AddDog);
