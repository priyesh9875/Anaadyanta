import React, { Component } from 'react';
import EventDetails from '@components/events/eventDetails';
import {
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
  InteractionManager

} from "react-native";

import Loading from "@components/general/Loading";



class EventDetailsContainer extends Component {
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

      // alert(this.props.allEvents[this.props.eventKey])
    })
  }


  renderView() {
    const { allEvents, eventKey, actions, } = this.props;

  }

  render() {
    const { allEvents, eventKey, actions, currentUser } = this.props;

    return (
      this.state.loading
        ? <Loading />
        : <EventDetails
          eventKey={eventKey}
          eventDetails={allEvents[eventKey]}
          currentUser={currentUser}
          {...actions}
          />
    );
  }
}

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EventActions from "@redux/events/action"

const mapStateToProps = state => ({
  allEvents: state.events.allEvents,
  currentUser: state.currentUser
})
const mapActions = dispatch => ({
  actions: bindActionCreators(EventActions, dispatch)
})

export default connect(mapStateToProps, mapActions)(EventDetailsContainer);


