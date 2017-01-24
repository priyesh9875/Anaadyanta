import React, { Component } from 'react';
import { ListItem, Thumbnail } from 'native-base';
import Loading from "@components/general/Loading";
import { AppSizes } from '@theme/';
import {
    View,
    StyleSheet,
    InteractionManager,
    ListView,
    UIManager,
    LayoutAnimation,
    TouchableOpacity,
} from 'react-native';
import { Icon } from "react-native-elements"
import { phonecall, text, email } from "react-native-communications"
import { Text } from "@components/ui"

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Contacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            datasource: ds.cloneWithRows([])
        }

        this.renderView = this.renderView.bind(this);
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        InteractionManager.runAfterInteractions(this.renderView)
    }

    renderView() {

        this.setState({
            loading: false,
            datasource: ds.cloneWithRows(this.props.contacts)
        })
    }

    getMainView() {

        return <View style={{ backgroundColor: "white" }}>
            <ListView
                dataSource={this.state.datasource}
                renderRow={(rowData) =>
                    <Row row={rowData} />
                }
                />
        </View>


    }

    render() {

        return (
            this.state.loading ? <Loading /> : this.getMainView()
        );
    }
}

class Row extends Component {
    render() {
        const { row } = this.props;

        return (
            <ListItem >
                <Thumbnail source={require('@images/robo.jpg')} />
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={{ flex: 1, color: "black" }} >
                        {row.name}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => { phonecall(row.phone, true) } }>
                            <Icon name="call" size={20} color="blue" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { text(row.phone, true) } } style={{ paddingLeft: 20 }}  >
                            <Icon name="sms" size={20} color="green" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { email("priyesh9875@gmail.com", null, null, "Event", 'Hi ' + row.name) } } style={{ paddingLeft: 20 }}  >
                            <Icon name="email" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{ fontSize: 12, color: "gray" }}>{row.type}</Text>
            </ListItem>
        );
    }
}
export default Contacts


