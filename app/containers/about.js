import React, { Component } from 'react';
import { Container, Content, H1, Text, Card, List, ListItem, Thumbnail, } from 'native-base';
import Loading from "@components/general/Loading";
import {
    View,
    Image,
    StyleSheet,
    InteractionManager,
    UIManager,
    LayoutAnimation,
    TouchableOpacity
} from 'react-native';

import { Icon } from "react-native-elements"
const styles = StyleSheet.create({

});

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
            message: "Check out latest Anaadyanta app on play store",
            url: "http://github.com/priyesh9875/",
            subject: "Anaadyanta 2017" //  for email
        };

        return <Container style={{ backgroundColor: "white" }}>
            <Content style={{ padding: 15 }}>
                <View style={{ paddingBottom: 20 }}>
                    <H1 style={{ textAlign: "center" }}>Anaadyanta</H1>
                    
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

                    <Text style={{ color: 'black', textAlign: "center" }}>Is an cultural techincal sports fest of nmitIs an cultural techincal sports fest of nmitIs an cultural techincal sports fest of nmitIs an cultural techincal sports fest of nmitIs an cultural techincal sports fest of nmitIs an cultural techincal sports fest of nmit Is an cultural techincal sports fest of nmit</Text>
                </View>


                <View style={{ flex: 1, alignItems: "center" }}>
                    <H1 style={{ textAlign: "center", marginBottom: 10 }}>Contact</H1>

                    <Text>Nitte Meenakshi Institute of Technology</Text>
                    <Text>P.O. Box 6429, Yelahanka, Bangalore 560064</Text>
                    <Text>Ph: 080-22167800</Text>
                    <Text>E-mail: admissions@nmit.ac.in, principal@nmit.ac.in</Text>
                </View>
                <View style={{ height: 20 }}></View>
                <View >
                    <H1 style={{ textAlign: "center", marginBottom: 10 }}>Contributors</H1>

                    <List
                        dataArray={contributors}
                        renderRow={(row) => {
                            return <ListItem>

                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 15 }}>{row.name}</Text>
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

                <H1 style={{ textAlign: "center", margin: 10, paddingBottom: 30 }}>Third party license</H1>

            </Content>
        </Container >
    }

    render() {

        return (
            this.state.loading ? <Loading /> : this.getMainView()
        );
    }
}

class Section extends Component {
    constructor(props) {
        super(props)
    }
}
export default About;

