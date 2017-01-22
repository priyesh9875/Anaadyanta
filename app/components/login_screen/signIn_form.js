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
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { signIn } from '@redux/user/action'
import { getColor } from '@config/getColor'
import { firebaseApp } from '@config/firebase'
import * as Animatable from 'react-native-animatable'

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
      isMounted: true
    }
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    })
    BackAndroid.addEventListener('backBtnPressed', this.handleBackBtnPress)
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
    const form = <View>
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
        <Text style={styles.title}>Sign In</Text>
        {errorMessage}
        {
          this.state.hideForm
            ? <Text style={styles.successMsg}>Success, please wait a bit</Text>
            : form
        }
      </Animatable.View >
    )
  }

  handleForgotPassword() {
    this.setState({ init: false, forgotPass: true })
  }

  _handleSignIn() {
    this.setState({ errMsg: 'Signing In...' })
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        if (this.state.isMounted) {
          this.setState({  hideForm: true, errMsg: "" })
          this.props.goToHomeScreen()
        }
      })
      .catch((error) => {
        if (this.state.isMounted) this.setState({ errMsg: error.message })
      })
  }

  handleBackBtnPress() {
    this.setState({ init: false, isMounted: false })
  }

  handleBackBtnPress() {
    this.handleBackBtnPress()
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
    paddingBottom: 20
  },
  title: {
    fontSize: 25,
    fontFamily: 'MagmaWave',
    marginBottom: 10,
    color: 'rgba(255,255,255,.8)',
    fontWeight: "bold"
  },
  errMsg: {
    width: 300,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#ffffff',
    marginBottom: 10,
    fontSize: 14,
    fontFamily: 'Roboto-Regular'
  },
  successMsg: {
    width: 300,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#ffffff',
    marginBottom: 10,
    fontSize: 25,
    fontFamily: 'Roboto-Regular'
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
    fontFamily: 'Roboto-Bold',
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
    fontFamily: 'Roboto-Bold',
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
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    color: getColor(),
    fontWeight: "bold"
  }
})
