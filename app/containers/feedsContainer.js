import React, { Component } from 'react';
import { Container, Content, H1, Text, Card } from 'native-base';
import {
    InteractionManager,
    UIManager,
    LayoutAnimation,
} from 'react-native';

import Feeds from "@components/feeds"


class FeedsContainer extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const { feeds, actions} = this.props
        return (
            <Feeds {...actions} feeds={feeds} />
        );
    }
}


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FeedsActions from "@redux/feeds/action";

const mapStateToProps = state => ({
    feeds: state.feeds.feeds
})
const mapActions = dispatch => ({
    actions: bindActionCreators(FeedsActions, dispatch)
})

export default connect(mapStateToProps, mapActions)(FeedsContainer);


