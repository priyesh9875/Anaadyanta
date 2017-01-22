import React, { Component } from 'react';
import { Container, Content, H1, Text, Card, List, ListItem, Thumbnail } from 'native-base';
import Loading from "@components/general/Loading";
import { AppSizes } from '@theme/';
import {
    View,
    Image,
    StyleSheet,
    InteractionManager,
    ListView,
    UIManager,
    LayoutAnimation,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { Icon } from "react-native-elements"
import { phonecall, text, email } from "react-native-communications"


var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Contacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            datasource: ds.cloneWithRows([1, 2, 3, 5, 6, 8, 4])
        }

        this.renderView = this.renderView.bind(this);
        this.refreshList = this.refreshList.bind(this)
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

    refreshList() {
        this.setState({
            isRefreshing: true
        })

        setTimeout(() => {
            this.setState({
                isRefreshing: false
            })
        }, 3000)

    }

    getMainView() {

        return <View style={{ backgroundColor: "white" }}>

            <Text style={{ fontSize: 12, textAlign: "center" }}>Pull to refresh</Text>
            <ListView
                dataSource={this.state.datasource}
                renderRow={(rowData) =>
                    <Row row={rowData} />
                }
                refreshControl={
                    <RefreshControl refreshing={this.state.isRefreshing}
                        onRefresh={this.refreshList.bind(this)}
                        />
                }
                >

            </ListView>
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
                    <Text style={{ fontSize: 15, flex: 1 }} >
                        {row.name}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => { phonecall("+91" + row.phone, true) } }>
                            <Icon name="call" size={20} color="blue" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { text("+91" + row.phone, true) } } style={{ paddingLeft: 20 }}  >
                            <Icon name="sms" size={20} color="green" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { email("priyesh9875@gmail.com", null, null, "Event", 'Hi ' + row.name) } } style={{ paddingLeft: 20 }}  >
                            <Icon name="email" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text note>{row.type}</Text>
            </ListItem>
        );
    }
}
export default Contacts


