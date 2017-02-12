import React, { Component } from 'react';
import { Container, Content, H1, Card, ListItem } from 'native-base';
import Loading from "@components/general/Loading";
import * as CONSTANTS from "@config/constants"
import {
    View,
    InteractionManager,
    UIManager,
    LayoutAnimation,
    TouchableOpacity,
    Image,
    ListView,
    StyleSheet
} from 'react-native';
import { Text } from "@components/ui"

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
let faq = [
    {
        title: "What is Anadyanta",
        description: "I dont know. More at fb.com/Anaadyanta"
    },
    {
        title: "Why registeration for events in app",
        description: "App provides hassle free registeration for all events. You dont have to enter your details again and again.."
    },
    {
        title: "I have registered for an event, how to pay registeration fees?",
        description: "A seperate desk will be there to service participants who registered from app. Your entry ticket will be made ready before hand and you only need to pay registeration fee on event day."
    },

    {
        title: "Cant register for some event(s)",
        description: "Some events are open only for offline registeration. In that case you can visit campus for registeration."
    },
    {
        title: "I am not getting any notification?",
        description: "App will receive notification only when it is in background. When app is in foreground, it will land up in feeds section."
    },
    {
        title: "I am getting wrong notification",
        description: "We use device ID to deliver notification. It might be possible that you have logged in using another account and subscribed in that account. Fix: Go to event and Follow it and then Unfollow it to stop notification"
    },
    {
        title: "I am getting intended notification",
        description: "We use device ID to deliver notification. It might be possible that you have logged in using another account and unsubscribed in that account. Fix: Go to event and unfollow it and then Follow it to stop notification"
    },
    ,
    {
        title: "I am a developer, Can I contribute in app development?",
        description: `We will love to have you. You can check all details at ${CONSTANTS.GIT_CONTRIBUTE}`
    },


]

import Accordion from "react-native-accordion"

class FAQ extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: ds.cloneWithRows(faq)
        }

        this.renderView = this.renderView.bind(this);
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        InteractionManager.runAfterInteractions(this.renderView)
    }

    renderView() {

        this.setState({
            loading: false,
        })
    }

    getMainView() {

        return <View style={{ flex: 1, }}>

            <Container >

                <Content style={{ backgroundColor: "white" }}>
                    <Text h3 style={{ paddingTop: 20, textAlign: "center", fontWeight: "normal", color: "black" }}>Common questions</Text>

                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(row) => <FAQRow row={row} />}
                        />
                </Content>
            </Container >
        </View>
    }

    render() {

        return (
            this.state.loading ? <Loading /> : this.getMainView()
        );
    }
}
class FAQRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.toggle = this.toggle.bind(this)
    }
    toggle() {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        var header = (
            <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "gray", width: 15 }}>{this.state.open ? "-" : "+"} </Text>
                <TouchableOpacity style={{ flex: 1 }} onPress={this.toggle}>
                    <Text style={{ color: "black" }}>{this.props.row.title}</Text>
                </TouchableOpacity >
            </View>
        );

        var content = (
            <View style={{ padding: 5, paddingLeft: 15 }}>
                <Text style={{ color: "black" }}>{this.props.row.description}</Text>
            </View >
        );

        return (
            <View style={{ padding: 10, paddingLeft: 15 }}>
                {header}
                {this.state.open ? content : null}
            </View>
        );
    }
}

export default FAQ;
