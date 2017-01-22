import React, { Component } from "react";
import {
    View,
    Text
} from "react-native";
import { Icon } from "react-native-elements";

export default class IconText extends Component {
    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                <Icon name={this.props.name} type={this.props.type} color={this.props.color} size={this.props.size} />
                <Text style={[textStyle, this.props.textStyle]}>
                    {" "}{this.props.text}
                </Text>
            </View>
        );
    }
}

let textStyle = {
    color: "white",
    fontSize: 20
}

IconText.defaultProps = {
    text: "IconText",
    size: 30,
    name: "people",
    color: "red",
    type: "material",
}
