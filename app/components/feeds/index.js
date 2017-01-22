import React, { Component } from 'react';
import { Card, ListItem, Thumbnail, CardItem } from 'native-base';
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
    RefreshControl,
    Text
} from 'react-native';
import { firebaseApp } from '@config/firebase'

import moment from "moment"
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Feeds extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedsListener: () => { },
            loading: true,
            isRefreshing: false,
            feeds: [],
            isMounted: true,
            datasource: ds.cloneWithRows([]),
            isRefreshed: true

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

        firebaseApp.database().ref('/feeds/').once('value', (snapshot) => {
            if (!snapshot.val()) return
            let feeds = Object.keys(snapshot.val()).map((key, index) => {
                return snapshot.val()[key]
            })
            this.props.saveFeeds(feeds)
        })


        this.setState({
            loading: false,
            datasource: ds.cloneWithRows(this.props.feeds),
            isMounted: true,
        })
    }

    componentWillUnmount() {

    }
    componentWillReceiveProps(nextProps) {
        if (!this.state.loading) {
            this.setState({
                datasource: ds.cloneWithRows(nextProps.feeds.reverse()),
            })
        }
    }




    refreshList() {
        this.setState({
            isRefreshing: true
        })
        firebaseApp.database().ref('/feeds/').once('value', (snapshot) => {
            let feeds = []
            if (snapshot.val()) {
                feeds = Object.keys(snapshot.val()).map((key, index) => {
                    return snapshot.val()[key]
                })
            }
            this.props.saveFeeds(feeds)

            this.setState({
                isRefreshing: false,
                isRefreshed: true,
            })

        })



    }

    getMainView() {
        if (this.props.feeds.length == 0) {
            return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 20 }} onPress={() => { this.refreshList() } } >No feeds available, click to refresh</Text>
            </View>
        }

        return <View style={{ backgroundColor: "white", padding: 5 }}>

            {
                this.state.isRefreshed
                    ? null
                    : <Text style={{ fontSize: 12, textAlign: "center" }}>Pull to refresh</Text>
            }
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
            <Card >
                <CardItem style={{ padding: 10 }}>
                    <Thumbnail size={40} square source={{ uri: row.image }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}> {row.title}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 12, color: "gray", paddingLeft: 5 }}>{moment(moment.unix(row.time)).fromNow()}</Text>
                            <Text style={{ flex: 1, fontSize: 12, color: "gray", paddingRight: 5, textAlign: 'right' }}>{row.author}</Text>
                        </View>
                    </View>
                </CardItem>

                <CardItem>


                    <Text style={{ fontSize: 15, flex: 1 }} >{row.description}</Text>
                    {
                        row.extras
                            ?

                            row.extras.map((val, index) => {
                                return <Text key={index}>{val.name}</Text>
                            })

                            : null
                    }

                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    cardTitle: {
        fontSize: 20,
        color: 'black',
    }
})
export default Feeds


