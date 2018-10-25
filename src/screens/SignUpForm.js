import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Card, Button, Item, Input, Label, Spinner } from 'native-base';
import { emailChanged, passwordChanged, createUser } from '../actions';

class SignUpForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onButtonPress() {
    const { email, password } = this.props;

    this.props.createUser({ email, password });
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
        block
        danger
        style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}
        onPress={this.onButtonPress.bind(this)}
        >
          <Text>Sign Up</Text>
        </Button>
      );
  }
  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: '#03a5f0' }}>
          <Card>
            <Item floatingLabel>
              <Label>E-Mail</Label>
              <Input
              onChangeText={this.onEmailChange.bind(this)}
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
          style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}
          onPress={() => this.props.navigation.navigate('signIn')}
          >
            <Text>Sign In</Text>
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
    loading: state.auth.loading
  };
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};
export default connect(mapStateToProps, { emailChanged, passwordChanged, createUser })(SignUpForm);
