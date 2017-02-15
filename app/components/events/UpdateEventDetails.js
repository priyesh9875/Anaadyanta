import React, { Component } from 'react'
import {
    InteractionManager,
    UIManager,
    TouchableOpacity,
    LayoutAnimation,
    View,
    TextInput,
    StyleSheet,
    Switch
} from 'react-native'

import { Container, Content, H3, Text, Card, ListItem, Button } from 'native-base'
import Loading from "@components/general/Loading";
import { firebaseApp } from '@config/firebase'
import { SNAPSHOT_NULL, alertError } from "@config/errors"
import { Actions } from "react-native-router-flux"
import moment from "moment"

import DateTimePicker from 'react-native-modal-datetime-picker'

function padRight(value, width) {
    return value.slice(0, width) + Array(width - value.length).join("*")
}

class Winners extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            title: props.eventDetails.title,
            description: props.eventDetails.description,
            startTime: moment.unix(props.eventDetails.startTime).format("hh:mm a DD-MMM-YY"),
            endTime: moment.unix(props.eventDetails.endTime).format("hh:mm a DD-MMM-YY"),
            registration: props.eventDetails.registration ? props.eventDetails.registration.toString() : "FREE",
            prizes: props.eventDetails.prizes || [],
            venue: props.eventDetails.venue || "",
            isGroup: props.eventDetails.isGroup || false,
            isStartPickerVisible: false,
            isEndPickerVisible: false,
            updating: false,
            updated: false
        }
    }

    _showStartPicker = () => this.setState({ isStartPickerVisible: true })
    _showEndPicker = () => this.setState({ isEndPickerVisible: true })

    _hideDateTimePicker = () => this.setState({ isStartPickerVisible: false, isEndPickerVisible: false })

    _handleStartDatePicked = (date) => {
        this.setState({
            startTime: moment(date).format("hh:mm a DD-MMM-YY")
        })
        this._hideDateTimePicker()
    }

    _handleEndDatePicked = (date) => {
        this.setState({
            endTime: moment(date).format("hh:mm a DD-MMM-YY")
        })
        this._hideDateTimePicker()
    }



    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            this.updateEventDetails = this.updateEventDetails.bind(this)
            this.setState({
                loading: false,

            })
        })
    }

    updateEventDetails() {
        let { eventDetails, currentUser, eventKey} = this.props;

        this.setState({
            updating: true
        })
        let eventRef = `/newEvents/${eventKey}/`;
        firebaseApp.database().ref(eventRef).once('value', (snapshot) => {

            if (!snapshot.val()) {
                alertError("Error while updating: " + JSON.stringify(snapshot.val()), SNAPSHOT_NULL)
                this.setState({
                    updating: false,
                })
                return
            }

            let currentEvent = snapshot.val();
            currentEvent.title = this.state.title
            currentEvent.description = this.state.description
            currentEvent.registration = this.state.registration
            currentEvent.prizes = this.state.prizes
            currentEvent.startTime = moment(this.state.startTime, "hh:mm a DD-MMM-YY").unix()
            currentEvent.endTime = moment(this.state.endTime, "hh:mm a DD-MMM-YY").unix()
            currentEvent.lastUpdated = moment().unix()
            currentEvent.venue = this.state.venue
            currentEvent.isGroup = this.state.isGroup
            currentEvent.updatedBy = currentUser.name

            let updates = {}
            updates[eventRef] = currentEvent
            firebaseApp.database().ref().update(updates).then(() => {
                currentEvent.isFav = this.props.eventDetails.isFav;
                currentEvent.isRegistered = this.props.eventDetails.isRegistered
                currentEvent.isMine = this.props.eventDetails.isMine
                this.props.updateEvent(eventKey, currentEvent)
                this.setState({
                    updating: false,
                    updated: true
                })
            }).catch((err) => {
                alert(JSON.stringify(err))
                this.setState({
                    updating: false
                })
            })

        })

    }
    onChangeValue(type, value, index) {
        let prizes = this.state.prizes;
        switch (type) {
            case 'amount':
                prizes[index].amount = value
                break;
            default: return
        }

        this.setState(prizes)

    }

    renderView() {
        const { eventDetails} = this.props

        if (this.state.updated) {
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button onPress={() => { Actions.pop() } } style={{ alignSelf: "center" }} >
                    Successfully updated. Go Back
                </Button>

            </View>
        }

        if (this.state.updating) {
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button style={{ alignSelf: "center", padding: 10 }} >
                    Please wait....Updating
                </Button>
            </View>
        }

        return <Container>
            <Content>
                <H3 style={{ alignSelf: 'center', padding: 10 }}>{eventDetails.title}</H3>

                <Card style={{ padding: 5, margin: 20 }} >

                    <ListItem style={{ padding: 0, paddingBottom: 10, margin: 5 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'gray', fontSize: 16 }}>Description</Text>
                            <TextInput
                                multiline={true}
                                style={{ height: 150, fontSize: 16, borderWidth: 0 }}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                value={this.state.description}
                                onChangeText={(description) => this.setState({ description })}
                                />
                        </View>

                    </ListItem>

                    <ListItem style={{ padding: 0, paddingBottom: 10, margin: 5 }}>
                        <InlineText label="Venue" value={this.state.venue} onValueChange={(venue) => this.setState({ venue })} />
                    </ListItem>

                    <ListItem style={{ padding: 0, paddingBottom: 10, margin: 5 }}>
                        <View style={{ flex: 1, flexDirection: "row", height: 40 }}>
                            <Text style={{ height: 40, fontSize: 16, paddingTop: 7, width: 120 }}>Is group event?</Text>
                            <Switch value={this.state.isGroup} onValueChange={(isGroup) => this.setState({ isGroup })} />
                        </View>
                    </ListItem>


                    <ListItem style={{ padding: 0, paddingBottom: 10, margin: 5 }}>
                        <InlineText label="Reg fees" value={this.state.registration} onValueChange={(registration) => this.setState({ registration })} />
                    </ListItem>
                    {
                        this.state.prizes.map((prize, index) => {
                            return <ListItem key={index} style={{ padding: 0, paddingBottom: 10, margin: 5 }}>
                                <InlineText label={"Prize " + (index + 1)} value={this.state.prizes[index].amount.toString()} onValueChange={(text) => this.onChangeValue('amount', text, index)} />
                            </ListItem>

                        })
                    }

                    <ListItem onPress={this._showStartPicker} style={{ padding: 0, paddingBottom: 10, margin: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ color: 'gray', fontSize: 16, width: 120 }}>Start</Text>
                            <Text >{this.state.startTime}</Text>
                        </View>
                    </ListItem>

                    <ListItem onPress={this._showEndPicker} style={{ padding: 0, paddingBottom: 10, margin: 5 }}>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ color: 'gray', fontSize: 16, width: 120 }}>End</Text>
                            <Text style={{ flex: 1, fontSize: 16 }}>{this.state.endTime}</Text>
                        </View>
                    </ListItem>



                </Card>

                <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, padding: 20 }} onPress={() => { this.updateEventDetails() } }>
                    Update
                </Button>

                <DateTimePicker
                    isVisible={this.state.isStartPickerVisible}
                    onConfirm={this._handleStartDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode='datetime'
                    />

                <DateTimePicker
                    isVisible={this.state.isEndPickerVisible}
                    onConfirm={this._handleEndDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode='datetime'
                    />


            </Content>
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
import { setWinners } from '@redux/events/action'

const mapStateToProps = state => ({
})
const mapActions = dispatch => ({
    setWinners: setWinners
})

export default connect(mapStateToProps, mapActions)(Winners);

