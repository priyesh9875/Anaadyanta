
import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    TouchableOpacity,

} from 'react-native';

import { Card, List, ListItem } from "native-base"
import { Icon, } from "react-native-elements";
import Hr from "@libs/Hr";
import CreatePDF from "@components/createPDF";

class RulesTab extends Component {


    render() {

        let mainView = null
        let count = 0;

        return (
            <List>
                <CreatePDF eventDetails={this.props.eventDetails} />
                {
                    this.props.eventDetails.rules.slice(0, 3).map((val, index) => {
                        return <ListItem style={{ padding: 10 }} key={index} >
                            <RulesRow rule={val} />
                        </ListItem>
                    })
                }
            </List>
        );

    }
}



class RulesRow extends Component {

    render() {
        let rulesView = null
        let { rule } = this.props
        if (rule.hasSubItem) {
            let subContent = rule.subContent.splice(0, 3)
            rulesView = <List>
                <Text style={{ color: 'black' }} >
                    {this.props.rule.name}
                </Text>
                {
                    subContent.map((val, index) => {
                        return <ListItem style={{ padding: 10, marginLeft: 0, paddingLeft: 10 }} key={index}>
                            <RulesRow rule={val} />
                        </ListItem>
                    })
                }
            </List>
        } else {
            rulesView = <Text  >
                {this.props.rule.name}
            </Text>
        }
        return (
            rulesView
        );
    }
}


export default RulesTab