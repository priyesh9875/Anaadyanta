import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableWithoutFeedback } from "react-native";
import { Actions } from "react-native-router-flux";

const { width, height } = Dimensions.get('window');
import Swiper from 'react-native-swiper';
import * as Animatable from "react-native-animatable"

export default class CarouselView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: { width, height: 330 },
            featuredEvents: []
        };

    }

    componentWillReceiveProps(nextProps) {
        let featuredEvents = []
        Object.keys(nextProps.allEvents).map(key => {
            let e = nextProps.allEvents[key]
            if (e.isFeatured) {
                featuredEvents.push(e)
            }
        })

        this.setState({
            featuredEvents
        })
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: 330 } });
    }

    render() {
        return (


            <Animatable.View
                onLayout={this._onLayoutDidChange}
                style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
                animation="bounceInUp"
                duration={3000}
                >
                <Swiper
                    width={330}
                    height={this.state.size.height}
                    style={{ overflow: 'visible', width: 300, }}
                    >

                    {
                        this.state.featuredEvents.map(e => {
                            return <TouchableWithoutFeedback
                                key={e.euid}
                                onPress={() => { Actions.eventDetails({ eventKey: e.euid, title: e.title }) } }
                                >
                                <Image
                                    source={{ uri: e.image }} style={{ width: null, height: this.state.size.height }}

                                    />
                            </TouchableWithoutFeedback>
                        })
                    }


                </Swiper>
            </Animatable.View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 55
    },
    cardViewFavIcon: {
        width: 20,
        height: 20
    },
    cardCarouselContainer: {
        flex: 1,
        borderWidth: 1,
    },
    cardCarouselTitleContainer: {
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 5
    },
    cardCarouselTitle: {
        alignItems: "flex-start",
        fontSize: 18,
        fontFamily: "Cochin",
        fontWeight: "bold",
    },
    cardCarouselMore: {
        fontSize: 17,
        alignItems: "flex-end",
        color: "green",
        fontFamily: 'Cochin',
        fontWeight: "bold"
    },
    carousel: {
        flex: 1
    },
    welcome: {
        fontSize: 20,
        margin: 10,
        color: '#ff0000',
    },
    backdrop: {
        width: 320,
        height: 120
    },
    backdropView: {
        height: 120,
        width: 320,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    headline: {
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white'
    }
});