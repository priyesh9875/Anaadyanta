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
} from 'react-native';
import { firebaseApp } from '@config/firebase'
import { Text } from "@components/ui"
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
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        InteractionManager.runAfterInteractions(this.renderView)
    }

    renderView() {

        fetch(`https://anaadyanta-7f08a.firebaseio.com/feeds.json?orderBy="time"&limitToLast=50`)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    let feeds = []
                    Object.keys(responseJson).map(key => {
                        if (responseJson[key].title)
                            feeds.push(responseJson[key])
                    })

                    this.props.saveFeeds([
                        {
                            title: `Welcome ${this.props.currentUser.name}`,
                            description: `Thank you for joining anaadyanta journey. For any queries about the app, drop an email to appteam17@anaadyanta.org`,
                            sticky: true,
                            author: 'admin',
                            image: "https://res.cloudinary.com/dep8pxurn/image/upload/v1487272096/ic_launcher_ayluas.jpg"
                        }, ...feeds
                    ])

                }
            })
            .catch(() => {
                if (this.props.feeds.length <= 1) {
                    this.props.saveFeeds([
                        {
                            title: `Welcome ${this.props.currentUser.name}`,
                            description: `Thank you for joining anaadyanta journey. For any queries about the app, drop an email to appteam17@anaadyanta.org`,
                            sticky: true,
                            author: 'admin',
                            image: "https://res.cloudinary.com/dep8pxurn/image/upload/v1487272096/ic_launcher_ayluas.jpg"
                        }
                    ])
                }
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


    getMainView() {
        if (this.props.feeds.length == 0) {
            return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text p style={{ color: "black", textAlign: "center" }}  >No feeds available, auto fetch when internet connection is available</Text>
            </View>
        }

        return <View style={{ padding: 5, paddingLeft: 10, paddingRight: 10 }}>


            <ListView
                dataSource={this.state.datasource}
                renderRow={(rowData) =>
                    <Row row={rowData} />
                }
                enableEmptySections
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
                        <Text style={{ color: "black" }}> {row.title}</Text>
                        {
                            !row.sticky
                                ? <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 12, color: "gray", paddingLeft: 5 }}>{moment(moment.unix(row.time)).fromNow()}</Text>
                                    <Text style={{ flex: 1, fontSize: 12, color: "gray", paddingRight: 5, textAlign: 'right' }}>{row.author}</Text>
                                </View>
                                : null
                        }
                    </View>
                </CardItem>

                <CardItem>
                    <Text style={{ fontSize: 14, color: "black" }} >{row.description}</Text>
                    {
                        row.extras
                            ?

                            row.extras.map((val, index) => {
                                return <Text key={index} style={{ color: "black", fontSize: 14 }}>{val.name}</Text>
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
        color: 'black',
    }
})
export default Feeds


