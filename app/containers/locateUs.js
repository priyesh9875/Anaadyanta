import React, { Component } from 'react';
import { Container, Content, H1, Card, List, ListItem, Thumbnail, } from 'native-base';
import Loading from "@components/general/Loading";
import {
    View,
    InteractionManager,
    UIManager,
    LayoutAnimation,
    TouchableOpacity,
    Image,
    Platform,
    Linking
} from 'react-native';
import { Text } from "@components/ui"

import Share, { ShareSheet } from 'react-native-share';
const IconColor = '#4285f4'
import { SocialIcon, Button, Icon } from 'react-native-elements'
import { web, email } from "react-native-communications"
import Hr from "@libs/Hr"


let mapUrl = ""
if (Platform.OS == 'ios') {
    mapUrl = "http://maps.apple.com/?ll=13.128464,77.587308,15"
} else {
    mapUrl = "geo:13.128464,77.587308,15"
}

class LocateUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }

        this.renderView = this.renderView.bind(this);
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        InteractionManager.runAfterInteractions(this.renderView)
    }

    renderView() {

        this.setState({
            loading: false,
        })
    }

    getMainView() {
        let shareOptions = {
            title: "Anaadyanta 2017",
            message: "Check out latest Anaadyanta app on playstore",
            url: "https://goo.gl/FgpmLu",
            subject: "Anaadyanta 2017" //  for email
        };
        return <View style={{ flex: 1, }}>

            <Container >

                <Content >

                    <Image source={require("@images/map.png")} style={{ flex: 1, width: null, height: 350 }} />
                    <Card >
                        <Text h1 style={{ textAlign: "center", fontWeight: "normal", color: "black" }}>Anaadyanta 17</Text>
                        <Button title="Map" icon={{ name: "location-on", size: 30 }} raised buttonStyle={{ backgroundColor: "red", borderRadius: 50 }}
                            onPress={() => {
                                Linking.openURL(mapUrl)
                            } } />

                        <View style={{ flexDirection: 'row', justifyContent: "space-around", padding: 10 }}>
                            <SocialIcon onPress={() => { web("https://www.fb.com/anaadyantanmit/") } } type='facebook' size={30} />
                            <SocialIcon onPress={() => { web("https://github.com/priyesh9875/anaadyanta") } } type='github' size={30} />
                            <SocialIcon onPress={() => { web("https://anaadyanta.org/") } } type='twitch' size={30} />

                            <TouchableOpacity
                                onPress={() => {
                                    Share.open(shareOptions);
                                } }>
                                <Icon name="share" size={25} reverse color={IconColor} />
                            </TouchableOpacity>
                        </View>
                        <Hr />
                        <View style={{ flex: 1, alignItems: "center", padding: 10 }}>

                            <Text style={{ color: "black" }}>Nitte Meenakshi Institute of Technology</Text>
                            <Text style={{ color: "black" }}>P.O. Box 6429, Yelahanka, Bangalore 560064</Text>
                            <Text style={{ color: "black" }}>Ph: 080-22167800</Text>
                            <Text style={{ color: "black" }}>registration@anaadyanta.org</Text>
                            <Text style={{ color: "black" }}>appteam17@anaadyanta.org</Text>
                        </View>
                    </Card>

                </Content>
            </Container >
        </View>
    }

    render() {

        return (
            this.state.loading ? <Loading /> : this.getMainView()
        );
    }
}

export default LocateUs;

