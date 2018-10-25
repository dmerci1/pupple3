import React, { Component } from 'react';
import { Text, Image, Alert } from 'react-native';
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';
import { Container, Content, Form, Card, Button, Item, Input, Label, List, ListItem, Picker } from 'native-base';
import { connect } from 'react-redux';
import { dogUpdate, dogPhotos } from '../actions';

class DogForm extends Component  {
  onChooseImagePress = async () => {
    let result = await ImagePicker.launchCameraAsync();
    //let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.uploadDogPhotos(result.uri)
        .then(() => {
          Alert.alert('yas');
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  }

  uploadDogPhotos = async (uri, uid) => {
  //  var storageRef = firebase.storage().ref();
//  this.props.dogPhotos(uri, uid);

  //}
   const response = await fetch(uri);
    const blob = await response.blob();
    const { currentUser } = firebase.auth();
    var ref = firebase.storage().ref(`/users/${currentUser.uid}`).child(`/dogs/${uid}/photos`);

    var pathReference = firebase.database().ref('/users').child('/images');

      const snapshot = await ref.put(blob);


      const pick = this.props.photo;
          console.log(snapshot.downloadURL);
         return pick.push(snapshot.downloadURL)
     // snapshot.downloadURL;

  }
  render() {

     const { currentUser } = firebase.auth();



    const pick = this.props.photo;
    return (
      <Container>
        <Content>
          <Form>
            <Image
              style={{ width: 200, height: 200 }}
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
                  </Content>
                </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { photo, name, breed, gender, age, bio } = state.dogForm;

  return { photo, name, breed, gender, age, bio };
};

export default connect(mapStateToProps, { dogUpdate, dogPhotos })(DogForm);
