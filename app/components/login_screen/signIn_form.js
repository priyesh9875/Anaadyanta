import React, { Component } from 'react'
import {
  View,
  TextInput,
  BackAndroid,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { signIn } from '@redux/user/action'
import { getColor } from '@config/getColor'
import { firebaseApp } from '@config/firebase'
import * as Animatable from 'react-native-animatable'
import { Text } from "@components/ui"
import { Container, Content } from "native-base"

class SignInForm extends Component {
  constructor(props) {
    super(props)

    this.handleBackBtnPress = this.handleBackBtnPress.bind(this)

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    this.state = {
      init: true,
      errMsg: null,
      forgotPass: false,
      email: '',
      password: '',
      hideForm: false,
      isMounted: true,
      emailVerified: true,
      user: null
    }
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    })
    BackAndroid.addEventListener('backBtnPressed', this.handleBackBtnPress)
    this.sendEmailVerificationLink = this.sendEmailVerificationLink.bind(this)
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backBtnPressed', this.handleBackBtnPress)
  }

  render() {
    const animation = this.state.init ? 'bounceInUp' : 'bounceOutDown'
    const errorMessage = this.state.errMsg ? <Text style={styles.errMsg}>{this.state.errMsg}</Text> : null
    const form = <View style={{ alignItems: "center", }}>
      <View style={[styles.inputContainer, { marginBottom: 10 }]}>
        <TextInput
          style={styles.inputField}
          underlineColorAndroid='transparent'
          placeholder='Email'
          keyboardType='email-address'
          placeholderTextColor='rgba(0,0,0,.6)'
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
          />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          underlineColorAndroid='transparent'
          placeholder='Password'
          secureTextEntry={true}
          placeholderTextColor='rgba(0,0,0,.6)'
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
          />
      </View>
      <View style={styles.btnContainers}>
        <TouchableOpacity onPress={this.handleForgotPassword.bind(this)}>
          <View style={styles.forgotPass}>
            <Text style={styles.forgotBtn}>{'Forgot Password?'.toUpperCase()}</Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity onPress={this._handleSignIn.bind(this)}>
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
          <Text p onPress={this.handleBackBtnPress} style={{ textAlign: 'center' }}>Go back</Text>

          <Text style={styles.title} h1>Sign In</Text>
          {errorMessage}

          {
            this.state.hideForm
              ? this.state.emailVerified
                ? < Text style={[styles.successMsg, { color: "black" }]} >Success, please wait a bit</Text>
                : <View style={styles.successMsg}>
                  < Text style={{ color: "black" }}>
                    You need to verify your account.</Text>
                  <TouchableOpacity onPress={this.sendEmailVerificationLink}>
                    <Text style={{ color: "blue" }} >Click here to send verification link again</Text>
                  </TouchableOpacity>
                </View>
              : form
          }
        </Content>
      </Animatable.View >

    )
  }

  sendEmailVerificationLink() {
    this.state.user.sendEmailVerification()
      .then(() => {
        alert("Email sent. Check your inbox/spam")

      }).catch(err => {
        alert("Error in sending verification email. Please try again later or contact appteam17@anaadyanta.org")
      })
  }

  handleForgotPassword() {
    this.setState({ init: false, forgotPass: true })
  }

  _handleSignIn() {
    this.setState({ errMsg: 'Signing In...' })
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        if (user) {
          if (user.emailVerified) {
            if (this.state.isMounted) {
              this.setState({ hideForm: true, errMsg: "" })
              this.props.goToHomeScreen()
            }
          } else {
            this.setState({
              hideForm: true,
              emailVerified: false,
              user,
              errMsg: ""
            })
          }
        } else {
          alert("An unknow error occured. Please try again later")
        }
      })
      .catch((error) => {
        if (this.state.isMounted) this.setState({ errMsg: error.message })
      })
  }

  handleBackBtnPress() {
    this.setState({ init: false, isMounted: false })
    return true
  }

  _handleAnimEnd() {
    if (this.state.forgotPass) {
      this.props.onForgotPass()
    } else if (!this.state.init) {
      this.props.onBackFromSignIn()
    }
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, {})(SignInForm)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    paddingBottom: 10,
  },
  errMsg: {
    marginBottom: 20,
    textAlign: "center"

  },
  successMsg: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
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
    color: '#000000',

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
