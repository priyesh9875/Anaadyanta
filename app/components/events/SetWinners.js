import React, { Component } from 'react'
import {
    InteractionManager,
    UIManager,
    TouchableOpacity,
    LayoutAnimation,
    View
} from 'react-native'
import { Container, Content, H1, H2, H3, Text, Card, CardItem, ListItem, List, InputGroup, Input, Button, Icon, Picker, Item } from 'native-base'
import Loading from "@components/general/Loading";
import { firebaseApp } from '@config/firebase'
import { SNAPSHOT_NULL, alertError } from "@config/errors"
import { Actions } from "react-native-router-flux"
import moment from "moment"
class Winners extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            winners: props.eventDetails.prizes,
            comment: "",
            goBack: false
        }


    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

            this.setState({
                loading: false,

            })
        })
    }

    setWinners() {
        for (let i = 0; i < this.state.winners.length; i++) {
            if (this.state.winners[i].name == "") { alert(`Name/College required" for winner ${i + 1}`); return }
            if (this.state.winners[i].position == "") { alert(`Positoion required" for winner ${i + 1}`); return }
            if (this.state.winners[i].amount == "") { alert(`Prize money required" for winner ${i + 1}`); return }
        }

        this.setState({
            settingWinners: true
        })
        let {currentUser, eventDetails, eventKey } = this.props
        let eventRef = firebaseApp.database().ref('/newEvents/' + eventKey);
        let feedsKey = firebaseApp.database().ref('/feeds/').push().key

        let winners = this.state.winners
        let newFeed = {
            author: currentUser.name,
            time: moment().unix(),
            title: `${eventDetails.title} Winners`,
            image: eventDetails.image,
            to: `/topics/${this.props.eventDetails.title.replace(/[^a-zA-Z0-9-_~%]+/g, '-').toLowerCase()}`,
            extras: []
        }

        winners.map(w => {
            newFeed.extras.push({ name: `${w.name} secured ${w.position}, won Rs ${w.amount}` })
        })

        if (this.state.comment == "") {
            newFeed.description = `Congratulations to all winners of ${eventDetails.title} event.`
        } else {
            newFeed.description = this.state.comment
        }

        eventRef.once('value', (snapshot) => {
            let currentEvent = snapshot.val()
            if (!currentEvent) {
                alertError("Error occured : Code", SNAPSHOT_NULL)
                Actions.pop()
                this.setState({
                    settingWinners: false
                })
                return
            }
            if (currentEvent.winners && currentEvent.winners.length > 1) {
                alert("Winners already updated")
                Actions.pop()
                this.setState({
                    settingWinners: false
                })
                return
            }
            currentEvent.winners = winners
            let updates = {}
            updates['/feeds/' + feedsKey] = newFeed
            updates['/newEvents/' + eventKey] = currentEvent

            firebaseApp.database().ref().update(updates).then(() => {
                currentEvent.isFav = eventDetails.isFav
                currentEvent.isRegistered = eventDetails.isRegistered

                this.props.updateEvent(eventKey, currentEvent)
                alert("Successfully updated")
                Actions.pop()
                this.setState({
                    settingWinners: false
                })

            }).catch((err) => {
                alert(JSON.stringify(err))
                Actions.pop()
                this.setState({
                    settingWinners: false
                })
            })
        })

    }

    onChangeValue(type, value, index) {
        let winners = this.state.winners;


        switch (type) {
            case 'name':
                winners[index].name = value
                break;
            case 'position':
                winners[index].position = value
                break;
            case 'amount':
                winners[index].amount = value
                break;
            case 'college':
                winners[index].college = value
                break;
            default: return
        }

        this.setState(winners)

    }

    renderView() {
        const { eventDetails, currentUser} = this.props


        return <Container>

            <Content>
                <H3 style={{ alignSelf: 'center', padding: 10 }}>{eventDetails.title} Winners</H3>
                {this.state.winners.map((val, index) => {
                    return <Card style={{ padding: 5, margin: 20 }} key={index}>
                        <CardItem>
                            <H3>Winner {index + 1}</H3>
                        </CardItem>
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="Name         " placeholder="Full name (or college)"
                                    value={this.state.winners[index].name}
                                    onChangeText={(text) => {
                                        this.onChangeValue('name', text, index)
                                    } }
                                    />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup disabled>
                                <Input inlineLabel label="Position       "
                                    value={this.state.winners[index].position.toString()}

                                    />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="Prize Money" placeholder="00000"
                                    value={this.state.winners[index].amount.toString()}
                                    onChangeText={(text) => {
                                        this.onChangeValue('amount', text, index)
                                    } }
                                    />
                            </InputGroup>
                        </ListItem>
                    </Card>
                })}

                <Card style={{ padding: 5, margin: 20 }} >
                    <ListItem>
                        <InputGroup >
                            <Input stackedLabel label="Additional comment" placeholder="Type in something about event"
                                value={this.state.comment} onChangeText={(comment) => this.setState({ comment })} />
                        </InputGroup>
                    </ListItem>
                </Card>
                <Card style={{ padding: 5, margin: 20 }}>
                    <Text>Preview</Text>
                    <View>
                        {
                            this.state.winners.map((w, i) => {
                                return <Text key={i}>{w.name} secured {w.position}, won Rs {w.amount}</Text>
                            })
                        }

                        {
                            !this.state.comment
                                ? <Text>Congratulations to all winners of {eventDetails.title}</Text>
                                : <Text>{this.state.comment}</Text>
                        }

                    </View>
                </Card>

                <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, padding: 20 }} onPress={() => { this.setWinners() } }>
                    {this.state.settingWinners ? "Uploading winners" : "Set winners"}
                </Button>

            </Content>
        </Container >

    }
    render() {
        return (
            this.state.loading ? <Loading /> : this.renderView()
        );
    }
}

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setWinners } from '@redux/events/action'

const mapStateToProps = state => ({
})
const mapActions = dispatch => ({
    setWinners: setWinners
})

export default connect(mapStateToProps, mapActions)(Winners);

