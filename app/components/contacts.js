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

let data = [
    {
        name: "Ramish Kafrey",
        phone: "+91 7411600980",
        email: "ramishjafery@gmail.com",
        type: "Convener",
        image: "https://anaadyanta.org/img/ramish.jpg"
    },
    {
        name: "Shivam Dubey",
        phone: "+918050225474",
        email: "shivamdubet1103@gmail.com",
        type: "Sponsorship team",
        image: "https://anaadyanta.org/img/shivam.jpg"
    }, {
        name: "Arvind Balachandra",
        phone: "+919742423013",
        email: "arvind@anaadyanta.org",
        type: "Sponsorship team",
        image: "https://anaadyanta.org/img/arvind.jpg"
    }, {
        name: "Monica M Raju",
        phone: "+918971923839",
        email: "monica@anaadyanta.org",
        type: "Sponsorship team",
        image: "https://anaadyanta.org/img/monica.jpg"
    }, {
        name: "Dheeraj Ferrao",
        phone: "+91994594122",
        email: "dheerajferrao@gmail.com",
        type: "Registration",
        image: "https://anaadyanta.org/img/dheeraj.jpg"
    }, {
        name: "Lavanya",
        phone: "+919886525856",
        email: "lavanya@anaadyanta.org",
        type: "Registration",
        image: "https://anaadyanta.org/img/lavanya.jpg"
    }, {
        name: "Bharat Bijukumar",
        phone: "+919663605640",
        email: "bharatbijukumar@anaadyanta.org",
        type: "Event organizer",
        image: "https://anaadyanta.org/img/bharat.jpg"
    }, {
        name: "Aishwarya Gururaj",
        phone: "+919902646787",
        email: "aishwarya@anaadyanta.org",
        type: "Event organizers",
        image: "https://anaadyanta.org/img/aishwarya.jpg"
    },

]

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
            datasource: ds.cloneWithRows(data)
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
                <Thumbnail source={{ uri: row.image }}  size={40}/>
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


