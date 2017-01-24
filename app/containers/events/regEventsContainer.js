import React, { Component } from 'react';
import RegEventsList from '@components/events/allEventsList';
import {
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
  InteractionManager,
  View,
  Text

} from "react-native";
import { Actions } from "react-native-router-flux"
import Loading from "@components/general/Loading";


class RegisteredEventsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
    this.renderView = this.renderView.bind(this);

  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

      this.setState({
        loading: false
      })
    })
  }

  renderView() {
    const { actions, registeredEvents } = this.props;
    let events = {};
    Object.keys(registeredEvents).map(key => {
      events[key] = registeredEvents[key]
    })

    if (Object.keys(events).length == 0) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'white' }} >
          <Text style={{ fontSize: 30, flex: 1, textAlign: "çenter" }} >No registered events.</Text>
          <Text style={{ fontSize: 20, flex: 1, textAlign: "çenter" }} onPress={() => { Actions.events() } }>Browse all events</Text>
        </View>
      );
    }

    return (
      <RegEventsList
        allEvents={events}
        {...actions}
        />
    );
  }


  render() {
    return (
      this.state.loading
        ? <Loading />
        : this.renderView()
    );
  }
}

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  registeredEvents: state.events.registeredEvents,
})
const mapActions = dispatch => ({
})

export default connect(mapStateToProps, mapActions)(RegisteredEventsContainer);


