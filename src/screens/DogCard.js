import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Text,
         View,
         Animated,
         PanResponder,
         Dimensions,
         LayoutAnimation,
         Platform,
         UIManager } from 'react-native';
import { List, ListItem, Card, CardItem } from 'native-base';
import { dogUpdate, userDogSave, dogCreate, dogDelete, userDogDelete } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_HORIZONAL_THRESHOLD = 0.40 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 300;

class DogCard extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    onSwipeUp: () => {},
    keyProp: 'id'
  }


  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_HORIZONAL_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_HORIZONAL_THRESHOLD) {
          this.forceSwipe('left');
        } else {
        this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  componentWillReceiveProps(nextProps) {
  if (nextProps.data !== this.props.data) {
    this.setState({ index: 0 });
  }
}

forceSwipe(direction) {
  const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
  Animated.timing(this.state.position, {
    toValue: { x, y: 0 },
    duration: SWIPE_OUT_DURATION
  }).start(() => this.onSwipeComplete(direction));
}

onSwipeComplete(direction) {
  const { onSwipeLeft, onSwipeRight, data } = this.props;
  const item = data[this.state.index];
  //const { photo, name, breed, gender, age, bio, phone, uid } = this.props;
    const { currentUser } = firebase.auth();

if (direction === 'right') {
  onSwipeRight(item);
 firebase.database().ref(`/users/${currentUser.uid}/SavedDogs/dogs`).push({ item  });
  //this.props.dogCreate({ photo, name, breed, gender, age, bio, phone, uid });
  console.log('swipe right');
} else {
  onSwipeLeft(item);
  console.log('swipe left');
}
  this.state.position.setValue({ x: 0, y: 0 });
  this.setState({ index: this.state.index + 1 });
}
resetPosition() {
  Animated.spring(this.state.position, {
    toValue: { x: 0, y: 0 }
  }).start();
}
getCardStyle() {
  const { position } = this.state;
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
    outputRange: ['-120deg', '0deg', '120deg']
  });
  return {
    ...position.getLayout(),
  transform: [{ rotate }]
};
}
renderCards() {
  if (this.state.index >= this.props.data.length) {
    return this.props.renderNoMoreCards();
  }

  const deck = this.props.data.map((item, i) => {
    if (i < this.state.index) { return null; }

    if (i === this.state.index) {
      return (
         <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle]}
            {...this.state.panResponder.panHandlers}
         >
            {this.props.renderCard(item)}
         </Animated.View>
        );
      }

      return (
        <Animated.View
          key={item[this.props.keyProp]}
          style={[styles.cardStyle, { zIndex: -i }]}
        >
          {this.props.renderCard(item)}
        </Animated.View>
       );
     });

     return Platform.os === 'android' ? deck : deck.reverse();
    }

  render() {
    const { dog } = this.props;

    return (
      <Animated.View>
       {this.renderCards()}
    </Animated.View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
};

const mapStateToProps = (state) => {
  const { photo, name, breed, gender, age, phone, bio } = state.dogForm;

  return { photo, name, breed, gender, age, phone, bio };
};

export default connect(mapStateToProps, { dogUpdate, dogCreate, userDogSave, dogDelete, userDogDelete })(DogCard);
