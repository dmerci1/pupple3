import React from 'react';
import { Text, Modal } from 'react-native';
import { Card, CardItem, Content, Button } from 'native-base';

const ConfirmModal = ({ children, visible, onAccept, onDecline }) => {
  const { containerStyle, textStyle, cardStyle } = styles;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}>
      <Content style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
        <Card>
          <CardItem>
            <Text style={textStyle}>{children}</Text>
          </CardItem>
          <CardItem>
            <Button
            rounded info
            onPress={onAccept}
            >
              <Text>Yes</Text>
            </Button>
            <Button
            rounded danger
            onPress={onDecline}
            >
              <Text>No</Text>
            </Button>
        </CardItem>
       </Card>
      </Content>
    </Modal>
  );
};

const styles = {
  cardStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};
export { ConfirmModal };
