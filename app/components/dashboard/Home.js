
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
    Animated
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Loading from "@components/general/Loading"
import CarouselView from "@components/dashboard/carouselView"
import { Card, Container, Content } from "native-base"
import { Text } from "@components/ui"
import * as Animatable from 'react-native-animatable';
import { Icon } from "react-native-elements"
import { firebaseApp } from "@config/firebase"
class HomeView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,

        };

    }

    componentDidMount = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                loading: false,
            })

            let listner = firebaseApp.auth().onAuthStateChanged((user) => {
                user.getToken().then((token) => {
                    console.log(token)
                })
                listner()
            }, (err) => {
                console.log(err)
                listner()
            })
        })

    }
    renderView() {
        const {eventsCount, sponsorsCount } = this.props
        return <Container >
            <Content>


                <View style={styles.aboutContainer} >
                    <Animatable.Image
                        animation="bounceInDown"
                        delay={500}
                        duration={3000}
                        source={require("@images/logo.png")}
                        style={{ height: 150, width: 150, paddingTop: 20, paddingBottom: 10, alignSelf: "center", transform: [{ rotate: "35 deg" }] }} />


                    <Image source={require("@images/l.png")} style={{ height: 35 }} />
                    <Image source={require("@images/date.png")} style={{ height: 15, width: 150 }} />
                    <Animatable.Text animation="bounceInUp"
                        style={{ fontSize: 20, color: "white", fontWeight: "bold", paddingBottom: 30, paddingTop: 30 }}
                        delay={1000}
                        duration={3000}
                        >DIVE! FEEL & COME ALIVE</Animatable.Text>
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: "row"
                    }}
                    >
                    <TabText text="Events" name="grid" type="simple-line-icon"  color="white" onPress={() => { Actions.events() } } />

                    <TabText text="Feeds" name="feed" type="simple-line-icon"  color="white" onPress={() => { Actions.feeds() } } />

                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row"
                    }}
                    >

                    <TabText text="Sponsors" name="people" type="simple-line-icon"  color="white" onPress={() => { Actions.sponsors() } } />

                    <TabText text="Find us" name="location-pin" type="simple-line-icon"  color="white" onPress={() => { Actions.locateUs() } } />

                </View>
                <CarouselView allEvents={this.props.allEvents} />
            </Content>
        </Container>
    }


    render() {

        return (
            this.state.loading ? <Loading /> : this.renderView()
        );
    }
}
class TabText extends Component {
    render() {
        return (
            <TouchableOpacity style={{ flex: 1, alignItems: "center", padding: 10, backgroundColor: "rgba(225, 0, 0, 0.2)" }} onPress={this.props.onPress}>
                <Icon name={this.props.name} type={this.props.type} size={this.props.size} color={this.props.color} />
                <Text style={{ fontSize: 20, paddingTop: 5 }}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}
TabText.defaultProps = {
    name: "feed",
    type: "simple-line-icon",
    size: 25,
    text: "Text",
    color: "white",
    onPress: function () { }
}


const styles = StyleSheet.create({



    aboutContainer: {
        alignItems: "center",
        paddingTop: 25,
        padding: 5,
    },
    aboutHeading: {
        color: "black",
    },
    aboutBody: {
        textAlign: "center",
        color: "black"
    },
    featureContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 5
    },
    featureItem: {
        flex: 1,
        borderWidth: 1,
        padding: 5,
        margin: 5,
        elevation: 5
    },
    featureHeading: {
        textAlign: "center",
        fontSize: 25,
        color: "green",
        fontWeight: "bold"
    },
    featureBody: {
        textAlign: "center",
        fontSize: 20,
    },
    updatesContainer: {
        flex: 1,
        borderWidth: 1,
        padding: 5,
    },
    updatesHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    updatesMain: {
        fontSize: 20,
        fontWeight: "bold",
        color: "green"
    },
    updateMore: {
        fontSize: 20,
        fontWeight: "bold"
    }
});


export default HomeView
