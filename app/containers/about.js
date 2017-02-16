import React, { Component } from 'react';
import { Container, Content, H1, Card, List, ListItem, Thumbnail, } from 'native-base';
import Loading from "@components/general/Loading";
import {
    View,
    InteractionManager,
    UIManager,
    LayoutAnimation,
    TouchableOpacity,
    Image
} from 'react-native';
import { Text } from "@components/ui"
import { Icon } from "react-native-elements"
import * as CONSTANTS from "@config/constants"
const contributors = [
    {
        name: "Priyesh Kumar",
        email: "priyesh9875@gmail.com",
        linkedin: "https://in.linkedin.com/in/priyesh9875",
        github: "https://github.com/priyesh9875",
        type: "Developer, UI, Designer, Tester"
    },
    {
        name: "Raj narayan dutta",
        email: "rxdsrex@gmail.com",
        linkedin: "https://in.linkedin.com/in/rajnarayan-dutta",
        github: "https://github.com/rxdsrex",
        type: "Designer, Tester"
    }


]

import Share, { ShareSheet } from 'react-native-share';
const IconColor = '#4285f4'
import { SocialIcon } from 'react-native-elements'
import { web, email } from "react-native-communications"
import Hr from "@libs/Hr"
import Background from "@components/ui/background"
import * as Animatable from 'react-native-animatable';

class About extends Component {

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
            message: "Check out latest Anaadyanta app on github",
            url: CONSTANTS.GIT_REPO,
            subject: "Anaadyanta 2017" //  for email
        };

        return <View style={{ flex: 1, paddingBottom: 20 }}>
            <Background imgSource={require("@images/launch/underwater2.jpeg")} />

            <Container >
                <Content >

                    <View style={{ paddingBottom: 20 }}>

                        <Animatable.Image
                            animation="bounceInDown"
                            delay={500}
                            // duration={3000}
                            source={require("@images/logo.png")}
                            style={{ height: 150, width: 150, paddingTop: 20, paddingBottom: 10, alignSelf: "center", transform: [{ rotate: "35 deg" }] }} />


                        <Image
                            source={require("@images/l.png")}
                            style={{ flex: 1, height: 40, width: 345, marginLeft: 20 }} />
                        <Image
                            source={require("@images/date.png")}
                            style={{ height: 20, width: 245, marginLeft: 50, alignSelf: "flex-end" }} />

                        <View style={{ flexDirection: 'row', justifyContent: "space-around", padding: 10 }}>
                            <SocialIcon onPress={() => { web(CONSTANTS.FB_LINK) } } type='facebook' size={30} />
                            <SocialIcon onPress={() => { web(CONSTANTS.GIT_REPO) } } type='github' size={30} />
                            <SocialIcon onPress={() => { web(CONSTANTS.WEB_LINK) } } type='twitch' size={30} />

                            <TouchableOpacity
                                onPress={() => {
                                    Share.open(shareOptions);
                                } }>
                                <Icon name="share" size={25} reverse color={IconColor} />
                            </TouchableOpacity>
                        </View>

                        <Text style={{ color: 'black', textAlign: "center", padding: 10 }}>Anaadyanta, the annual techno-cultural festival, a 3 day extravaganza, started in the year 2003 and over the years has been built to a platform which now hosts a national level festival. With over 80 colleges participating since the year 2013, Anaadyanta aims to grow bigger and better with more events, bigger line ups and interesting quirks with every passing year. We aim to bring a smile to your face :)</Text>
                    </View>
                    <Hr lineStyle={{ backgroundColor: "gray", marginBottom: 10 }} />
                    <View style={{ flex: 1, alignItems: "center", padding: 10 }}>
                        <Text h1 style={{ fontWeight: "normal", color: "black" }}>Contact</Text>

                        <Text style={{ color: "black" }}>Nitte Meenakshi Institute of Technology</Text>
                        <Text style={{ color: "black" }}>P.O. Box 6429, Yelahanka, Bangalore 560064</Text>
                        <Text style={{ color: "black" }}>Ph: 080-22167800</Text>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View >

                        <Text h1 style={{ textAlign: "center", fontWeight: "normal", color: "black" }}>Contributors</Text>

                        <List
                            dataArray={contributors}
                            renderRow={(row) => {
                                return <ListItem>

                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: "black" }}>{row.name}</Text>
                                            <Text style={{ fontSize: 12, color: "black" }}>{row.type}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                            <TouchableOpacity onPress={() => { email(row.email, null, null, "Anaadyanta 17", null) } } style={{ paddingLeft: 30 }}  >
                                                <Icon name="email" size={25} color="red" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { web(row.linkedin) } } style={{ paddingLeft: 30 }}  >
                                                <Icon name="linkedin-square" type="font-awesome" size={25} color="blue" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { web(row.github) } } style={{ paddingLeft: 30 }}  >
                                                <Icon name="github-square" type="font-awesome" size={25} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ListItem>
                            } }

                            />
                    </View>

                    <Text h1
                        style={{ textAlign: "center", fontWeight: "normal", color: "black" }}
                        onPress={() => { web(CONSTANTS.GIT_TLICENSE) } }>
                        Third party license
                </Text>

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

export default About;

