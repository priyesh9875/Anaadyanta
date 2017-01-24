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
import IconText from "@components/ui/IconText"
import ScrollableTabView from "react-native-scrollable-tab-view";
import moment from "moment"



class AboutTab extends Component {
    render() {
        let { eventDetails } = this.props

        return (
            <View>
                <ListItem>
                    <Text>
                        {this.props.eventDetails.description || "Please tell me about this event in more precise and accurate english or hindi words Please tell me about this event in more precise and accurate english or hindi words Please tell me about this event in more precise and accurate english or hindi words"}
                    </Text>
                </ListItem>
                <Card style={{ padding: 10 }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1 }} >

                            <IconText text={eventDetails.venue || "Main Ground"} name="place" textStyle={{ fontSize: 15, color: 'black' }} size={25} />
                            <IconText text={"Reg fees: " + eventDetails.registeration} name="money" type="font-awesome" color="green" textStyle={{ fontSize: 15, color: 'black' }} size={25} />
                            {
                                eventDetails.prizes.map(prize => {
                                    return <IconText key={prize.position} text={`Prize ${prize.position}: ${prize.amount}`} name="trophy" type="font-awesome" color="orange" textStyle={{ fontSize: 15, color: 'black' }} size={25} />
                                })
                            }
                        </View>
                        <View style={{ flex: 1 }} >
                            <IconText text={moment.unix(eventDetails.startTime).format("DD MMM YY") || "1 Jan 17"} name="date-range" textStyle={{ fontSize: 15, color: 'black' }} size={25} />
                            <IconText text={moment.unix(eventDetails.startTime).format("hh:mm a") || "9: 00 PM"} name="schedule" color="black" textStyle={{ fontSize: 15, color: 'black' }} size={25} />
                            <IconText text={moment.unix(eventDetails.endTime).format("hh:mm a") || "9: 00 PM"} name="schedule" color="black" textStyle={{ fontSize: 15, color: 'black' }} size={25} />

                            {
                                !eventDetails.isGroup
                                    ? <IconText text="Individual" name="person" textStyle={{ fontSize: 15, color: 'black' }} size={25} />
                                    : <IconText text="Group" name="people" textStyle={{ fontSize: 15, color: 'black' }} size={25} />

                            }


                        </View>
                    </View>
                </Card>
            </View>

        );

    }
}

export default AboutTab