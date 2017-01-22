/**
 * login screen
 */

import React, { Component } from 'react'

import { View, NetInfo } from "react-native"
import { Container, Content, Spinner, H1, H2, H3, Text } from 'native-base';

import { Actions } from "react-native-router-flux";
import { firebaseApp } from '@config/firebase'


export default class SyncServer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            updating: false,
            isMounted: true
        }

        this.fetchEvents = this.fetchEvents.bind(this)
    }

    componentDidMount() {
        this.setState({
            updating: true,
            isMounted: true,
            message: "Default"
        })

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                this.fetchEvents()
            } else {
                alert("No internet")
                Actions.dashboard({ type: "reset" })
            }
        }).catch(error => {
            // alert("not error" + JSON.stringify(error))

            Actions.dashboard({ type: "reset" })

        });
    }

    fetchEvents() {
        if (!this.props.currentUser || !this.props.currentUser.isLoggedIn) {
            Actions.login({ type: 'reset' })
        }
        //alert(JSON.stringify(firebaseApp.auth().currentUser))
        const uid = this.props.currentUser.uid;

        firebaseApp.database().ref('/events/').once('value', (snapshot) => {
            firebaseApp.database().ref('/users/' + uid).once('value', (userSnap) => {
                let favEventsSnap = userSnap.val().favEvents
                let registeredEventsSnap = userSnap.val().registeredEvents
                let coordinatingSnap = userSnap.val().coordinatingEvents

                let allEvents = snapshot.val()
                let favEvents = {}
                let registeredEvents = {}
                let coordinatingEvents = {}

                if (favEventsSnap) {
                    Object.keys(favEventsSnap).map(key => {
                        let val = allEvents[favEventsSnap[key]]
                        if (val) {
                            allEvents[favEventsSnap[key]].isFav = true
                            favEvents[val.euid] = allEvents[val.euid]
                        }
                    })
                }

                // alert(JSON.stringify(registeredEventsSnap))
                if (registeredEventsSnap) {
                    Object.keys(registeredEventsSnap).map(key => {
                        let val = allEvents[registeredEventsSnap[key]]
                        if (val) {
                            allEvents[val.euid].isRegistered = true
                            allEvents[val.euid].registerationKey = key
                            registeredEvents[val.euid] = allEvents[val.euid]
                        }
                    })
                }


                // alert(JSON.stringify(registeredEventsSnap))
                if (coordinatingSnap) {
                    Object.keys(coordinatingSnap).map(key => {
                        let val = allEvents[coordinatingSnap[key]]
                        if (val) {
                            allEvents[val.euid].isMine = true
                            coordinatingEvents[val.euid] = allEvents[val.euid]
                        }
                    })
                }



                this.props.saveEvents(allEvents, favEvents, registeredEvents, coordinatingEvents);
                setTimeout(() => {
                    Actions.dashboard({ type: "reset" })
                }, 500)
            })

        })

    }
    componentDidUpdate() {
    }

    render() {
        const { favEvents, allEvents, currentUser } = this.props

        return (
            <Container>
                <Content >
                    <View style={{ marginTop: 150, justifyContent: "center", alignItems: "center" }}>
                        <H1>Welcome {currentUser.name}</H1>
                        {
                            this.state.updating ?
                                <View>
                                    <Spinner color='red' style={{ alignSelf: "center" }} size={60} />
                                    <Text style={{ textAlign: "center" }}>Please wait while we are fetching latest data from the server {this.state.updating ? "YES" : "No"}</Text>
                                </View>
                                : <View>
                                    <H2 style={{ textAlign: "center" }}>All data synced! .....</H2>
                                </View>
                        }
                    </View>
                </Content>
            </Container >
        )
    }
}
