import React, { Component } from 'react';
import AllEventsList from '@components/events/allEventsList';
import {
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
  InteractionManager,
  View,
  Text

} from "react-native";

import Loading from "@components/general/Loading";


class AllEventsContainer extends Component {
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
    const { allEvents, actions, category } = this.props;
    let events = {};
    if (category) {
      Object.keys(allEvents).map(key => {
        if (allEvents[key].category == category) {
          events[key] = allEvents[key]
        }
      })
    } else {
      events = allEvents
    }

    if(Object.keys(events).length == 0) {
      return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}} >
          <Text style={{fontSize: 30}} >No events</Text>
        </View>
      );
    }
    return (
      <AllEventsList
        allEvents={events}
        {...actions}
        category={category}
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
  allEvents: state.events.allEvents,
})
const mapActions = dispatch => ({
})

export default connect(mapStateToProps, mapActions)(AllEventsContainer);


