
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ListView,
    InteractionManager,
} from 'react-native';

import { Actions } from 'react-native-router-flux';



import Loading from "@components/general/Loading"
import { AppStyles, AppSizes } from '@theme/';
import CarouselView from "@components/CarouselView";

const styles = StyleSheet.create({

    launchImage: {
        width: AppSizes.screen.width,
        height: AppSizes.screen.height,
    },
    aboutContainer: {
        alignItems: "center",
    },
    aboutHeading: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black"
    },
    aboutBody: {
        fontSize: 16,
        textAlign: "center"
    },
    featureContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 5
    },
    featureItem: {
        flex: 1,
        borderWidth: 1,
        padding: 5,
        margin: 5
    },
    featureHeading: {
        textAlign: "center",
        fontSize: 25,
        color: "green",
        fontWeight: "bold"
    },
    featureBody: {
        textAlign: "center",
        fontSize: 20,
    },
    updatesContainer: {
        flex: 1,
        borderWidth: 1,
        padding: 5,
    },
    updatesHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    updatesMain: {
        fontSize: 20,
        fontWeight: "bold",
        color: "green"
    },
    updateMore: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

import Feeds from './Feeds';


import Home from "./Home"
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
/* Component ==================================================================== */
class HomeView extends Component {
    static componentName = 'AppLaunch';
    constructor(props) {
        super(props)
        this.state = {
            dataSource: ds.cloneWithRows([]),
            loading: true,
        };

    }
    componentDidMount = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                loading: false,
                dataSource: ds.cloneWithRows(this.props.feeds)
            })
        })

    }

    render() {
        const mainView = <View style={styles.updatesContainer}>
            <View style={styles.updatesHeader}>
                <Text style={styles.updatesMain}>Updates</Text>
                <TouchableOpacity onPress={() => { Actions.feeds() } } ><Text style={styles.updateMore}>More</Text></TouchableOpacity>
            </View>

            <View style={styles.updatesList}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <UpdatesItem item={rowData} />}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={s.separator} />}
                    />
            </View>
        </View>
        return (

            this.state.loading ? <Loading /> : mainView

        );
    }
}

import { Icon } from 'react-native-elements'


class UpdatesItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (

            <View style={s.container}>
                <View style={{ flex: 1 }}>
                    <Text style={s.title}>
                        New Update Title
            </Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        {this.props.item.pic ? <Image source={this.props.item.pic} style={s.photo} /> : null}

                        <View style={{ flex: 1 }}>
                            <View >
                                <Text style={{ paddingLeft: 10 }}>{this.props.item.description}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
                                <View style={{ flex: 1, flexDirection: "row" }}><Icon name='person' color='#00aced' /><Text>  {this.props.item.author}</Text></View>
                                <View style={{ flexDirection: "row" }}><Icon name='date-range' color='#00aced' /><Text>  {this.props.item.date}  </Text></View>
                                <View style={{ flexDirection: "row" }}><Icon name='query-builder' color='#00aced' /><Text>  {this.props.item.time}</Text></View>
                            </View>

                        </View>
                    </View>
                </View>
            </View>

        );
    }
}

/* Export Component ==================================================================== */





const s = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: 'row',
    },
    title: {
        paddingLeft: 8,
        fontSize: 20,
        color: "black"

    },
    description: {
        flex: 1,
        flexWrap: "nowrap",
        paddingLeft: 8
    },
    photo: {
        marginTop: 5,
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#8E8E8E',
    },
    category: {
        flex: 1,
        alignItems: "flex-end"
    }
})



import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
// Actions
import EventsActions from '@redux/events/actions';

// The component we're mapping to
import AppLaunchRender from './HomeView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({

    feeds: state.feeds.feeds.slice(0, 4)

});


// Any actions to map to the component?
const mapDispatchToProps = dispatch => ({
    // eventsActions: bindActionCreators(EventsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
