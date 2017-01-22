
import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ListView,
    InteractionManager,
    NetInfo,
    Dimensions

} from 'react-native';

var {height, width} = Dimensions.get('window');
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
import Loading from "@components/general/Loading"
import { H1, Text } from 'native-base';
import { AppColors, AppStyles, AppSizes } from '@theme/';
import IconText from "@components/ui/IconText"
import { Icon } from "react-native-elements"

import moment from "moment"

class allEventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
        };

        this.renderView = this.renderView.bind(this);

    }

    componentDidMount = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                loading: false,
            })

        })

    }
    showDescription(eventDetails) {
        Actions.eventDetails({ title: eventDetails.title, eventKey: eventDetails.euid })
    }

    renderView() {
        const { allEvents, category } = this.props
        return < Swiper style={styles.wrapper} showsButtons={true} loop={false} index={0}>

            {Object.keys(allEvents).map((key) => {
                const val = allEvents[key]
                var infoBox = null;
                if (val.isStarted) {
                    if (val.isEnded) {
                        infoBox = <Text style={{ color: "white", fontSize: 20 }}>Event completed</Text>
                    } else {
                        infoBox = <Text style={{ color: "white", fontSize: 20 }}>Event started</Text>
                    }
                } else {
                    infoBox = <IconText name="timeline" text={moment.unix(val.startTime).format("DD MMM YY hh:mm a")} />
                }
                return <View key={key} style={styles.sceneContainer}>
                    <Image source={{ uri: val.image }} style={{ width, height: height - AppSizes.navbarHeight }} >

                        <H1 style={styles.eventTitle}>{val.title.toUpperCase()}</H1>
                        <Text style={styles.eventDescription} numberOfLines={2}>{val.description || "Beautiful event ".repeat(10)}</Text>
                        <View style={styles.eventInfoBox}>
                            {infoBox}
                        </View>
                        <TouchableOpacity style={styles.slideUpContainer} onPress={this.showDescription.bind(this, val)}>
                            <Icon iconStyle={styles.slideUpArrow} name="keyboard-arrow-up" size={50} color="white" />
                            <Text style={styles.slideUpText}>DETAILS</Text>
                        </TouchableOpacity>
                    </Image>
                </View>
            })
            }

        </Swiper >
    }

    render() {

        return (
            this.state.loading ? <Loading /> : this.renderView()
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "black"
    },

    sceneContainer: {
        flex: 1,
    },
    eventTitle: {
        position: 'absolute',
        bottom: 200,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: "center",
        width
    },
    eventDescription: {
        position: 'absolute',
        fontSize: 18,
        color: "white",
        bottom: 150,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: "center",
        fontWeight: "bold",
        width
    },
    eventInfoBox: {
        position: 'absolute',
        bottom: 100,
        padding: 10,
        alignSelf: "center",
        justifyContent: "space-around",
        flexDirection: 'row',
        width,

    },

    eventLength: {
        fontSize: 18,
        color: "white",
        padding: 10,
        alignSelf: "center",
    },


    eventDate: {
        fontSize: 18,
        color: "white",
        padding: 10,
        alignSelf: "center"
    },
    slideUpContainer: {
        width,
        alignItems: "center",
        bottom: 25,
        position: 'absolute',
    }
    ,
    slideUpArrow: {
        alignSelf: "center",
        color: "white",
        marginBottom: -20,
    },
    slideUpText: {
        width,
        fontSize: 20,
        textAlign: "center",
        color: "white",
        padding: 10,

    },


    picContainer: {
        flex: 1,
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },

})

export default allEventsList;
