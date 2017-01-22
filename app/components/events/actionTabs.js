import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    InteractionManager,
    Alert,
} from 'react-native';

import { Card, ListItem } from "native-base"
import Loading from "@components/general/Loading";
import { Icon } from "react-native-elements";
import Share, { ShareSheet } from 'react-native-share';
import { Actions } from "react-native-router-flux"
import moment from "moment"
import { firebaseApp } from '@config/firebase'
import { SNAPSHOT_NULL, alertError } from "@config/errors"
const IconColor = '#4285f4'
import IconText from "@components/ui/IconText"
import CreatePDF from "@components/createPDF";


class ActionTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            addingFav: false,
            registering: false,
            startEndEvent: false,
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {

            this.renderActionIcons = this.renderActionIcons.bind(this)
            this.addToFav = this.addToFav.bind(this)
            this.deleteFav = this.deleteFav.bind(this)
            this.startEvent = this.startEvent.bind(this)
            this.endEvent = this.endEvent.bind(this)
            this.registerForEvent = this.registerForEvent.bind(this)

            this.renderActionIcons = this.renderActionIcons.bind(this)
            this.renderEventControlButton = this.renderEventControlButton.bind(this)
            this.renderFollowButton = this.renderFollowButton.bind(this)
            this.renderRegisterButton = this.renderRegisterButton.bind(this)

            this.setState({
                loading: false
            });
        });
    }

    deleteFav(eventKey) {
        this.setState({
            addingFav: true
        })
        const uid = this.props.currentUser.uid
        firebaseApp.database().ref('/users/' + uid + '/favEvents/').orderByValue().equalTo(eventKey).once('value', (snapshot) => {
            if (!snapshot.val()) {
                this.props.deleteFav(eventKey)
            } else {
                Object.keys(snapshot.val()).map(key => {
                    firebaseApp.database().ref('/users/' + uid + '/favEvents/' + key).remove()
                    this.props.deleteFav(eventKey)
                })
            }
            this.setState({
                addingFav: false
            })
        }).catch((err) => {
            alert(JSON.stringify(err))
            this.setState({
                addingFav: false
            })
        })
    }

    addToFav(eventKey) {
        this.setState({
            addingFav: true
        })
        const uid = this.props.currentUser.uid;
        const newPostKey = firebaseApp.database().ref('/users/' + uid).child('/favEvents/').push().key
        let updates = {}
        updates['/users/' + uid + '/favEvents/' + newPostKey] = eventKey
        firebaseApp.database().ref().update(updates).then(() => {
            this.props.markFav(eventKey)
            this.setState({
                addingFav: false
            })
        })

    }


    startEvent(eventDetails, eventKey) {
        this.setState({
            startEndEvent: true
        })

        let eventRef = firebaseApp.database().ref('/events/' + eventKey);
        let feedsKey = firebaseApp.database().ref('/feeds/').push().key
        let newFeed = {
            author: this.props.currentUser.name,
            time: moment().unix(),
            title: `${eventDetails.title} has started`,
            image: eventDetails.image,
            description: `${eventDetails.title} has been started. All the best to all participants`,
            type: "eventUpdate",
            euid: eventKey
        }

        let {currentUser } = this.props
        eventRef.once('value', (snapshot) => {
            let currentEvent = snapshot.val()
            if (!currentEvent) {
                alertError("Error occured: Code", SNAPSHOT_NULL)
                this.setState({
                    startEndEvent: false
                })
                return
            }

            if (currentEvent.isStarted) {
                alert("Event already started by " + currentEvent.updatedBy)
                this.props.updateEvent(eventKey, currentEvent)
                this.setState({
                    startEndEvent: false
                })
            } else {
                currentEvent.lastUpdated = moment().unix()
                currentEvent.updatedBy = currentUser.name
                currentEvent.isStarted = true

                let updates = {}
                updates['/feeds/' + feedsKey] = newFeed
                updates['/events/' + eventKey] = currentEvent

                firebaseApp.database().ref().update(updates).then(() => {
                    currentEvent.isFav = eventDetails.isFav
                    currentEvent.isRegistered = eventDetails.isRegistered
                    currentEvent.isMine = eventDetails.isMine
                    this.props.updateEvent(eventKey, currentEvent)
                    alert(`Successfully started ${currentEvent.title}`)
                    this.setState({
                        startEndEvent: false
                    })
                }).catch((err) => {
                    alert(JSON.stringify(err))
                    this.setState({
                        startEndEvent: false
                    })
                })
            }
        })

    }

    endEvent(eventDetails, eventKey) {
        this.setState({
            startEndEvent: true
        })
        let {currentUser } = this.props
        let eventRef = firebaseApp.database().ref('/events/' + eventKey);
        let feedsKey = firebaseApp.database().ref('/feeds/').push().key
        let newFeed = {
            author: currentUser.name,
            time: moment().unix(),
            title: `${eventDetails.title} has finished`,
            image: eventDetails.image,
            description: `${eventDetails.title} has been concluded. Thankyou all participants for making this event a great success.`,
            type: "eventUpdate",
            euid: eventKey
        }

        eventRef.once('value', (snapshot) => {
            let currentEvent = snapshot.val()
            if (!currentEvent) {
                alertError("Error occured : Code", SNAPSHOT_NULL)
                this.setState({
                    startEndEvent: false
                })
                return
            }

            if (currentEvent.isEnded) {
                alert("Event already ended by " + currentEvent.updatedBy)
                this.props.updateEvent(eventKey, currentEvent)
                this.setState({
                    startEndEvent: false
                })
            } else {
                currentEvent.lastUpdated = moment().unix()
                currentEvent.updatedBy = currentUser.name
                currentEvent.isEnded = true

                let updates = {}
                updates['/feeds/' + feedsKey] = newFeed
                updates['/events/' + eventKey] = currentEvent

                firebaseApp.database().ref().update(updates).then(() => {
                    currentEvent.isFav = eventDetails.isFav
                    currentEvent.isRegistered = eventDetails.isRegistered
                    currentEvent.isMine = eventDetails.isMine

                    this.props.updateEvent(eventKey, currentEvent)
                    alert("Successfully ended. Now you can upload winners list")
                    this.setState({
                        startEndEvent: false
                    })

                }).catch((err) => {
                    alert(JSON.stringify(err))
                    this.setState({
                        startEndEvent: false
                    })
                })
            }
        })

    }

    registerForEvent(eventDetails, eventKey) {
        this.setState({
            registering: true
        })
        let {currentUser} = this.props
        const registerKey = firebaseApp.database().ref('/registeration/').push().key
        const profileKey = firebaseApp.database().ref('/users/' + this.props.currentUser.uid + '/registeredEvents/').push().key
        let updates = {}
        updates['/registeration/' + registerKey] = {
            uid: this.props.currentUser.uid,
            event: eventDetails.title,
            date: moment().unix(),
            eventKey
        }
        let x = '/users/' + currentUser.uid + '/registeredEvents/' + profileKey
        updates[x] = eventKey

        firebaseApp.database().ref('/users/' + currentUser.uid + '/registeredEvents/')
            .orderByValue()
            .equalTo(eventKey)
            .once('value', (snapshot) => {
                if (snapshot.val()) {
                    alert(`You are already registered for ${eventDetails.title}`)
                    this.props.register(eventKey)
                    this.setState({
                        registering: false
                    })
                } else {
                    firebaseApp.database().ref().update(updates).then(() => {
                        this.props.register(eventKey)
                        alert(`Successfully registered for ${eventDetails.title}.`)
                        this.setState({
                            registering: false
                        })
                    }).catch(err => {
                        alert(JSON.stringify(err))
                        this.setState({
                            registering: false
                        })
                    })
                }
            }).catch(error => {
                alert(JSON.stringify(error))
            })



    }

    renderEventControlButton() {
        const { eventKey, eventDetails, currentUser, updateEvent } = this.props

        if (eventDetails.winners) {
            return <TouchableOpacity onPress={() => { this.showWinners() } }>
                <Icon name="trophy" type="font-awesome" size={30} color="yellow" />
                <Text style={{ fontSize: 15 }}>See winners</Text>
            </TouchableOpacity>
        }
        if (eventDetails.isMine || currentUser.role == 'admin') {
            if (eventDetails.isEnded) {

                if (!eventDetails.winners) {
                    return <TouchableOpacity onPress={() => { Actions.setWinners({ eventDetails, eventKey, currentUser, updateEvent }) } }>
                        <Icon name="trophy" type="font-awesome" size={30} color="yellow" />
                        <Text style={{ fontSize: 15 }}>Set winners</Text>
                    </TouchableOpacity>
                }
            }


            if (!eventDetails.isStarted) {
                return <TouchableOpacity onPress={() => { this.startEvent(eventDetails, eventKey) } }>
                    <Icon name="play-arrow" size={30} color="green" />
                    <Text style={{ fontSize: 15 }}>{this.state.startEndEvent ? "Starting now" : "Start now"}</Text>
                </TouchableOpacity>
            }
            if (!eventDetails.isEnded && eventDetails.isStarted) {

                return <TouchableOpacity onPress={() => { this.endEvent(eventDetails, eventKey) } }>
                    <Icon name="stop" size={30} color="red" />
                    <Text style={{ fontSize: 15 }}>{this.state.startEndEvent ? "Ending now" : "End now"}</Text>
                </TouchableOpacity>
            }
        }

    }

    showWinners() {
        let winners = this.props.eventDetails.winners
        let message = ""
        winners.map(val => {
            if (val.name) {
                message += ` ${val.name} from ${val.college} college secured position ${val.position} \n`
            } else {
                message += `${val.college} college secured position ${val.position} \n`
            }

        })

        Alert.alert(
            this.props.eventDetails.title + " Winners",
            message
        )
    }

    renderRegisterButton() {
        const { eventKey, eventDetails } = this.props
        if (eventDetails.isRegistered || eventDetails.isMine) return

        if (!eventDetails.isStarted && (eventDetails.startTime - moment().unix() > 3600)) {
            return <TouchableOpacity
                onPress={
                    () => {
                        Alert.alert(
                            'Confirm registeration',
                            `If you are participating in team, only one member needs to register. Press CONFIRM to continue`,
                            [
                                { text: 'Cancel', style: 'cancel' },
                                { text: 'Confirm', onPress: () => { this.registerForEvent(eventDetails, eventKey) } },
                            ]
                        )
                    }
                }
                >
                <Icon name="library-add" size={30} color="red" />
                <Text style={{ fontSize: 15 }}>{this.state.registering ? "Registering" : "Register"}</Text>
            </TouchableOpacity>

        }

    }

    renderFollowButton() {
        let {currentUser, eventDetails, eventKey} = this.props
        let followButton = null
        if (eventDetails.isRegistered) {
            return <TouchableOpacity>
                <Icon name="thumb-up" size={30} color={IconColor} />
                <Text style={{ fontSize: 15 }}>{eventDetails.isStarted ? "Participated" : "Registered"}</Text>
            </TouchableOpacity>
        }

        if (eventDetails.isStarted || eventDetails.isEnded) return

        if (!eventDetails.isFav) {

            return <TouchableOpacity
                onPress={
                    () => {
                        Alert.alert(
                            'Confirm Follow',
                            'You will receive push notification for this event.',
                            [

                                { text: 'Cancel', style: 'cancel' },
                                { text: 'Confirm', onPress: () => this.addToFav(eventKey) },
                            ]
                        )
                    }
                }
                >
                <Icon name="sentiment-satisfied" size={30} color="green" />
                <Text style={{ fontSize: 15 }}>{this.state.addingFav ? "Working" : "Follow"}</Text>
            </TouchableOpacity>
        } else {
            return <TouchableOpacity onPress={() => { this.deleteFav(eventKey) } }>
                <Icon name="mood" size={30} color="red" />
                <Text style={{ fontSize: 15 }}>{this.state.addingFav ? "Working" : "Unfollow"}</Text>
            </TouchableOpacity>
        }


    }

    renderEditButton() {
        let { eventDetails, eventKey, currentUser, updateEvent } = this.props
        if (eventDetails.isMine || currentUser.role == 'admin') {
            if (!eventDetails.isStarted && (eventDetails.startTime - moment().unix() > 3600)) {

                return <TouchableOpacity style={{ justifyContent: 'flex-end' }} onPress={() => { Actions.updateEventDetails({ eventDetails, eventKey, currentUser, updateEvent }) } }>
                    <IconText text="Edit" name="mode-edit" textStyle={{ fontSize: 15, color: 'black' }} size={25} />
                </TouchableOpacity>
            }
        }
    }

    renderActionIcons() {
        let { eventDetails, eventKey, currentUser } = this.props
        let message = `Check out ${this.props.eventDetails.title} event at Anaadyanta 17 and win ${this.props.eventDetails.prizes[0].amount}`
        if (eventDetails.winners) {
            message = `${eventDetails.winners[0].name} and ${eventDetails.winners[0].name} won ${eventDetails.title} at Anaadyanta 17.`
        }
        let shareOptions = {
            title: this.props.eventDetails.title,
            message,
            url: "http://github.com/priyesh9875",
            subject: this.props.eventDetails.title //  for email
        };

        return <Card>
            <View style={{ flexDirection: 'row', justifyContent: "space-around", padding: 20 }}>
                <CreatePDF eventDetails={this.props.eventDetails} />

                {this.renderFollowButton()}
                {this.renderEventControlButton()}
                {this.renderRegisterButton()}

                <TouchableOpacity onPress={() => {
                    Share.open(shareOptions);
                } }>
                    <Icon name="share" size={30} color={IconColor} />
                    <Text style={{ fontSize: 15 }}>Share</Text>
                </TouchableOpacity>
            </View>
        </Card >
    }

    renderInfoText() {
        let {eventDetails} = this.props
        if (eventDetails.isEnded) {
            return `Event completed on ${moment.unix(eventDetails.endTime).format("hh:mm a DD-MMM-YY")}`
        }

        if (eventDetails.isStarted) {
            return `In progress: ${moment.unix(eventDetails.startTime).format("hh:mm a")} - ${moment.unix(eventDetails.endTime).format("hh:mm a")}`
        }

        return `Upcoming event on ${moment.unix(eventDetails.startTime).format("hh:mm a DD-MMM-YY")}`
    }

    render() {
        return (
            this.state.loading ? <Loading /> : <View >
                {this.renderActionIcons()}


                <Card>
                    <ListItem>
                        <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: "bold" }}>{this.renderInfoText()}</Text>
                        {this.renderEditButton()}
                    </ListItem>
                </Card>
            </View >
        );

    }
}



export default ActionTab