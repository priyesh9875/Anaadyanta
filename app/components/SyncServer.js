import React, { Component } from 'react'

import { View, NetInfo, Platform } from "react-native"
import { Container, Content, Spinner, Text, H1 } from 'native-base';

import { Actions } from "react-native-router-flux";
import { firebaseApp, urlBuilder } from '@config/firebase'


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

        if (!this.props.currentUser || !this.props.currentUser.isLoggedIn) {
            Actions.login({ type: 'reset' })
        }

        this.setState({
            updating: true,
            isMounted: true,
            userData: null,
            eventsData: null
        })
        this.updateData = this.updateData.bind(this);

        // Testing internet connection
        fetch("https://httpbin.org/ip")
            .then(response => response.json())
            .then(responseJson => {
                // Internet is available, set timeout to suspend sync after 10 seconds
                this.setState({
                    timeout: setTimeout(() => {
                        alert("Seems that your are on slow network. Please try again when network is good")
                        this.setState({
                            isMounted: false
                        }, () => {
                            Actions.dashboard({ type: "reset" })
                        })
                    }, 10000)
                }, () => {
                    // Update database
                    this.fetchEvents()
                })
            }).catch(err => {
                // No internet, skip sync
                Actions.dashboard({ type: "reset" })
            })

    }

    fetchEvents() {

        const uid = this.props.currentUser.uid;

        // Fetch user events data
        fetch(urlBuilder('users/' + uid + '/events')).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    userData: responseJson || {}
                }, () => {
                    // Try updating database
                    this.updateData()
                })
            }).catch((err) => {
                // No internet, or some errors. Skip sync
                // alert("1===" + JSON.stringify(err))
                clearTimeout(this.state.timeout)
                Actions.dashboard({ type: "reset" })
            })

        // Fetch all events data
        fetch(urlBuilder('events'))
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    eventsData: responseJson || {}
                }, () => {
                    // Try updating database
                    this.updateData()
                })
            }).catch((err) => {
                // No internet, or some errors. Skip sync                
                // alert("2===" + JSON.stringify(err))
                clearTimeout(this.state.timeout)
                Actions.dashboard({ type: "reset" })
            })

    }

    updateData() {
        // Update only when both data are available
        if (!this.state.userData || !this.state.eventsData) {
            return
        }

        let favEventsSnap = this.state.userData.favEvents
        let registeredEventsSnap = this.state.userData.registeredEvents
        let coordinatingSnap = this.state.userData.coordinatingEvents
        let allEvents = this.state.eventsData
        let favEvents = {}
        let registeredEvents = {}
        let coordinatingEvents = {}

        // Updating favourite/Following events
        if (favEventsSnap) {
            Object.keys(favEventsSnap).map(key => {
                let val = allEvents[favEventsSnap[key]]
                if (val) {
                    allEvents[favEventsSnap[key]].isFav = true
                    favEvents[val.euid] = allEvents[val.euid]
                }
            })
        }

        // Updating registered events
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

        // Updating coordinating events
        if (coordinatingSnap) {
            Object.keys(coordinatingSnap).map(key => {
                let val = allEvents[coordinatingSnap[key]]
                if (val) {
                    allEvents[val.euid].isMine = true
                    coordinatingEvents[val.euid] = allEvents[val.euid]
                }
            })
        }

        // Save to local storage
        this.props.saveEvents(allEvents, favEvents, registeredEvents, coordinatingEvents);
        if (this.state.isMounted) {
            clearTimeout(this.state.timeout)
            this.setState({
                updating: false,
                isMounted: false
            }, () => {
                setTimeout(() => {
                    Actions.dashboard({ type: "reset" })
                }, 500)
            })
        }
    }

    render() {
        const { favEvents, allEvents, currentUser } = this.props

        return (
            <Container>
                <Content >
                    <View style={{ marginTop: 150, justifyContent: "center", alignItems: "center" }}>
                        <H1>Welcome {currentUser.name}</H1>

                        <View>
                            <Spinner color='red' style={{ alignSelf: "center" }} size={1} />
                            <Text style={{ marginLeft: 10, marginRight: 10, borderRadius: 10, borderWidth: 1, backgroundColor: "white", padding: 10, textAlign: "center" }}>{this.state.updating ? "Please wait while we are fetching latest data from the server. Auto skip in 10 seconds" : "Update complete"}</Text>
                        </View>
                    </View>
                </Content>
            </Container >
        )
    }
}
