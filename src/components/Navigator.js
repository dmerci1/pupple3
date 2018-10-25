import React from 'react';
import { addNavigationHelpers,
         TabNavigator,
         StackNavigator,
         DrawerNavigator } from 'react-navigation';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';
import SignInForm from '../screens/SignInForm';
import SignUpForm from '../screens/SignUpForm';
import SwipeScreen from '../screens/SwipeScreen';
import Profile from '../screens/Profile';
import DogList from '../screens/DogList';
import DogListItem from '../screens/DogListItem';
import ImageList from '../screens/ImageList';
import DogCard from '../screens/DogCard';
import AddDog from '../screens/AddDog';
import EditDog from '../screens/EditDog';
import EditProfile from '../components/EditProfile';
import Settings from '../screens/Settings';
import Matches from '../screens/Matches';
import SideBar from './SideBar';
import DevicePhotos from '../components/DevicePhotos';
import PictureCamera from '../components/PictureCamera';

const AuthNav = TabNavigator({
signIn: { screen: SignInForm },
signUp: { screen: SignUpForm },
}, {
  navigationOptions: {
    tabBarVisible: false
  },
  tabBarPosition: 'bottom',
  lazy: true,
  swipeEnabled: false,
  animationEnabled: false,
}
);

const MenuNav = DrawerNavigator({
  swipe: { screen: SwipeScreen },
  profile: { screen: Profile },
  doglist: { screen: DogList },
  doglistitem: { screen: DogListItem },
  listitem: { screen: ImageList },
  dogCard: { screen: DogCard },
  settings: { screen: Settings },
  editdog: { screen: EditDog },
  editProfile: { screen: EditProfile },
  matches: { screen: Matches }
}, {
  contentComponent: props => <SideBar {...props} />
}, {

});
const StackNav = StackNavigator({
  newdog: { screen: AddDog },
  photos: { screen: PictureCamera },
  device: { screen: DevicePhotos },
}, {
  headerMode: 'none'
}
);

export const Navigator = TabNavigator({
auth: { screen: AuthNav },
menu: { screen: MenuNav },
stack: { screen: StackNav },

}, {
  navigationOptions: {
    tabBarVisible: false
  },
  tabBarPosition: 'bottom',
  lazy: true,
  swipeEnabled: false,
  animationEnabled: false,
}, {
initialRouteName: 'auth',
}
);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <Navigator
    navigation={addNavigationHelpers({ dispatch, state: nav })}
  />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
