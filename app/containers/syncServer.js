import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
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
import SyncServerComponent from "@components/SyncServer"
import Background from '@components/ui/background'

const backImages = [
  require("@images/launch/underwater1.jpeg"),
  require("@images/launch/underwater2.jpeg"),
  require("@images/launch/underwater3.png"),
  require("@images/launch/underwater4.jpeg"),
]
class SyncServer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      backPic: backImages[Math.round(Math.random() * (backImages.length - 1))],
      updating: false,
      allEvents: props.allEvents,
      favEvents: props.favEvents
    }

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  componentDidMount() {
  }


  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  render() {
    const { events, actions, currentUser } = this.props

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={getColor('googleBlue700')}
          animated={true}
          />

        <Background imgSource={this.state.backPic} />
        <SyncServerComponent {...actions} currentUser={currentUser} isConnected={true} favEvents={events.favEvents} allEvents={events.allEvents} />
      </View>
    )
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
import * as eventsActions from '@redux/events/action';
import * as feedsActions from '@redux/feeds/action';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  events: state.events,
  currentUser: state.currentUser
})
const mapActions = dispatch => ({
  actions: bindActionCreators(eventsActions, dispatch),
})

export default connect(mapStateToProps, mapActions)(SyncServer);

