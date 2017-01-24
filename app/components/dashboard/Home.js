
import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ListView,
    InteractionManager,
    NetInfo
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Loading from "@components/general/Loading"
import CarouselView from "@components/dashboard/carouselView"
import { Card, Container, Content } from "native-base"
import { Text } from "@components/ui"

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

                <CarouselView />

                <View style={styles.aboutContainer} >
                    <Text style={styles.aboutHeading} h1>Anaadyanta 17</Text>
                    <Text style={{color: "gray", fontSize: 14 }}>9, 10, 11 March 2017</Text>
                    <Text style={styles.aboutBody} p>This Anaadyanta will take you inside the beautiful world of ocean</Text>
                    <Text style={{color: "#4285f4"}} p>DIVE! FEEL & COME ALIVE</Text>
                </View>

                <Card style={{ margin: 5, padding: 5, }}>
                    <Text style={{ fontSize: 16, textAlign: 'center', color:"black" }}>
                        In this Anaadyanta

                    <Text style={{ color: "orange", fontWeight: "bold" }} h3> 10 million  </Text>

                        worth of prizes to be won in  
                    <Text style={{  color: "green", fontWeight: "bold" }} h3 onPress={() => { Actions.events() } }>{eventsCount} events </Text>
                        in  
                    <Text style={{  color: "#4285f4", fontWeight: "bold" }}h4 onPress={() => { Actions.schedule() } }> 3 days </Text> sponsored by
                    <Text style={{  color: "#4285f4", fontWeight: "bold" }}h4 onPress={() => { Actions.sponsors() } }> 11 </Text> organizations
                </Text>
                </Card>

                <Card>

                    <View style={{ flex: 1, alignItems: "center", padding: 10 }}>

                        <Text style={{color: "black"}}>Nitte Meenakshi Institute of Technology</Text>
                        <Text style={{color: "gray", fontSize: 12}}>P.O. Box 6429, Yelahanka, Bangalore 560064</Text>
                        <Text style={{color: "gray", fontSize: 12}}>Ph: 080-22167800</Text>
                        <Text style={{color: "gray", fontSize: 12}}>E-mail: admissions@nmit.ac.in, principal@nmit.ac.in</Text>
                    </View>
                    <View style={{ height: 20 }}></View>

                </Card>
            </Content>
        </Container>
    }



    render() {

        return (
            this.state.loading ? <Loading /> : this.renderView()
        );
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
