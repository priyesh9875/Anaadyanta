
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
        })

    }
    renderView() {
        const {eventsCount, sponsorsCount } = this.props
        return <Container >
            <Content>


                <View style={styles.aboutContainer} >
                    <Animatable.Text animation="bounceInDown" style={{ fontSize: 45, color: "black", fontWeight: "bold" }} duration={3000} >Anaadyanta 17</Animatable.Text>
                    <Animatable.Text animation="bounceInDown" style={{ marginTop: 20, fontSize: 20, color: "black", fontWeight: "bold" }} delay={500} duration={3000} >9, 10, 11 March 2017</Animatable.Text>
                    <Animatable.Text animation="bounceInDown"
                        style={{ fontSize: 20, color: "black", fontWeight: "bold" }}
                        delay={1000}
                        duration={3000} >DIVE! FEEL & COME ALIVE</Animatable.Text>

                    <Animatable.Text animation="fadeInDown"
                        style={{ marginTop: 20, fontSize: 20, color: "black", textAlign: "center" }}
                        duration={3000} >This Anaadyanta will take you inside the beautiful world of ocean</Animatable.Text>
                </View>


                <CarouselView allEvents={this.props.allEvents} />

                <View style={{ flex: 1, alignItems: "center", padding: 10 }}>

                    <Text style={{ color: "black" }}>Nitte Meenakshi Institute of Technology</Text>
                    <Text style={{ color: "gray", fontSize: 12 }}>P.O. Box 6429, Yelahanka, Bangalore 560064</Text>
                    <Text style={{ color: "gray", fontSize: 12 }}>Ph: 080-22167800</Text>
                    <Text style={{ color: "gray", fontSize: 12 }}>E-mail: admissions@nmit.ac.in, principal@nmit.ac.in</Text>
                </View>
                <View style={{ height: 20 }}></View>

            </Content>
        </Container>
    }


    render() {

        return (
            this.state.loading ? <Loading /> : this.renderView()
        );
    }
}
class Texting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            length: 4
        }
    }

    render() {
        return (
            <View >
            </View>
        )
    }
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
