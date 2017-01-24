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

      this.setState({
        loading: false,
      })
    })
  }

  cleanLogout() {
    firebaseApp.auth().signOut()
    this.props.userActions.logout();
    Actions.login({ type: "reset" });
  }


  render() {
    const { currentUser, userActions, eventsCount, sponsorsCount, favEventsCount, registeredEventsCount } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={getColor('googleBlue700')}
          animated={true}
          />


        <ScrollableTabView
          renderTabBar={() => <NavTabBar toggleSideMenu={this.props.toggleSideMenu} />}
          style={{ backgroundColor: "white" }} >
          <ScrollView tabLabel="home">
            <Home eventsCount={eventsCount} sponsorsCount={sponsorsCount} />
          
          </ScrollView>

          <ScrollView tabLabel="person" >
            <Profile currentUser={currentUser} cleanLogout={this.cleanLogout.bind(this)} favEventsCount={favEventsCount} registeredEventsCount={registeredEventsCount} {...userActions} />
          
          </ScrollView>
        </ScrollableTabView>

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
  favEventsCount: state.events.favEventsCount,
  registeredEventsCount: state.events.registeredEventsCount,

})
const mapActions = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  toggleSideMenu: bindActionCreators(SideMenuActions.toggle, dispatch),

})

export default connect(mapStateToProps, mapActions)(Dashboard);

