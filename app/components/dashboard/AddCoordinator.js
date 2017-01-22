import React, { Component } from 'react'
import {
    InteractionManager,
    UIManager,
    TouchableOpacity,
    LayoutAnimation,
    View,
    StyleSheet,
    TextInput,
    Alert,
    Picker
} from 'react-native'

import ScrollableTabView from "react-native-scrollable-tab-view";

import { firebaseApp } from '@config/firebase'

const Item = Picker.Item;
import { Container, Content, H3, Text, Card, CardItem, ListItem, List, Button } from 'native-base'
import Loading from "@components/general/Loading";

class AddCoordinator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            selected1: null,
            eventsOption: [],
            coordinatorSelected: null,
            currentEvent: {},
            currentCoordinator: {},
            adding: false,
            added: false
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let eventsOption = [{ label: "Select event", value: null }]
            let {allEvents} = this.props
            Object.keys(allEvents).map((key) => {
                eventsOption.push({ label: allEvents[key].title, value: allEvents[key].euid })
            })
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            this.renderDetails = this.renderDetails.bind(this)
            this.renderAddNew = this.renderAddNew.bind(this)
            this.renderCoordinatorDetails = this.renderCoordinatorDetails.bind(this)
            this.addNewCoordinator = this.addNewCoordinator.bind(this)
            this.removeCoordinator = this.removeCoordinator.bind(this)
            this.setState({
                loading: false,
                eventsOption,
            })
        })
    }
    componentWillReceiveProps(nextProps) {
        if (!this.state.loading && this.state.currentEvent.title) {
            this.setState({
                currentEvent: nextProps.allEvents[this.state.selected1]
            })
        }
    }



    onValueChange(value) {

        if (value) {
            this.setState({
                selected1: value,
                currentEvent: this.props.allEvents[value]
            });

        }
    }

    onValueChange2(value) {
        if (this.props.db[value]) {
            this.setState({
                coordinatorSelected: value,
                added: false,
                currentCoordinator: this.props.db[value]
            })
        }
    }

    renderDetails() {
        if (!this.state.currentEvent.title) return null;

        const {allEvents} = this.props
        const {currentEvent} = this.state
        if (!currentEvent.coordinators || currentEvent.coordinators.length < 1) {
            return <Text>No coordinator</Text>
        }
        return <Card style={{ padding: 10 }}>
            <Text style={{ alignSelf: "center" }}>Current coordinator</Text>

            <List>
                {
                    currentEvent.coordinators.map((val, index) => {
                        return <ListItem key={index} style={{ paddingTop: 5, paddingBottom: 5 }}>
                            <View style={{ flex: 5, justifyContent: "flex-start" }}>
                                <Text>Name: {val.name}</Text>
                                <Text>Mobile: {val.phone}</Text>
                                <Text>Email: {val.email}</Text>
                            </View>
                            <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                                onPress={() => { this.confirmAction(this.removeCoordinator, val) } }>
                                <Text style={{ fontSize: 14, color: 'gray' }}>Remove</Text>
                            </TouchableOpacity>

                        </ListItem>
                    })
                }
            </List>

        </Card>

    }
    removeCoordinator(coord) {
        let u = {}
        u[`/users/${coord.uid}/coordinatingEvents/${this.state.currentEvent.euid}`] = null
        firebaseApp.database().ref(`/users/${coord.uid}/coordinatingEvents/`).once('value', (snapshot) => {
            if (!snapshot.val()) return
            let profileKey = ""
            Object.keys(snapshot.val()).map(key => {
                if (snapshot.val()[key] == this.state.currentEvent.euid)
                    profileKey = key
            })
            let updates = {}

            if (profileKey !== "") {
                profileKey = `/users/${coord.uid}/coordinatingEvents/` + profileKey
                updates[profileKey] = null
            }

            let eventKey = `/events/${this.state.currentEvent.euid}/coordinators/`
            let updatedCoordinators = this.state.currentEvent.coordinators.filter(val => {
                return val.name != coord.name
            })
            let updatedEvent = { ...this.state.currentEvent }
            updatedEvent.coordinators = updatedCoordinators
            updates[eventKey] = updatedCoordinators
            firebaseApp.database().ref().update(updates)
                .then(() => {
                    this.props.updateEvent(this.state.currentEvent.euid, updatedEvent)
                }).catch(err => {
                    alert(JSON.stringify(err))
                })

        }).catch(err => {
            alert(JSON.stringify(err))
        })


    }

    addNewCoordinator() {
        this.setState({
            adding: true
        })
        let { currentCoordinator, currentEvent} = this.state
        let newCoordinator = {
            name: currentCoordinator.name,
            email: currentCoordinator.email,
            phone: currentCoordinator.mobile,
            uid: currentCoordinator.uid,
        }
        let eventKey = `/events/${this.state.currentEvent.euid}/coordinators/`
        let profileKey = `/users/${currentCoordinator.uid}/coordinatingEvents/`
        let pushKey = firebaseApp.database().ref(profileKey).push().key
        let updatedCoordinators = this.state.currentEvent.coordinators
        if (!currentEvent.coordinators) {
            updatedCoordinators = []
        }
        updatedCoordinators.push(newCoordinator)

        let updatedEvent = { ...currentEvent }
        updatedEvent.coordinators = updatedCoordinators

        let updates = {}
        updates[profileKey + pushKey] = currentEvent.euid
        updates[eventKey] = updatedCoordinators
        firebaseApp.database().ref().update(updates)
            .then(() => {
                this.props.updateEvent(currentEvent.euid, updatedEvent)
                this.setState({
                    adding: false,
                    added: true,
                    currentCoordinator: {},
                    coordinatorSelected: null
                })
            }).catch(err => {
                alert(JSON.stringify(err))
                this.setState({
                    adding: false,
                    added: false
                })
            })
    }

    confirmAction(callback, param) {
        Alert.alert(
            "Confirm action",
            "Press CONFIRM to continue",
            [
                { text: "Cancel", style: "cancel" },
                { text: "CONFIRM", onPress: () => { callback(param) } },
            ]
        )

    }

    renderCoordinatorDetails() {
        let {currentCoordinator} = this.state
        return <ListItem style={{ paddingTop: 5, paddingBottom: 5 }}>
            <View style={{ flex: 5, justifyContent: "flex-start" }}>
                <Text>Name:  {currentCoordinator.name}</Text>
                <Text>Phone: {currentCoordinator.mobile || currentUser.phone}</Text>
                <Text>Email: {currentCoordinator.email}</Text>
            </View>
            {
                this.state.added ? <Text style={{ fontSize: 14, color: 'gray' }}>Added</Text>
                    : <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                        onPress={() => { this.confirmAction(this.addNewCoordinator) } }>
                        <Text style={{ fontSize: 14, color: 'gray' }}>{this.state.adding ? "Adding" : "Add"}</Text>
                    </TouchableOpacity>


            }

        </ListItem>

    }

    renderAddNew() {
        if (!this.state.currentEvent.title) return null;

        const {allEvents} = this.props
        const {currentEvent} = this.state
        const users = [{ label: "Select", value: "" }];
        Object.keys(this.props.db).map(key => {
            // if (this.props.db[key].role == 'user')
            users.push({ label: this.props.db[key].name, value: this.props.db[key].uid })
        })
        return <Card style={{ padding: 10, flex: 1 }}>
            <Text style={{ alignSelf: "center" }}>Assign coordinator</Text>
            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#0A69FE",
                    backgroundColor: "white"
                }}
                >

                <Picker
                    iosHeader="Select coordinator"
                    mode="dropdown"
                    style={{
                        flex: 1,
                        padding: 5,
                        marginRight: 8,
                        color: "#0A69FE",

                    }}
                    selectedValue={this.state.coordinatorSelected}
                    onValueChange={this.onValueChange2.bind(this)}>
                    {
                        users.map((val, index) => {
                            return <Item key={index} label={val.label} value={val.value} />
                        })
                    }

                </Picker>
            </View>
            {this.state.currentCoordinator.name ? this.renderCoordinatorDetails() : null}

        </Card>

    }


    renderView() {

        const a = [1, 2, 3,]
        const {allEvents} = this.props
        const {currentEvent} = this.state

        return <Container>
            <Content style={{ backgroundColor: "white" }} >

                <Card style={{ margin: 10, padding: 10 }}>
                    <CardItem>

                        <Text style={{ flex: 1, textAlign: "center", fontSize: 20, paddingBottom: 15 }}>
                            Assign coordinators to events
                        </Text>
                        <View style={{
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: "#0A69FE",
                            backgroundColor: "white"
                        }}
                            >
                            <Picker
                                iosHeader="Select one"
                                mode="dialog"
                                style={{
                                    flex: 1,
                                    padding: 20,
                                    marginRight: 8,
                                    color: "#0A69FE",

                                }}

                                selectedValue={this.state.selected1}
                                onValueChange={this.onValueChange.bind(this)}>


                                {
                                    this.state.eventsOption.map((val, index) => {
                                        return <Item key={index} label={val.label} value={val.value} />
                                    })
                                }

                            </Picker>
                        </View>
                    </CardItem>

                    {this.renderAddNew()}

                    {this.renderDetails()}

                </Card>
            </Content>
        </Container >

    }
    render() {
        return (
            this.state.loading ? <Loading /> : this.renderView()
        );
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

export default AddCoordinator;

