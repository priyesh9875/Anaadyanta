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
            if (this.state.winners[i].college == "") { alert(`College name required" for winner ${i + 1}`); return }
            if (this.state.winners[i].position == "") { alert(`Positoion required" for winner ${i + 1}`); return }
            if (this.state.winners[i].amount == "") { alert(`Prize money required" for winner ${i + 1}`); return }
        }

        this.setState({
            settingWinners: true
        })
        let {currentUser, eventDetails, eventKey } = this.props
        let eventRef = firebaseApp.database().ref('/events/' + eventKey);
        let feedsKey = firebaseApp.database().ref('/feeds/').push().key

        let winners = this.state.winners
        let newFeed = {
            author: currentUser.name,
            time: moment().unix(),
            title: `${eventDetails.title} Winners`,
            image: eventDetails.image,
            type: "winners",
            euid: eventKey
        }

        if (winners[0].name) {
            newFeed.extras = [
                { name: `${winners[0].name} from ${winners[0].college} college secured ${winners[0].position}, won Rs ${winners[0].amount}` },
                { name: `${winners[1].name} from ${winners[1].college} college secured ${winners[1].position}, won Rs ${winners[1].amount}` }
            ]
        } else {
            newFeed.extras = [
                { name: `${winners[0].college} college secured ${winners[0].position}, won Rs ${winners[0].amount}` },
                { name: `${winners[1].college} college secured ${winners[1].position}, won Rs ${winners[1].amount}` }
            ]
        }

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
            updates['/events/' + eventKey] = currentEvent

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
                                <Input inlineLabel label="Name         " placeholder="Full name (optional)"
                                    value={this.state.winners[index].name}
                                    onChangeText={(text) => {
                                        this.onChangeValue('name', text, index)
                                    } }
                                    />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="College        " placeholder="NMIT"
                                    value={this.state.winners[index].college}
                                    onChangeText={(text) => {
                                        this.onChangeValue('college', text, index)
                                    } } />
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
                            <Input stackedLabel label="Comment" placeholder="Type in something about event"
                                value={this.state.comment} onChangeText={(comment) => this.setState({ comment })} />
                        </InputGroup>
                    </ListItem>
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

