import React, { Component } from 'react';
import FavEventsList from '@components/events/allEventsList';
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


class FavEventsContainer extends Component {
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
    const { favEvents, actions } = this.props;
    if (Object.keys(favEvents).length == 0) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'white' }} >
          <Text style={{ fontSize: 30,  textAlign: "center" }} >No registered events.</Text>
          <Text style={{ fontSize: 20 , textAlign: "center"}} onPress={() => { Actions.events() } }>Browse all events</Text>
        </View>
      );
    }
    return (
      <FavEventsList
        allEvents={favEvents}
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
  favEvents: state.events.favEvents,
})
const mapActions = dispatch => ({
})

export default connect(mapStateToProps, mapActions)(FavEventsContainer);


