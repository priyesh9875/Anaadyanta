
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
import { H1 } from 'native-base';
import { AppColors, AppStyles, AppSizes } from '@theme/';
import IconText from "@components/ui/IconText"
import { Icon } from "react-native-elements"
import { Text } from "@components/ui"
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

        return <Swiper
            loop={false}
            showsButtons={true}
            loadMinimal
            loadMinimalSize={2}
            >
            {
                Object.keys(allEvents).map((key) => {

                    const val = allEvents[key];
                    var infoBox = null;
                    if (val.isStarted) {
                        if (val.isEnded) {
                            infoBox = <Text h3 >Event completed</Text>
                        } else {
                            infoBox = <Text h3 >Event started</Text>
                        }
                    } else {
                        infoBox = <IconText name="timeline" text={moment.unix(val.startTime).format("DD MMM YY hh:mm a")} />
                    }
                    return <Image key={key} source={{ uri: val.image }} style={styles.wrapper} >
                        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }} >
                            <Text h1 >{val.title.toUpperCase()}</Text>
                            <Text p numberOfLines={2} style={styles.description}>{val.description || "Beautiful event ".repeat(10)}</Text>
                            <View style={styles.eventInfoBox}>
                                {infoBox}
                            </View>
                            <TouchableOpacity style={styles.slideUpContainer} onPress={this.showDescription.bind(this, val)}>
                                <Icon iconStyle={styles.slideUpArrow} name="keyboard-arrow-up" size={50} color="white" />
                                <Text p style={styles.slideUpText}>DETAILS</Text>
                            </TouchableOpacity>

                        </View>
                    </Image>

                })
            }

        </Swiper>


    }

    render() {

        return (
            this.state.loading ? <Loading /> : this.renderView()
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width, 
        height: height - AppSizes.navbarHeight
    },

    description: {
        padding: 5,
        textAlign: "center"
    },
    eventInfoBox: {
        padding: 10,
        justifyContent: "space-around",
        flexDirection: 'row',
    },
    slideUpArrow: {
        marginBottom: -20,
    },
    slideUpText: {
        padding: 10,
    },

})

export default allEventsList;
