/**
 * login screen
 */

import React, { Component } from 'react'
import {
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  StatusBar,
  StyleSheet
} from 'react-native'

import * as Animatable from 'react-native-animatable'

import { getColor } from '@config/getColor'

import { Actions } from "react-native-router-flux";
import { firebaseApp } from '@config/firebase'

import Background from '@components/ui/background'
import LogoCircle from '@components/login_screen/logo_circle'
import InitialView from '@components/login_screen/initial_view'
import SignInForm from '@components/login_screen/signIn_form'
import SignUpForm from '@components/login_screen/signUp_form'
import ForgotPassForm from '@components/login_screen/forgotPassword_form'
import FCM from 'react-native-fcm';

const backImages = [
  require("@images/launch/underwater1.jpeg"),
  require("@images/launch/underwater2.jpeg"),
  require("@images/launch/underwater3.png"),
  require("@images/launch/underwater4.jpeg"),
]

class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      initialRun: true,
      initialScreen: true,
      signIn: false,
      signUp: false,
      forgotPass: false,
      backPic: backImages[Math.round(Math.random() * (backImages.length - 1))]

    }

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  componentDidMount() {
    if (this.props.currentUser && this.props.currentUser.isLoggedIn) {
      Actions.syncServer({ type: "reset" })
    }
    this.setState({ initialRun: false })
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  render() {

    const animationDelay = this.state.initialRun ? 200 : 0

    const initialView = this.state.initialScreen ?
      <InitialView
        onSignIn={this._onSignIn.bind(this)}
        onSignUp={this._onSignUp.bind(this)}
        animDelay={animationDelay} />
      : null

    const signIn = this.state.signIn ?
      <SignInForm
        goToHomeScreen={this._onSignInSuccess.bind(this)}
        onBackFromSignIn={this._onBackFromSignIn.bind(this)}
        onForgotPass={this._onForgotPass.bind(this)} />
      : null

    const signUp = this.state.signUp ?
      <SignUpForm
        goToHomeScreen={this._onSignInSuccess.bind(this)}
        onBackFromSignUp={this._onBackFromSignUp.bind(this)} />
      : null

    const fogotPass = this.state.forgotPass ?
      <ForgotPassForm
        onBackFromForgotPass={this._onBackFromForgotPass.bind(this)} />
      : null

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={getColor('googleBlue700')}
          animated={true}
          />

        <Background imgSource={this.state.backPic} />

        {initialView}
        {signIn}
        {fogotPass}
        {signUp}

      </View>
    )
  }

  _onSignIn() {
    this.setState({
      initialScreen: false,
      signIn: true
    })
  }

  _onBackFromSignIn() {
    this.setState({
      initialScreen: true,
      signIn: false
    })
  }

  _onSignUp() {
    this.setState({
      initialScreen: false,
      signUp: true
    })
  }

  _onBackFromSignUp() {
    this.setState({
      initialScreen: true,
      signUp: false
    })
  }

  _onForgotPass() {
    this.setState({
      initialScreen: false,
      signIn: false,
      signUp: false,
      forgotPass: true
    })
  }

  _onBackFromForgotPass() {
    this.setState({
      initialScreen: true,
      forgotPass: false
    })
  }

  _onSignInSuccess() {
    let listener = firebaseApp.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        FCM.subscribeToTopic(`/topics/all`);
        const uid = currentUser.uid
        const email = currentUser.email
        const name = currentUser.displayName
        firebaseApp.database().ref('/users/' + uid).once('value', (snapshot) => {
          const role = snapshot.val().role
          const phone = snapshot.val().phone
          const coordinatingEvents = snapshot.val().coordinatingEvents
          listener()
          this.props.actions.login(email, uid, name, role, phone, coordinatingEvents)
          Actions.syncServer({ type: "reset", isConnected: true })
        }, (err) => {
          listener()
          alert(JSON.stringify(err))
        })
      }
    })

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80
  }
})

import { bindActionCreators } from 'redux';
import * as userActions from '@redux/user/action';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  currentUser: state.currentUser
})
const mapActions = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapActions)(LoginScreen);



