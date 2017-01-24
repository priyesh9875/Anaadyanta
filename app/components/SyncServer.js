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
            isMounted: true,
            timeout: null
        }

        this.fetchEvents = this.fetchEvents.bind(this)
    }

    componentDidMount() {
        this.setState({
            updating: true,
            isMounted: true,
            message: "Default"
        })

        const netWork = (networkType) => {
            NetInfo.removeEventListener(netWork)
            // alert(networkType)
            if (networkType) {
                this.setState({
                    timeout: setTimeout(() => {
                        alert("Seems that your are on slow network. App will continue syncing with server in background")
                        this.setState({
                            isMounted: false
                        }, () => {
                            Actions.dashboard({ type: "reset" })
                        })
                    }, 10000)
                })
                this.fetchEvents()
            } else {
                alert("No internet. Some functions of the ap may fail. Connect to internet and restart the app")
                Actions.dashboard({ type: "reset" })
            }
        }
        if (this.props.isConnected) {
            netWork('from login, so there must be internet :)')
            // NetInfo.removeEventListener(netWork)
            
        } else {
            NetInfo.addEventListener('change', netWork)

        }
    }

    fetchEvents() {
        if (!this.props.currentUser || !this.props.currentUser.isLoggedIn) {
            Actions.login({ type: 'reset' })
        }
        const uid = this.props.currentUser.uid;

        firebaseApp.database().ref('/events/').once('value', (snapshot) => {
            firebaseApp.database().ref('/users/' + uid).once('value', (userSnap) => {
                // alert("fetch done")
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
                // alert("processing done ")
                clearTimeout(this.state.timeout)

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
                                    <Spinner color='red' style={{ alignSelf: "center" }} size={1} />
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
