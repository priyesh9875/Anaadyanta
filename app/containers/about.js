import React, { Component } from 'react';
import { Container, Content, H1, Card, List, ListItem, Thumbnail, } from 'native-base';
import Loading from "@components/general/Loading";
import {
    View,
    InteractionManager,
    UIManager,
    LayoutAnimation,
    TouchableOpacity
} from 'react-native';
import { Text } from "@components/ui"
import { Icon } from "react-native-elements"

const contributors = [
    {
        name: "Priyesh Kumar",
        phone: "+91XXXXXXXXXX",
        email: "XXXXXXXX@gmail.com",
        linkedin: "",
        github: "https://github.com/priyesh9875",
        type: "Developer, UI, Designer, Tester"
    },
    {
        name: "Sarang",
        phone: "+91XXXXXXXXXX",
        email: "sarang@gmail.com",
        linkedin: "",
        github: "https://github.com/priyesh9875",
        type: "UI"
    },
    {
        name: "rajNarayan",
        phone: "+91XXXXXXXXXX",
        email: "rxdsrex@gmail.com",
        linkedin: "",
        github: "https://github.com/priyesh9875",
        type: "Designer"
    },
    {
        name: "Nitin kumar thawait",
        phone: "+91XXXXXXXXXX",
        email: "nitinthawait@gmail.com",
        linkedin: "",
        github: "https://github.com/priyesh9875",
        type: "Tester(IOS)"
    },



]

import Share, { ShareSheet } from 'react-native-share';
const IconColor = '#4285f4'
import { SocialIcon } from 'react-native-elements'
import { web, email } from "react-native-communications"
import Hr from "@libs/Hr"
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
            url: "http://github.com/priyesh9875/",
            subject: "Anaadyanta 2017" //  for email
        };

        return <Container style={{ backgroundColor: "white" }}>
            <Content style={{ padding: 15 }}>
                <View style={{ paddingBottom: 20 }}>
                    <Text h1 style={{ textAlign: "center", fontWeight: "normal", color: "black" }}>Anaadyanta</Text>

                    <View style={{ flexDirection: 'row', justifyContent: "space-around", padding: 10 }}>
                        <SocialIcon onPress={() => { web("https://www.fb.com/anaadyantanmit/") } } type='facebook' size={30} />
                        <SocialIcon onPress={() => { web("https://github.com/priyesh9875") } } type='github' size={30} />
                        <SocialIcon onPress={() => { web("http://anaadyanta.org/") } } type='twitch' size={30} />

                        <TouchableOpacity
                            onPress={() => {
                                Share.open(shareOptions);
                            } }>
                            <Icon name="share" size={25} reverse color={IconColor} />
                        </TouchableOpacity>
                    </View>

                    <Text style={{ color: 'black', textAlign: "center" }}>Anaadyanta, the annual techno-cultural festival, a 3 day extravaganza, started in the year 2003 and over the years has been built to a platform which now hosts a national level festival. With over 80 colleges participating since the year 2013, Anaadyanta aims to grow bigger and better with more events, bigger line ups and interesting quirks with every passing year. We aim to bring a smile to your face :)</Text>
                </View>
                <Hr lineStyle={{backgroundColor: "gray", marginBottom: 10}}/>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text h1 style={{ fontWeight: "normal", color: "black" }}>Contact</Text>

                    <Text style={{ color: "black" }}>Nitte Meenakshi Institute of Technology</Text>
                    <Text style={{ color: "gray" }}>P.O. Box 6429, Yelahanka, Bangalore 560064</Text>
                    <Text style={{ color: "gray" }}>Ph: 080-22167800</Text>
                    <Text style={{ color: "gray" }}>Email: principal@nmit.ac.in</Text>
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
                                        <Text style={{ fontSize: 12, color: "gray" }}>{row.type}</Text>
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
                    onPress={() => { web("https://github.com/priyesh9875/Anaadyanta/blob/master/THIRD_PARTY_LICENSE.md") } }>
                    Third party license
                </Text>

            </Content>
        </Container >
    }

    render() {

        return (
            this.state.loading ? <Loading /> : this.getMainView()
        );
    }
}

export default About;

