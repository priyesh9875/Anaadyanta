import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableHighlight } from "react-native";
import { Actions } from "react-native-router-flux";

import Carousel from 'react-native-looped-carousel';

const { width, height } = Dimensions.get('window');
import Swiper from 'react-native-swiper';




export default class CarouselView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: { width, height: 230 },
        };

    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: 230 } });
    }

    render() {
        return (


            <View onLayout={this._onLayoutDidChange}>
                <Swiper
                    autoplay
                    width={this.state.size.width}
                    height={this.state.size.height}
                    showsButtons={true}
                    loop
                    >
                    <Image source={require('@images/banner5.jpg')} style={{ width: null, height: this.state.size.height }} />
                    <Image source={require('@images/banner6.jpg')} style={{ width: null, height: this.state.size.height }} />
                    <Image source={require('@images/banner2.jpg')} style={{ width: null, height: this.state.size.height }} />
                    <Image source={require('@images/banner3.jpg')} style={{ width: null, height: this.state.size.height }} />
                    <Image source={require('@images/banner4.jpg')} style={{ width: null, height: this.state.size.height }} />
                </Swiper>
            </View>

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