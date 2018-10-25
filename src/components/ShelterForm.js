import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Content, Form, Card, Button, Item, Input, Label, List, ListItem, Picker } from 'native-base';
import { connect } from 'react-redux';
import { shelterUpdate } from '../actions';

class ShelterForm extends Component  {
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
                <Input
                value={this.props.shelterName}
                onChangeText={value => this.props.shelterUpdate({ prop: 'shelterName', value })}
                />
              </Item>
              <Item stackedLabel>
                <Label>E-Mail</Label>
                  <Input
                  value={this.props.email}
                  onChangeText={value => this.props.shelterUpdate({ prop: 'email', value })}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>Phone Number</Label>
                    <Input
                    value={this.props.phone}
                    onChangeText={value => this.props.dogUpdate({ prop: 'phone', value })}
                    />
                  </Item>
                 <Item stackedLabel>
                    <Label>Location</Label>
                      <Input
                      value={this.props.location}
                      onChangeText={value => this.props.dogUpdate({ prop: 'location', value })}
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
  const { name, email, phone, location, bio } = state.dogForm;

  return { name, email, phone, location, bio };
};

export default connect(mapStateToProps, { shelterUpdate })(ShelterForm);
