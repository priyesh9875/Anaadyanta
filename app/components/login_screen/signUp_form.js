/**
 * this is the sign up form of the login screen
 */

import React, { Component } from 'react'
import {
  View,
  TextInput,
  BackAndroid,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet
} from 'react-native'
import { firebaseApp } from '@config/firebase'
import { getColor } from '@config/getColor'
import * as Animatable from 'react-native-animatable'
import { Text } from "@components/ui"
import { Container, Content } from "native-base"
export default class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this._handleBackBtnPress = this._handleBackBtnPress.bind(this)

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    this.state = {
      init: true,
      errMsg: null,
      signUpSuccess: false,
      displayName: '',
      email: '',
      password: '',
      phone: '',
      isMounted: true
    }
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    })
    BackAndroid.addEventListener('backBtnPressed', this._handleBackBtnPress)
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backBtnPressed', this._handleBackBtnPress)
  }

  render() {
    const animation = this.state.init ? 'bounceInUp' : 'bounceOutDown'

    const errorMessage = this.state.errMsg ?
      <Text style={styles.errMsg}>{this.state.errMsg}</Text>
      : null

    const signUpForm = this.state.signUpSuccess ?
      null
      :
      <View
        style={{
          alignItems: "center",
        }}>

        <View style={[styles.inputContainer, { marginBottom: 10 }]}>
          <TextInput
            style={styles.inputField}
            value={this.state.displayName}
            onChangeText={(text) => this.setState({ displayName: text })}
            autoCapitalize='words'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            placeholder='Your Name'
            placeholderTextColor='rgba(0,0,0,.6)'
            />
        </View>
        <View style={[styles.inputContainer, { marginBottom: 10 }]}>
          <TextInput
            style={styles.inputField}
            value={this.state.email}
            keyboardType='email-address'
            autoCorrect={false}
            onChangeText={(text) => this.setState({ email: text })}
            underlineColorAndroid='transparent'
            placeholder='Your Email'
            placeholderTextColor='rgba(0,0,0,.6)'
            />
        </View>
        <View style={[styles.inputContainer, { marginBottom: 10 }]}>
          <TextInput
            style={styles.inputField}
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
            underlineColorAndroid='transparent'
            placeholder='Choose Password'
            secureTextEntry={true}
            placeholderTextColor='rgba(0,0,0,.6)'
            />
        </View>
        <View style={[styles.inputContainer, { marginBottom: 10 }]}>
          <TextInput
            style={styles.inputField}
            value={this.state.phone}
            onChangeText={(text) => this.setState({ phone: text })}
            autoCorrect={false}
            keyboardType="numeric"
            underlineColorAndroid='transparent'
            placeholder='phone number'
            placeholderTextColor='rgba(0,0,0,.6)'
            />
        </View>



        <View style={styles.btnContainers}>
          <TouchableOpacity onPress={this._handleSignUp.bind(this)}>
            <View style={styles.submitBtnContainer}>
              <Text style={styles.submitBtn}>{'Let\'s Go'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    return (
      <Animatable.View
        animation={animation}
        style={styles.container}
        onAnimationEnd={this._handleAnimEnd.bind(this)}>
        <Content
          contentContainerStyle={{
            justifyContent: "flex-end",
            alignItems: "center",
            flex: 1
          }}>
          <Text onPress={this._handleGoBack.bind(this)} p>Go back</Text>

          <Text style={styles.title} h1>Sign Up</Text>
          {errorMessage}

          {signUpForm}

        </Content>
      </Animatable.View>
    )
  }

  _handleSignUp() {

    if (!this.state.displayName || !this.state.email || !this.state.password || !this.state.phone) {
      this.setState({ errMsg: 'Please fill out the form correctly' })
      return
    }

    this.setState({ errMsg: 'Signing Up...' })
    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebaseApp.auth().currentUser.updateProfile({
          displayName: this.state.displayName,
        })
          .then(() => {
            const uid = firebaseApp.auth().currentUser.uid
            const name = firebaseApp.auth().currentUser.displayName
            const email = firebaseApp.auth().currentUser.email
            const role = 'user'
            const phone = this.state.phone
            firebaseApp.database().ref('users/' + uid).set({
              name,
              email,
              uid,
              role,
              phone,
            })

            if (this.state.isMounted) this.setState({ errMsg: 'Thank you for signing up, wait for a bit to let us sign in into your account.', signUpSuccess: true })
            setTimeout(() => {
              if (firebaseApp.auth().currentUser) {
                this.props.goToHomeScreen()
              }
            }, 1000)
          })
          .catch((error) => {
            if (this.state.isMounted) this.setState({ errMsg: error.errorMessage })
          })
      })
      .catch((error) => {
        if (this.state.isMounted) this.setState({ errMsg: error.message })
      })
  }

  _handleGoBack() {
    this.setState({ init: false, isMounted: false })
  }

  _handleBackBtnPress() {
    this._handleGoBack()
    return true
  }

  _handleAnimEnd() {
    if (!this.state.init) {
      this.props.onBackFromSignUp()
    }
  }

  _signUpSuccess() {
    this.setState({
      signUpSuccess: true
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    marginBottom: 10,
  },
  errMsg: {
    width: 300,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#ffffff',
    marginBottom: 12,
    fontSize: 18,
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 10
  },
  inputField: {
    width: 320,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#000000'
  },
  btnContainers: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 320
  },
  fogotBtnContainer: {

  },
  forgotBtn: {
    fontSize: 15,
    color: '#000000',
    fontWeight: "bold"

  },
  submitBtnContainer: {
    width: 120,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtn: {
    fontSize: 15,
    color: getColor(),
    fontWeight: "bold"
  }
})
