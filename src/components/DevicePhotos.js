import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Button, Alert } from 'react-native';
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';

class DevicePhotos extends Component {


/*
  pickImage = async () => {
    let result = await ImagePicker
      .launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri })

      let base64Img = `data:image/jpg;base64,${result.base64}`

      let apiUrl = 'https://api.cloudinary.com/v1_1/dmhglc3op/image/upload';

      const { currentUser } = firebase.auth();
            var ref = firebase.database().ref(`/users/${currentUser.uid}/images`);

      let data = {
        'file': base64Img,
        'upload_preset': 'i1tmx6uw',
      }

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(r=>{
        let data = r._bodyText
        console.log(JSON.parse(data).secure_url)
      }).catch(err=>console.log(err))
    }
  }
*/
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
    var p = firebase.database().ref(`/users/${currentUser.uid}`).child('/images');
var forestRef = ref.child('/images');
  //  var pathReference = firebase.storage().ref(`/users/${currentUser.uid}`).child('/images').snapshot.getDownloadURL();

      const snapshot = await ref.put(blob);


      console.log(snapshot.downloadURL);
     return p.push(snapshot.downloadURL)
     // snapshot.downloadURL;
  }

  render() {

  const yes = 'https://firebasestorage.googleapis.com/v0/b/pupple-4e40e.appspot.com/o/users%2FZKFfOk29qJfM3CajABDlnnPXwWU2%2Fimages?alt=media&token=94affd18-2141-445a-8053-781311c9c6fa';

    return (
      <View style={styles.container}>
        <Button title="Choose image..." onPress={this.onChooseImagePress} />




      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: "center", },
});

export default DevicePhotos;
