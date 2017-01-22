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
        "category": 3,
        "coordinators": [{
            "email": "rxdsrex@gmail.com",
            "name": "RajNarayan Dutta ",
            "phone": "88618496646555",
            "uid": "50OpBWFjWXQmEL85uPT8Se9W1MR2"
        }, {
            "email": "priyesh9875@gmail.com",
            "name": "Priyesh kumarr",
            "phone": "7795778808",
            "uid": "CgojMzKnJGcUw8aDHN2eZwZ2EFY2"
        }],
        "description": "There will be isometric view of a dis-assembled model as well as assembled model is given in a sheet, the participants  need to crate the part and assembles it and take the draft of it with the help of CATIA or PRO-E",
        "endTime": 1488443400,
        "euid": "-Kb22dWX26wSqEQk7c0i",
        "id": 0,
        "image": "http://www.cmw.net.au/images/project/Manufacturing_BluescopeSteel_Web_2.jpg",
        "isEnded": true,
        "isGroup": true,
        "isStarted": true,
        "lastUpdated": 1485076812,
        "length": 2,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }],
        "registeration": 1506,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Time limit : 90 minutes"
            }, {
                "name": "Number of people: Max 2"
            }]
        }, {
            "description": "Judgment is based on the following factors",
            "hasSubItem": true,
            "isHeader": true,
            "name": "Judgement",
            "subContent": [{
                "name": "Mass properties and the accuracy of the individual part models."
            }, {
                "name": "Distance and angle checking of the assembly."
            }, {
                "name": "Exactness of Dimensions."
            }, {
                "name": "Constraints given while assembling."
            }, {
                "name": "Time taken to finish."
            }, {
                "name": "Professional layout and presentation of the assembly drawing on a sheet of paper."
            }]
        }],
        "startTime": 1488436200,
        "title": "Draft it out",
        "updatedBy": "Priyesh kumar",
        "venue": "Back parking",
        isMine: true
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