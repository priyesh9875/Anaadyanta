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
import { Card, CardItem, List, ListItem } from "native-base"
import Loading from "@components/general/Loading";
import IconText from "@components/ui/IconText"
import ScrollableTabView from "react-native-scrollable-tab-view";
import moment from "moment"
import { Icon } from "react-native-elements"



class AboutTab extends Component {
    render() {
        let { eventDetails } = this.props

        return (
            <View>
                {
                    this.props.eventDetails.description
                        ? <ListItem>
                            <Text>
                                {this.props.eventDetails.description}
                            </Text>
                        </ListItem>
                        : null
                }

                <Card style={{ padding: 5 }}>
                    <ListItem>
                        <Icon name="place" color="blue" size={35} />
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={{ color: "black" }}>Venue</Text>
                            <Text >{eventDetails.venue ? eventDetails.venue : "Will be updated soon"}</Text>
                        </View>
                    </ListItem>

                    <ListItem>
                        <Icon name="schedule" color="black" size={35} />
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={{ color: "black" }}>Schedule</Text>

                            {
                                eventDetails.startTime && (parseInt(eventDetails.startTime) > 1488911400)
                                    ? <View>
                                        <Text>
                                            {moment.unix(eventDetails.startTime).format("hh:mm a")}
                                            {
                                                eventDetails.endTime && eventDetails.endTime > eventDetails.startTime
                                                    ? moment.unix(eventDetails.endTime).format(" - hh:mm a")
                                                    : null
                                            }
                                            {moment.unix(eventDetails.startTime).format(", ddd DD MMM YYYY")}
                                        </Text>
                                    </View>
                                    : <Text>Will be updated soon</Text>
                            }
                        </View>
                    </ListItem>

                    <ListItem>
                        <Icon name="money" type="font-awesome" color="green" size={35} />
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={{ color: "black" }}>Registration</Text>
                            <Text>{eventDetails.registration ? eventDetails.registration : "FREE"}</Text>
                        </View>
                    </ListItem>

                    <ListItem>
                        <Icon name="trophy" type="font-awesome" color="orange" size={35} />
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={{ color: "black" }}>Prizes</Text>

                            {
                                (eventDetails.prizes && eventDetails.prizes.length > 0)
                                    ? <View>
                                        {
                                            eventDetails.prizes.map(prize => {
                                                return <Text key={prize.position}>{`${prize.position}: ${prize.amount}`}</Text>
                                            })
                                        }
                                    </View>
                                    : <Text>Will be updated soon</Text>
                            }
                        </View>
                    </ListItem>
                </Card>
            </View>

        );

    }
}

export default AboutTab