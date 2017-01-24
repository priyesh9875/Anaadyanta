import React, { Component } from 'react';
import CoordinatingEventsList from '@components/events/allEventsList';
import {
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
  InteractionManager,
  View,
  Text

} from "react-native";

import Loading from "@components/general/Loading";


class CoordinatingEventsContainer extends Component {
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
    const { coordinatingEvents, actions } = this.props;
    if (Object.keys(coordinatingEvents).length == 0) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'white' }} >
          <Text style={{ fontSize: 30, flex: 1, textAlign: "çenter" }} >Oops, you are not coordinating any events.</Text>
          <Text style={{ fontSize: 20, flex: 1, textAlign: "çenter" }} >Ask admins to assign events</Text>
        </View>
      );
    }
    return (
      <CoordinatingEventsList
        allEvents={coordinatingEvents}
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
  coordinatingEvents: state.events.coordinatingEvents,
})
const mapActions = dispatch => ({
})

export default connect(mapStateToProps, mapActions)(CoordinatingEventsContainer);


