import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,

} from 'react-native';

import { phonecall, text, email } from 'react-native-communications';
import { List, ListItem } from "native-base"
import { Icon, } from "react-native-elements";

class CoordinatorTab extends Component {
    render() {

        if (!this.props.coordinators || this.props.coordinators.length < 1) {
            return <View style={{ paddingTop: 5 }}>
                <Text style={{ textAlign: "center" }}> No coordinator was assigned</Text>

            </View>
        }
        return (
            <View style={{ paddingTop: 5 }} >
                <List>
                    {
                        this.props.coordinators.map((val, index) => {
                            return <ListItem iconLeft key={index} >
                                <CoordinatorRow coordinator={val} />
                            </ListItem>
                        })
                    }
                </List>
            </View>
        );

    }
}

class CoordinatorRow extends Component {
    render() {
        return (
            <View style={styles.coordinatorRow}>
                <Text style={{ fontSize: 15 }}>
                    {this.props.coordinator.name}
                </Text>

                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => { phonecall(this.props.coordinator.phone, true) } }>
                        <Icon name="call" size={30} color="blue" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { text(this.props.coordinator.phone, true) } } style={{ paddingLeft: 30 }}  >
                        <Icon name="sms" size={30} color="green" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    coordinatorRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20
    },
});

export default CoordinatorTab