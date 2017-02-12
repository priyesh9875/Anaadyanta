import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableWithoutFeedback } from "react-native";
import { Actions } from "react-native-router-flux";

const { width, height } = Dimensions.get('window');
import Swiper from 'react-native-swiper';
import * as Animatable from "react-native-animatable"


const renderPagination = (index, total, context) => {
    return (
        <View style={{
            position: 'absolute',
            bottom: 10,
            right: 10
        }}>
            <Text style={{ color: 'grey' }}>
                <Text style={{
                    color: 'white',
                    fontSize: 20
                }}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}

export default class CarouselView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: { width, height: 330 },
            featuredEvents: []
        };

    }
    componentDidMount() {

        let featuredEvents = []
        Object.keys(this.props.allEvents).map(key => {
            let e = this.props.allEvents[key]
            if (e.isFeatured) {
                featuredEvents.push(e)
            }
        })

        this.setState({
            featuredEvents
        })
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
        this.setState({ size: { width: layout.width, height: 350 } });
    }

    render() {
        if (this.state.featuredEvents.length == 0) return null
        return (
            <Swiper
                height={this.state.size.height}
                renderPagination={renderPagination}
                paginationStyle={{
                    bottom: -23, left: null, right: 10
                }}
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

        );
    }
}
