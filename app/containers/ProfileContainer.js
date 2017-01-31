import React, { Component } from 'react';
import {
  InteractionManager,
  LayoutAnimation,
  UIManager,
} from "react-native";

import Loading from "@components/general/Loading"
import { Actions } from "react-native-router-flux";
import Profile from "@components/dashboard/Profile"
import { firebaseApp } from '@config/firebase'
import FCM from 'react-native-fcm';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {

    InteractionManager.runAfterInteractions(() => {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

      this.setState({
        loading: false,
      })
    })
  }


  cleanLogout() {
    firebaseApp.auth().signOut()
    FCM.unsubscribeFromTopic(`/topics/all`);
    this.props.userActions.logout();
    Actions.login({ type: "reset" });
  }

  render() {
    const { currentUser, userActions } = this.props;
    return (
      <Profile currentUser={currentUser} cleanLogout={this.cleanLogout.bind(this)}  {...userActions} />
    );
  }
}

import { bindActionCreators } from 'redux';
import * as userActions from '@redux/user/action';
import { connect } from 'react-redux';
import * as EventActions from '@redux/events/action';
const mapStateToProps = state => ({
  currentUser: state.currentUser,
})
const mapActions = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
})

export default connect(mapStateToProps, mapActions)(ProfileContainer);


