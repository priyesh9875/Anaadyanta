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
        this.setState({
            updating: true,
            isMounted: true,
            message: "Default",
            userData: null,
            eventsData: null
        })
        this.updateData = this.updateData.bind(this);

        this.fetchEvents()

        // const netWork = (networkType) => {
        //     NetInfo.removeEventListener(netWork)
        //     if (networkType) {
        //         this.setState({
        //             timeout: setTimeout(() => {
        //                 alert("Seems that your are on slow network. App will continue syncing with server in background")
        //                 this.setState({
        //                     isMounted: false
        //                 }, () => {
        //                     Actions.dashboard({ type: "reset" })
        //                 })
        //             }, 10000)
        //         })
        //         this.fetchEvents()
        //     } else {
        //         alert("No internet. Some functions of the ap may fail. Connect to internet and restart the app")
        //         Actions.dashboard({ type: "reset" })
        //     }
        // }
        // if (this.props.isConnected) {
        //     netWork('from login, so there must be internet :)')
        //     NetInfo.removeEventListener(netWork)
        // } else {
        //     if (Platform.OS == "android") {
        //         NetInfo.fetch().then((status) => {
        //             netWork(status)
        //         })
        //     } else {
        //         /// IOS
        //         NetInfo.addEventListener('change', netWork)
        //     }
        // }
    }

    fetchEvents() {
        if (!this.props.currentUser || !this.props.currentUser.isLoggedIn) {
            Actions.login({ type: 'reset' })
        }
        const uid = this.props.currentUser.uid;
        fetch(urlBuilder('users/' + uid + '/events')).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    userData: responseJson || {}
                }, () => {
                    this.updateData()

                })
            })

        fetch(urlBuilder('events'))
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    eventsData: responseJson || {}
                }, () => {
                    this.updateData()
                })
            })

    }

    updateData() {
        if (!this.state.userData || !this.state.eventsData) {
            alert("waiting")
            return
        }

        let favEventsSnap = this.state.userData.favEvents
        let registeredEventsSnap = this.state.userData.registeredEvents
        let coordinatingSnap = this.state.userData.coordinatingEvents

        let allEvents = this.state.eventsData
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
        Actions.dashboard({ type: "reset" })
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
