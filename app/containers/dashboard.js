import React, { Component } from 'react';
import {
  ScrollView,
  View,
  InteractionManager,
  LayoutAnimation,
  UIManager,
  StatusBar,
  TouchableOpacity
} from "react-native";

import { getColor } from '@config/getColor'
import ScrollableTabView from "react-native-scrollable-tab-view";
import Loading from "@components/general/Loading"
import { Actions } from "react-native-router-flux";
import NavTabBar from "@components/dashboard/navTab"
import Home from "@components/dashboard/Home"
import Profile from "@components/dashboard/Profile"
import AddEvent from "@components/dashboard/AddEvent"
import { firebaseApp } from '@config/firebase'
import FCM from 'react-native-fcm';
import Background from '@components/ui/background'

class Dashboard extends Component {
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

      FCM.requestPermissions(); // for iOS
      FCM.getFCMToken().then(token => {
        // console.log(token)
        // eJJKSRD9jKQ:APA91bF_fvHepRruz0Vg3Kc9PPgdOREdnpBIe0L9B-Zk0lkSMAxwZD2Zlx3kimcPRfsflAaFqA3XU1GeAidusWkMYOPt041REaFIuaiaVc-uzmeicllr-sD4rlWXK9bhnQ1zeOIO3SlY
        // Store it  in server if necessary
      });

      this.setState({
        loading: false,
      })
    })
  }

  render() {
    const { currentUser, userActions, eventsCount, sponsorsCount, allEvents } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={getColor('googleBlue700')}
          animated={true}
          />

        <Background imgSource={require("@images/launch/underwater2.jpeg")} />

        <NavTabBar toggleSideMenu={this.props.toggleSideMenu} />
        <Home eventsCount={eventsCount} sponsorsCount={sponsorsCount} allEvents={allEvents} />

      </View>
    );
  }
}

import { bindActionCreators } from 'redux';
import * as userActions from '@redux/user/action';
import { connect } from 'react-redux';
import * as SideMenuActions from '@redux/sidemenu/actions';
import * as EventActions from '@redux/events/action';
const mapStateToProps = state => ({
  currentUser: state.currentUser,
  eventsCount: state.events.eventsCount,
  sponsorsCount: state.sponsors.length,
  allEvents: state.events.allEvents

})
const mapActions = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  toggleSideMenu: bindActionCreators(SideMenuActions.toggle, dispatch),

})

export default connect(mapStateToProps, mapActions)(Dashboard);


