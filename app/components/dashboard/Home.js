
import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ListView,
    InteractionManager,
    Text
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Loading from "@components/general/Loading"
import CarouselView from "@components/dashboard/carouselView"
import { Card,} from "native-base"
class HomeView extends Component {
    static componentName = 'AppLaunch';
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
        return <ScrollView style={styles.container}>
            <CarouselView />
            <View style={styles.aboutContainer} >
                <Text style={styles.aboutHeading}>Anaadyanta 17</Text>
                <Text >2, 3, 4 March 2017</Text>
                <Text style={styles.aboutBody}>This Anaadyanta will take you inside the beautiful world of ocean. Welcome underwater</Text>
            </View>
            <Card style={{ margin: 10, padding: 20, }}>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>
                    In this Anaadyanta

                    <Text style={{ fontSize: 30, color: "orange", fontWeight: "bold" }} > 10 million  </Text>

                    worth of prizes to be won in
                    <Text style={{ fontSize: 30, color: "green", fontWeight: "bold" }} onPress={() => { Actions.events() } }> {eventsCount} events </Text>
                    in
                    <Text style={{ fontSize: 20, color: "#4285f4", fontWeight: "bold" }} onPress={() => { Actions.schedule() } }> 3 days</Text> sponsored by
                    <Text style={{ fontSize: 24, color: "#4285f4", fontWeight: "bold" }} onPress={() => { Actions.sponsors() } }> 11</Text> organizations
                </Text>
            </Card>

            <Card>

                <View style={{ flex: 1, alignItems: "center", padding: 10 }}>

                    <Text>Nitte Meenakshi Institute of Technology</Text>
                    <Text>P.O. Box 6429, Yelahanka, Bangalore 560064</Text>
                    <Text>Ph: 080-22167800</Text>
                    <Text>E-mail: admissions@nmit.ac.in, principal@nmit.ac.in</Text>
                </View>
                <View style={{ height: 20 }}></View>

            </Card>
        </ScrollView>
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
        backgroundColor: "white",
        paddingBottom: 20
    },
    aboutContainer: {
        alignItems: "center",
        paddingTop: 25,
        padding: 5
    },
    aboutHeading: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
        fontFamily: 'monospace'

    },
    aboutBody: {
        fontSize: 16,
        textAlign: "center"
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
