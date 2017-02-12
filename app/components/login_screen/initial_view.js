import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import { getColor } from '@config/getColor'
import { APP_NAME } from "@config/constants"
import * as Animatable from 'react-native-animatable'
import Text from "@components/general/Text"

export default class InitialView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      init: true,
      signInPressed: false,
      signUpPressed: false
    }
  }

  render() {
    const animation = this.state.init ? 'bounceInUp' : 'bounceOutDown'
    return (
      <Animatable.View
        animation={animation}
        style={styles.container}
        delay={this.props.animDelay}
        onAnimationEnd={this._handleAnimEnd.bind(this)}>

          <Animatable.Image
            animation="bounceInDown"
            duration={3000}
            source={require("@images/logo.png")}
            style={{ height: 150, width: 150, marginTop: 20, paddingBottom: 10, alignSelf: "center", }} />

          <Image source={require("@images/l.png")} style={{ height: 35, width: 295, alignSelf: "center", paddingBottom: 10 }} />
          <Image source={require("@images/date.png")} style={{ height: 20, width: 205, marginLeft: 50, alignSelf: "center", marginTop: 20, marginBottom: 20 }} />

        <View style={styles.btnBox}>
          <TouchableOpacity onPress={this._handleSignInPress.bind(this)}>
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>{'Sign In'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._handleSignUpPress.bind(this)}>
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>{'Sign Up'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    )
  }

  _handleSignInPress() {
    this.setState({ init: false, signInPressed: true })
  }

  _handleSignUpPress() {
    this.setState({ init: false, signUpPressed: true })
  }

  _handleAnimEnd() {
    if (!this.state.init) {
      if (this.state.signInPressed) {
        this.props.onSignIn()
      }
      if (this.state.signUpPressed) {
        this.props.onSignUp()
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  title: {
    marginBottom: 20,
  },
  btnBox: {
    height: 40,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  btnContainer: {
    width: 130,
    height: 40,
    backgroundColor: getColor(),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
  btnText: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "bold"
  }
})
