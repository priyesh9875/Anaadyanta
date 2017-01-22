import React, { Component } from 'react'
import {
    InteractionManager,
    UIManager,
    TouchableOpacity,
    LayoutAnimation,
    View,
    StyleSheet,
    TextInput
} from 'react-native'

import { Container, Content, H3, Text, Card, ListItem, Button } from 'native-base'
import Loading from "@components/general/Loading";
import { firebaseApp } from '@config/firebase'
import { SNAPSHOT_NULL, alertError } from "@config/errors"
import { Actions } from "react-native-router-flux"
import moment from "moment"

class MakeAnnoucement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            title: "",
            description: "",
            annoucing: false,
            announced: false
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            this.postAnnounce = this.postAnnounce.bind(this)
            this.setState({
                loading: false,
            })
        })
    }

    postAnnounce() {
        let {  currentUser } = this.props;
        this.props.userActions.saveUserDb({ "ann": "asdasds" });
        return
        if (this.state.title == "") { alert("Title cannot be left blank"); return }
        if (this.state.description == "") { alert("Description cannot be left blank"); return }


        this.setState({
            annoucing: true
        })


        let feedsKey = firebaseApp.database().ref('/feeds/').push().key
        let newFeed = {
            author: currentUser.name,
            time: moment().unix(),
            title: this.state.title,
            image: "http://wfarm3.dataknet.com/static/resources/icons/set108/8ef19fce.png",
            description: this.state.description,
            type: "annoucement",
        }

        let updates = {}
        updates['/feeds/' + feedsKey] = newFeed

        firebaseApp.database().ref().update(updates).then(() => {

            this.setState({
                announced: true,
                annoucing: false
            })

        }).catch((err) => {
            alert(JSON.stringify(err))
            this.setState({
                annoucing: false
            })

        })
    }

    renderView() {

        if (this.state.announced) {
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button onPress={() => { Actions.pop() } } style={{ alignSelf: "center" }} >
                    Successfully announced. Go Back
                </Button>

            </View>
        }

        return <Container>
            <Content >


                <Card style={{ padding: 5, margin: 20, marginTop: 30 }} >

                    <ListItem style={{ margin: 5, }}>
                        <View >
                            <Text style={{ color: 'gray', fontSize: 16, marginBottom: 5 }}>Title</Text>
                            <TextInput
                                style={{ flex: 1, borderRadius: 5, borderWidth: 1, padding: 5, margin: 0, borderColor: 'gray' }}
                                underlineColorAndroid='rgba(0,0,0,0)'

                                value={this.state.title} onChangeText={(title) => this.setState({ title })}
                                placeholder="Enter title" />
                        </View>
                    </ListItem>

                    <ListItem style={{ margin: 5, }}>
                        <View >
                            <Text style={{ color: 'gray', fontSize: 16, marginBottom: 5 }}>Description</Text>
                            <TextInput
                                multiline={true}
                                style={{ height: 200, flex: 1, borderRadius: 5, borderWidth: 1, padding: 5, margin: 0, borderColor: 'gray' }}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                value={this.state.description}
                                onChangeText={(description) => this.setState({ description })}
                                />
                        </View>
                    </ListItem>

                    <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, padding: 20 }}
                        onPress={this.postAnnounce}>
                        {this.state.annoucing ? "Please wait " : "Annouce"}
                    </Button>
                </Card>


            </Content >
        </Container >

    }
    render() {
        return (
            this.state.loading ? <Loading /> : this.renderView()
        );
    }
}


class InlineText extends Component {
    render() {
        return <View style={{ flex: 1, flexDirection: 'row', height: 40 }}>
            <Text style={styles.label}>{this.props.label}</Text>
            <TextInput
                style={styles.input}
                value={this.props.value}
                onChangeText={(text) => { this.props.onValueChange(text) } }
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder={this.props.placeholder}
                />
        </View>
    }
}


let styles = StyleSheet.create({
    label: {
        color: 'gray',
        fontSize: 16,
        paddingTop: 7,
        width: 120
    },
    input: {
        height: 40,
        flex: 1,
        fontSize: 16,


    }
})

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from "@redux/user/action"
const mapStateToProps = state => ({
    currentUser: state.currentUser
})
const mapActions = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapActions)(MakeAnnoucement);

