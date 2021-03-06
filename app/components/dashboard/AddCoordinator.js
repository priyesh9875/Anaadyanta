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
    Picker,
    Platform
} from 'react-native'

import ScrollableTabView from "react-native-scrollable-tab-view";

import { firebaseApp } from '@config/firebase'
import { Text } from "@components/ui"
import { Container, Content, Card, CardItem, ListItem, List } from 'native-base'
import Loading from "@components/general/Loading";
const Item = Picker.Item;
let pickerStyle = {
    flex: 1,
    padding: 20,
    marginRight: 8,
}
if (Platform.OS == 'android') {
    pickerStyle.color = "#0A69FE"
}

class AddCoordinator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            eventSelected: null,
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
                currentEvent: nextProps.allEvents[this.state.eventSelected]
            })
        }
    }

    onValueChange(value) {

        if (value) {
            this.setState({
                eventSelected: value,
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


    removeCoordinator(coord) {

        let updatedCoordinators = this.state.currentEvent.coordinators.filter(val => {
            return val.email != coord.email
        })

        let updates = {}
        updates[`/newEvents/${this.state.currentEvent.euid}/coordinators/`] = updatedCoordinators
        updates[`/users/${coord.uid}/events/coordinatingEvents/${this.state.currentEvent.euid}`] = null
        let updatedEvent = { ...this.state.currentEvent }
        updatedEvent.coordinators = updatedCoordinators

        firebaseApp.database().ref().update(updates)
            .then(() => {
                this.props.updateEvent(this.state.currentEvent.euid, updatedEvent)
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
            phone: currentCoordinator.phone,
            uid: currentCoordinator.uid,
        }
        let eventKey = `/newEvents/${this.state.currentEvent.euid}/coordinators/`
        let profileKey = `/users/${currentCoordinator.uid}/events/coordinatingEvents/${currentEvent.euid}`
        let pushKey = firebaseApp.database().ref(profileKey).push().key
        let updatedCoordinators = this.state.currentEvent.coordinators
        if (!currentEvent.coordinators) {
            updatedCoordinators = []
        }
        updatedCoordinators.push(newCoordinator)

        let updatedEvent = { ...currentEvent }
        updatedEvent.coordinators = updatedCoordinators

        let updates = {}
        updates[profileKey] = true
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

    renderDetails() {
        if (!this.state.currentEvent.title) return null;

        const {allEvents} = this.props
        const {currentEvent} = this.state
        if (!currentEvent.coordinators || currentEvent.coordinators.length < 1) {
            return <Text style={{ color: "black" }}>No coordinator</Text>
        }
        return <Card style={{ padding: 10, paddingLeft: 0 }}>
            <Text p style={{ alignSelf: "center", color: "black" }}>Current coordinator</Text>

            <List>
                {
                    currentEvent.coordinators.map((val, index) => {
                        return <ListItem key={index} style={{ margin: 0, padding: 2, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "black" }}>Name: {val.name}</Text>
                                <Text style={{ color: "black" }}>Mobile: {val.phone}</Text>
                                <Text style={{ color: "black" }}>Email: {val.email}</Text>
                            </View>
                            <TouchableOpacity style={{ justifyContent: "flex-end", alignItems: "center" }}
                                onPress={() => { this.confirmAction(this.removeCoordinator, val) } }>
                                <Text style={{ fontSize: 14, color: 'gray' }}>Remove</Text>
                            </TouchableOpacity>
                        </ListItem>
                    })
                }
            </List>

        </Card>

    }

    renderCoordinatorDetails() {
        let {currentCoordinator} = this.state
        return <View style={{ flex: 1 }} >
            <Text p style={{ alignSelf: "center", color: "black" }}>Details </Text>
            <ListItem style={{ margin: 0, padding: 2, paddingTop: 10, paddingBottom: 5 }}>


                <View style={{ flex: 5, justifyContent: "flex-start" }}>
                    <Text style={{ color: "black" }}>Name:  {currentCoordinator.name}</Text>
                    <Text style={{ color: "black" }}>Phone: {currentCoordinator.phone}</Text>
                    <Text style={{ color: "black" }}>Email: {currentCoordinator.email}</Text>
                </View>
                {
                    this.state.added ? <Text style={{ fontSize: 14, color: 'gray' }}>Added</Text>
                        : <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                            onPress={() => { this.confirmAction(this.addNewCoordinator) } }>
                            <Text style={{ fontSize: 14, color: 'gray' }}>{this.state.adding ? "Adding" : "Add"}</Text>
                        </TouchableOpacity>


                }

            </ListItem>
        </View>

    }

    renderAddNew() {
        if (!this.state.currentEvent.title) return null;

        const {allEvents} = this.props
        const {currentEvent} = this.state
        const users = [{ label: "Select", value: "" }];

        Object.keys(this.props.db).map(key => {
            users.push({ label: this.props.db[key].name, value: this.props.db[key].uid })
        })
        return <View style={{ padding: 10, flex: 1 }}>
            <Text style={{ textAlign: "center", fontSize: 20, paddingBottom: 15, color: "black" }} >
                Select coordinators
            </Text>
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
                    style={pickerStyle}
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

        </View>

    }

    renderView() {

        const a = [1, 2, 3,]
        const {allEvents} = this.props
        const {currentEvent} = this.state

        return <Container>
            <Content style={{ backgroundColor: "white" }} >

                <Card style={{ margin: 10, padding: 10 }}>
                    <CardItem>

                        <Text
                            style={{ textAlign: "center", fontSize: 20, paddingBottom: 15, color: "black" }}
                            >
                            Select event
                        </Text>
                        <View
                            style={{
                                borderWidth: 1,
                                borderRadius: 5,
                                borderColor: "#0A69FE",
                                backgroundColor: "white"
                            }}
                            >
                            <Picker
                                iosHeader="Select one"
                                mode="dialog"
                                style={pickerStyle}
                                selectedValue={this.state.eventSelected}
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

export default AddCoordinator;

