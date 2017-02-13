/*
 * This example demonstrates how to use ParallaxScrollView within a ScrollView component.
 */
import React, { Component, PropTypes } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    InteractionManager,
    Alert
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { phonecall, text, email } from 'react-native-communications';
import { Card, List, ListItem } from "native-base"
import Loading from "@components/general/Loading";
import Hr from "@libs/Hr";
import IconText from "@components/ui/IconText"
import { Button, Icon, SocialIcon } from "react-native-elements";
import ScrollableTabView from "react-native-scrollable-tab-view";
import Share, { ShareSheet } from 'react-native-share';
import { Actions } from "react-native-router-flux"
import moment from "moment"
import { firebaseApp } from '@config/firebase'

import ActionTab from "./actionTabs"
import DetailsContainer from "./detailsContainer"

const IconColor = '#4285f4'
const window = Dimensions.get('window');


const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 45;
import CreatePDF from "@components/createPDF";

class EventDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,

        };
        this.renderView = this.renderView.bind(this);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                loading: false
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.loading && nextProps.eventDetails.id) {
            this.setState({
                loading: false
            });
        }
    }

    componentWillUnmount() {
    }



    renderView() {
        const { onScroll = () => { } } = this.props;

        return <View style={styles.container} >
            <ParallaxScrollView
                onScroll={onScroll}
                headerBackgroundColor="#333"
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                backgroundSpeed={10}
                renderBackground={() => (
                    <View key="background" >
                        <Image source={{
                            uri: this.props.eventDetails.image || 'https://www.callofduty.com/content/dam/atvi/callofduty/hub/main-hub/iw-hub/hero/iw-key-art.jpg',
                            width: window.width,
                            height: PARALLAX_HEADER_HEIGHT
                        }} />

                    </View>
                )}
                renderForeground={() => (
                    <View key="parallax-header" style={styles.parallaxHeader}>

                        <Text style={styles.eventHeaderTitle}>
                            {this.props.eventDetails.title}
                        </Text>

                    </View>
                )}
                >

                <ActionTab {...this.props} />

                <DetailsContainer {...this.props} style={{ borderWidth: 2 }} />

            </ParallaxScrollView>
        </View >
    }

    render() {
        return (
            this.state.loading ? <Loading /> : this.renderView()
        );
    }
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 250
    },

    eventHeaderTitle: {
        color: 'white',
        fontSize: 30,
        paddingVertical: 5,
        flexWrap: "wrap",
        paddingLeft: 15,
        paddingRight: 15,
        textAlign: "center"
    },



});


EventDetails.defaultProps = {
    eventDetails: {
        category: 1,
        "description": "Use many fragments of different pictures and put them all together to form one beautiful photomontage.",
        "endTime": 1488443400,
        "image": "https://i.ytimg.com/vi/TRNZzrl9KgE/maxresdefault.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 40000,
            "position": 1
        }, {
            "amount": 10000,
            "position": 2
        }],
        "registeration": 2000,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "It's a team event. Two member team." },
                    { name: "All required materials will be provided." },
                    { name: "Participants are not allowed to use their own materials." },
                    { name: "Time duration is 3 hours." },
                    { name: "Specific instructions regarding the event and theme/ topic will be given on the spot." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Collage",
        "venue": "Back parking",

    }
}
export default EventDetails