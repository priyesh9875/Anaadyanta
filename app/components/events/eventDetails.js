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
        "image": "http://www.planwallpaper.com/static/images/high-definition-wallpaper-3-798x350.jpg?1",
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
        // },
        // "-Kb23UNaFRH0Y2oyu6aA" : {
        //   "category" : 1,
        //   "coordinators" : [ {
        //     "email" : "rxdsrex@gmail.com",
        //     "name" : "RajNarayan Dutta ",
        //     "phone" : "88618496646555",
        //     "uid" : "50OpBWFjWXQmEL85uPT8Se9W1MR2"
        //   } ],
        //   "description" : "To dance is to be free. If you can communicate without words, if you can make the crowd go crazy with your moves this is the place to be. This event welcomes colleges to showcase their talent across all styles and genres and captivate the audience!",
        //   "endTime" : 1488443400,
        //   "euid" : "-Kb23UNaFRH0Y2oyu6aA",
        //   "id" : 1,
        //   "image" : "https://i.ytimg.com/vi/iExw1TD317o/maxresdefault.jpg",
        //   "isEnded" : false,
        //   "isGroup" : true,
        //   "isStarted" : false,
        //   "lastUpdated" : 1485036450,
        //   "length" : 2,
        //   "prizes" : [ {
        //     "amount" : 10000,
        //     "position" : 1
        //   }, {
        //     "amount" : 1000,
        //     "position" : 2
        //   } ],
        //   "registeration" : 150000,
        //   "rules" : [ {
        //     "hasSubItem" : true,
        //     "isHeader" : true,
        //     "name" : "Rules",
        //     "subContent" : [ {
        //       "name" : "Time limit : 8+2 minutes"
        //     }, {
        //       "name" : "Number of participants: 12-30"
        //     }, {
        //       "name" : "Non-themed only"
        //     }, {
        //       "name" : "Any dance style canbe performed"
        //     }, {
        //       "name" : "The winners will be decided on the basis of choreography, coordination, costume, presentation."
        //     }, {
        //       "name" : "The team members could be current college students and alumni members."
        //     } ]
        //   }, {
        //     "hasSubItem" : true,
        //     "isHeader" : true,
        //     "name" : "General rules",
        //     "subContent" : [ {
        //       "name" : "Each team member should possess a valid college ID proof."
        //     }, {
        //       "name" : "Each team will be given a time slot to perform which includes the time for stage setup on exceeding which the music will be stopped."
        //     }, {
        //       "name" : "In case of excess registration, an elimination round will be held. This will be intimated to the participants 3 days in advance."
        //     }, {
        //       "name" : "Dangerous props like inflammable or heavy objects are not allowed and no indecent behavior will be tolerated during the performance."
        //     }, {
        //       "name" : "The Participants could use props of their choice, all the props, costumes, music etc should be brought by the participants themselves."
        //     }, {
        //       "name" : "No extra lights or technical help will be provided during the performance. Teams should bring along people to manage sound and light if required."
        //     }, {
        //       "name" : "The team should submit their track in a CD/Flash Drive at least an hour prior to the event."
        //     }, {
        //       "name" : "The judge’s decision shall be final and there shall be no further debate."
        //     } ]
        //   } ],
        //   "startTime" : 1488436200,
        //   "title" : "Choreo night",
        //   "updatedBy" : "Priyesh Kumar"
        // }
    }
}
export default EventDetails