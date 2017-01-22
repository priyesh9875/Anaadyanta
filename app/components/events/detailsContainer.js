/*
 * This example demonstrates how to use ParallaxScrollView within a ScrollView component.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    InteractionManager,

} from 'react-native';

import { phonecall, text, email } from 'react-native-communications';
import { Card, List, ListItem } from "native-base"
import Loading from "@components/general/Loading";
import Hr from "@libs/Hr";
import IconText from "@components/ui/IconText"
import { Icon, } from "react-native-elements";
import ScrollableTabView from "react-native-scrollable-tab-view";
import moment from "moment"

import AboutTab from "./aboutTab";
import CoordinatorTab from "./coordinatorTab";
import RulesTab from "./rulesTab";


const coordinatorsdata = [
    { name: "Priyesh Kumar", phone: "7795778808" },
    { name: "Priyesh Kumar", phone: "7795778808" },
    { name: "Priyesh Kumar", phone: "7795778808" },
]
const rules = [
    { name: "4 rounds of various challenges" },
    { name: "Two participants per team" },
    { name: "Interaction and communication based tasks" },
    {
        name: "JUDGEMENT CRITERIA", subRules: true, rules: [
            { name: "Number of correct answers" },
            { name: "The performance" },
            { name: "Judges's final decision" }
        ]
    }
]


class DetailsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.renderDetails = this.renderDetails.bind(this);

            this.setState({
                loading: false
            });
        });
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
    }



    renderDetails() {
        return <ScrollableTabView
            style={{ backgroundColor: "white" }} >

            <View tabLabel="About" style={{ padding: 10, flex: 1 }}>
                <AboutTab { ...this.props } />
            </View>

            <View tabLabel="Coordinators" >
                <CoordinatorTab coordinators={this.props.eventDetails.coordinators} />
            </View>
            <View tabLabel="Rules">
                <RulesTab rules={this.props.eventDetails.rules} />
            </View>
        </ScrollableTabView>
    }


    render() {

        return (
            this.state.loading ? <Loading /> : this.renderDetails()

        );

    }
}


export default DetailsContainer