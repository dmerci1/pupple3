import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Container, Content, Card, Button, Item, Input, Label, Spinner, Icon } from 'native-base';
import { emailChanged, passwordChanged, loginUser, loginUserSuccess } from '../actions';

class SignInForm extends Component {
  componentWillMount() {
   firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       this.setState({ loggedIn: true });
       this.props.navigation.navigate('menu');
     } else {
       this.setState({ loggedIn: false });
       this.props.navigation.navigate('auth');
     }
   });
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }


  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner color='blue' />;
    }

      return (
        <Button
        style={{ marginTop: 50 }}
        block
        danger
        style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}
        onPress={this.onButtonPress.bind(this)}
        >
          <Text>Log In</Text>
        </Button>
      );
  }
  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: '#03a5f0' }}>
        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 80, marginTop: 30 }}>Pupple</Text>
            <Icon name='paw' type='Foundation' style={{ alignSelf: 'center', color: 'white', fontSize: 150 }} />
          <Card style={{ marginLeft: 20, marginRight: 20 }}>
            <Item floatingLabel>
              <Label>E-Mail</Label>
              <Input
              //onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
              secureTextEntry
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
              />
           </Item>

           {this.renderError()}

          </Card>

          {this.renderButton()}
          <Button
          block
          style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}
          onPress={() => this.props.navigation.navigate('signUp')}
          >
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    user: state.auth.user
  };
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(SignInForm);
