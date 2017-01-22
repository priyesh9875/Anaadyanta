/**
 * this is the forgot password form of the login screen
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  BackAndroid,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet
} from 'react-native'
import { getColor } from '@config/getColor'
import * as Animatable from 'react-native-animatable'
import { firebaseApp } from '@config/firebase'

export default class ForgotPassForm extends Component {
  constructor(props) {
    super(props)

    this._handleBackBtnPress = this._handleBackBtnPress.bind(this)

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    this.state = {
      init: true,
      errMsg: null,
      email: '',
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

    return (
      <Animatable.View
        animation={animation}
        style={styles.container}
        onAnimationEnd={this._handleAnimEnd.bind(this)}>
        <Text style={styles.title}>Forgot Password</Text>
        {errorMessage}
        <View style={[styles.inputContainer, { marginBottom: 10 }]}>
          <TextInput
            style={styles.inputField}
            underlineColorAndroid='transparent'
            placeholder='Enter Your Email'
            placeholderTextColor='rgba(0,0,0,.6)'
            onChangeText={(text) => this.setState({ email: text })}
            />
        </View>
        <View style={styles.btnContainers}>
          <TouchableOpacity onPress={this._handleForgotPass.bind(this)}>
            <View style={styles.submitBtnContainer}>
              <Text style={styles.submitBtn}>{'Recover My Password'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    )
  }

  _handleForgotPass() {
    this.setState({ errMsg: 'Please Wait...' })

    firebaseApp.auth().sendPasswordResetEmail(this.state.email).then(() => {
      if (this.state.isMounted) this.setState({ errMsg: 'An email has been sent!' })
    }).catch((error) => {
      if (this.state.isMounted) this.setState({ errMsg: error.message })
    })
    // alert("Placeholder")
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
      this.props.onBackFromForgotPass()
    }
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
    fontSize: 20,
    fontFamily: 'MagmaWave',
    marginBottom: 10,
    color: 'rgba(255,255,255,.8)',
    fontWeight: "bold"

  },
  errMsg: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    textAlign: 'center'
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,.6)',
    borderRadius: 5
  },
  inputField: {
    width: 320,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Roboto-Bold',
    color: '#000000'
  },
  btnContainers: {
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 280
  },
  submitBtnContainer: {
    width: 240,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtn: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: getColor(),
    fontWeight: "bold"
  }
})
