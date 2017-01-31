import React, { Component } from 'react';
import { Actions } from "react-native-router-flux";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput

} from 'react-native';

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 30,
        padding: 10,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3
    }
});

export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.currentUser,
            email: "",
            name: "",
        }
    }

    logout() {
        this.props.logout();
        Actions.login({ type: 'reset' })
    }

    componeneDidMount() {
        if (!this.props.currentUser || !this.props.currentUser.isLoggedIn) {
            alert("Login please")
            Actions.login({ type: 'reset' })

        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            currentUser: nextProps.currentUser
        })
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, textAlign: 'center', padding: 20 }}>React Native + Redux + Redux Persist + React Native Router Flux App</Text>

                {
                    this.state.currentUser && this.state.currentUser.isLoggedIn ?
                        <View>
                            <Text>Email: {this.state.currentUser.email || "Guest@example.com"}</Text>
                            <Text>Mobile: {this.props.currentUser.mobile || "0000"}</Text>
                            <Text>Uid: {this.props.currentUser.uid || "Default uid"}</Text>
                            <Text>Role: {this.props.currentUser.role || "No role"}</Text>
                            <Text>Name: {this.state.currentUser.name || "Guest"}</Text>

                            <View style={{ flexDirection: "row", paddingTop: 20 }}>

                                <TouchableOpacity onPress={Actions.counterApp} style={styles.button}>
                                    <Text>Counter</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.logout.bind(this)} style={styles.button}>
                                    <Text>logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View>
                            <Text>Please login to continue</Text>

                            <Text>Email: </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                />

                            <Text>Name: </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                />

                            <TouchableOpacity onPress={this.login.bind(this)} style={styles.button}>
                                <Text>Login</Text>
                            </TouchableOpacity>
                        </View>

                }

            </View>
        );
    }
}
