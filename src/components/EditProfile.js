import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Content, Form, Item, Input, Textarea, Button } from 'native-base';
import { profileUpdate, profileSave } from '../actions';

class EditProfile extends Component {
  onButtonPress() {
    const { photo, firstName, lastName, bio } = this.props;


    this.props.profileSave({ photo, firstName, lastName, bio });
}
  render() {
    const pick = this.props.photo
  return (

      <Content>
        <Form>
        <Image
          style={{ width: 200, height: 200, borderRadius: 100, align: 'center', border: 5, borderColor: 'black' }}
          source={{ uri: pick }}
        />
          <Item>
            <Input
              placeholder="First Name"
              value={this.props.firstName}
              onChangeText={value => this.props.profileUpdate({ prop: 'firstName', value })}
            />
          </Item>
          <Item>
            <Input
              placeholder="Last Name"
              value={this.props.lastName}
              onChangeText={value => this.props.profileUpdate({ prop: 'lastName', value })}
            />
          </Item>
          <Textarea
            rowSpan={5}
            bordered
            placeholder="Bio"
            value={this.props.bio}
            onChangeText={value => this.props.profileUpdate({ prop: 'bio', value })}
          />
        </Form>
        <Button
        full info
        onPress={this.onButtonPress.bind(this)}
        >
          <Text>Update</Text>
        </Button>
        <Button
        full danger
        onPress={() => this.props.navigation.navigate('profile')}
        >
          <Text>Cancel</Text>
        </Button>
      </Content>

  );
}
}

const mapStateToProps = (state) => {
  const { photo, firstName, lastName, bio } = state.profileForm;

  return { photo, firstName, lastName, bio };
};

export default connect(mapStateToProps, { profileUpdate, profileSave })(EditProfile);
