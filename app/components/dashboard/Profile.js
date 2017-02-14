
import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    InteractionManager,
    TextInput,
    UIManager,
    LayoutAnimation,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Loading from "@components/general/Loading"
import { Container, Content, List, ListItem, Badge, Card, CardItem, Icon } from 'native-base';
import { Text } from "@components/ui"
import { firebaseApp } from '@config/firebase'
import { alertError } from "@config/errors"


import { handleAuthError } from "@config/errors"
class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            name: props.currentUser.name,
            phone: props.currentUser.phone,
            college: props.currentUser.college,
            editing: false,
            saving: false
        };

    }

    componentDidMount = () => {
        this.saveProfile = this.saveProfile.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)

        InteractionManager.runAfterInteractions(() => {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

            this.setState({
                loading: false,
            })
        })

    }

    renderFavCard() {
        return <Card style={{ margin: 5, flex: 1 }} >
            <CardItem onPress={() => { Actions.myEvents() } }>
                <Text style={{ color: "black" }}>Following events</Text>
            </CardItem>
            <CardItem onPress={() => { Actions.myEvents() } }>
                <Image style={{ height: 200, width: null }} source={require('@images/fav.jpg')} />
            </CardItem>
        </Card>

    }

    renderCoordinatorCard() {
        if (this.props.currentUser.role != 'user') {


            return <Card style={{ margin: 5, flex: 1 }} >
                <CardItem onPress={() => { Actions.coordEvents() } }>
                    <Text style={{ color: "black" }}>Coordinating events</Text>
                </CardItem>
                <CardItem onPress={() => { Actions.coordEvents() } }>
                    <Image style={{ height: 200, width: null }} source={require('@images/eventCoord.jpg')} />
                </CardItem>
            </Card>
        }
    }

    renderRegisteredCard() {
        return <Card style={{ margin: 5, flex: 1 }} >
            <CardItem onPress={() => { Actions.registeredEvents() } }>
                <Text style={{ color: "black" }}>Registered events</Text>
            </CardItem>
            <CardItem onPress={() => { Actions.registeredEvents() } }>
                <Image style={{ height: 200, width: null }} source={require('@images/registered.jpg')} />
            </CardItem>
        </Card>

    }


    saveProfile() {
        let {phone, name, college } = this.state
        let {currentUser} = this.props

        if (currentUser.phone == phone && currentUser.name == name && currentUser.college == college) {
            this.setState({
                editing: false
            })
            return
        }
        this.setState({
            saving: true,
        })

        let listener = firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                user.updateProfile({
                    displayName: name
                }).then(() => {

                    let updateKey = '/users/' + user.uid
                    let updatedUser = { ...currentUser }
                    updatedUser.name = user.displayName
                    updatedUser.phone = phone
                    updatedUser.college = college
                    delete updatedUser.isLoggedIn
                    if (!currentUser.coordinatingEvents) delete updatedUser.coordinatingEvents
                    firebaseApp.database().ref(updateKey).update(updatedUser).then(() => {
                        this.props.updateProfile(name, phone, college)
                        this.setState({
                            saving: false,
                            editing: false
                        })
                        listener()
                    }).catch(err => {
                        alert("Error while updating. Please try again later or restart the app")
                        this.setState({
                            saving: false,
                            editing: false
                        })
                        listener()

                    })
                }).catch((err) => {
                    handleAuthError(err)
                    this.setState({
                        saving: false,
                        editing: false
                    })
                })
                listener()

            } else {
                listener()

                alert("SessionExpires")
                this.props.cleanLogout()
            }
        })

    }

    handleEditClick() {
        if (this.state.editing) {
            this.saveProfile()
            return
        }

        this.setState({
            editing: true
        })

    }

    renderProfileDetails() {
        let {currentUser} = this.props
        return <Card style={{ margin: 10 }}>
            <CardItem style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ flex: 1, color: "black" }}>Profile</Text>
                <TouchableOpacity onPress={this.handleEditClick} style={{ justifyContent: "flex-end" }}>
                    {
                        this.state.editing
                            ? <View>{
                                this.state.saving
                                    ? <Text style={{ color: "black" }}>Saving</Text>
                                    : <Text style={{ color: '#0A69FE' }} >Save</Text>
                            }
                            </View>

                            : <Text style={{ color: '#0A69FE' }} >Edit profile</Text>
                    }
                </TouchableOpacity>


            </CardItem>
            <List>
                <ListItem iconLeft style={{ flex: 1, flexDirection: 'row' }}>
                    <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                    <Text style={{ justifyContent: "flex-start", paddingTop: 2, paddingLeft: 5, color: "black" }}>Name </Text>
                    <View style={{ flex: 1, justifyContent: "flex-end", }}>
                        {
                            !this.state.editing
                                ? <Text style={{ color: "black" }}>{currentUser.name}</Text>
                                : <TextInput value={this.state.name}
                                    onChangeText={(name) => this.setState({ name })}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    style={{ height: 25, flex: 1, borderRadius: 5, padding: 3, paddingLeft: 5, paddingRight: 5, fontSize: 16, borderWidth: StyleSheet.hairlineWidth }}
                                    />
                        }
                    </View>

                </ListItem>

                <ListItem iconLeft style={{ flex: 1, flexDirection: 'row' }}>
                    <Icon name="ios-call" style={{ color: '#0A69FE' }} />
                    <Text style={{ justifyContent: "flex-start", paddingTop: 2, paddingLeft: 5, color: "black" }}>Phone </Text>
                    <View style={{ flex: 1, justifyContent: "flex-end", }}>
                        {
                            !this.state.editing
                                ? <Text style={{ color: "black" }}>{currentUser.phone}</Text>
                                : <TextInput value={this.state.phone}
                                    onChangeText={(phone) => this.setState({ phone })}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    keyboardType="numeric"
                                    style={{ height: 25, flex: 1, borderRadius: 5, padding: 3, paddingLeft: 5, paddingRight: 5, fontSize: 16, borderWidth: StyleSheet.hairlineWidth }}

                                    />
                        }
                    </View>

                </ListItem>


                <ListItem iconLeft style={{ flex: 1, flexDirection: 'row' }}>
                    <Icon name="ios-paper" style={{ color: '#0A69FE' }} />
                    <Text style={{ justifyContent: "flex-start", paddingTop: 2, paddingLeft: 5, color: "black" }}>College </Text>
                    <View style={{ flex: 1, justifyContent: "flex-end", }}>
                        {
                            !this.state.editing
                                ? <Text style={{ color: "black" }}>{currentUser.college}</Text>
                                : <TextInput value={this.state.college}
                                    onChangeText={(college) => this.setState({ college })}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    style={{ height: 25, flex: 1, borderRadius: 5, padding: 3, paddingLeft: 5, paddingRight: 5, fontSize: 16, borderWidth: StyleSheet.hairlineWidth }}

                                    />
                        }
                    </View>

                </ListItem>

                <ListItem iconLeft>
                    <Icon name="ios-mail" style={{ color: '#0A69FE' }} />
                    <Text style={{ paddingLeft: 5, color: "black" }}>Email {currentUser.email}</Text>
                </ListItem>
            </List>

        </Card>

    }


    render() {
        const {name, role, phone, email, allowNotification, allowAnalytics } = this.props.currentUser
        const {changeNotificationAccess} = this.props
        const mainView = <Container>
            <Content>
                <View style={styles.profileInfoContainer}>
                    <View style={styles.profileNameContainer}>
                        <Text style={styles.profileName}>
                            {name}
                        </Text>
                        <View style={{ paddingLeft: 10, paddingTop: 4 }}>
                            <Badge success> {role || "user"}</Badge>
                        </View>

                    </View>
                    <TouchableOpacity style={styles.profileCountsContainer} onPress={this.props.cleanLogout}>
                        <Icon name="ios-power" size={30} color="white" style={styles.profileCounts} />
                        <Text style={styles.countsName}>  Logout  </Text>
                    </TouchableOpacity>
                </View>
                {this.renderProfileDetails()}
                <View style={{ flex: 1, flexDirection: 'row' }} >
                    {this.renderFavCard()}
                    {this.renderRegisteredCard()}
                </View>
                {this.renderCoordinatorCard()}

            </Content>
        </Container>
        return (
            this.state.loading ? <Loading /> : mainView
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profileInfoContainer: {
        flexDirection: 'row',
        height: 70,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 2,
        backgroundColor: '#4285f4'
    },
    profileNameContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',

    },
    profileName: {
        marginLeft: 20,
        fontSize: 20,
        color: '#ffffff',
    },
    profileCountsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5
    },
    profileCounts: {
        fontSize: 30,
        color: '#ffffff'
    },
    countsName: {
        fontSize: 12,
        color: '#ffffff'
    }
})

export default Profile;
