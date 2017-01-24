import React, { Component } from 'react';
import { Card } from 'native-base';
import { Text } from "@components/ui"

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
    TouchableOpacity
} from 'react-native';


const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-around",
        alignItems: 'flex-start',

    },
    item: {
        width: AppSizes.screen.width / 2 - 8,
        height: 180,
        margin: 3,
        padding: 0,
    },
    itemImage: {
        width: AppSizes.screen.width / 2,
        height: 180,
    }
});

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Sponsors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: ds.cloneWithRows([])
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
            dataSource: ds.cloneWithRows(this.props.sponsors)
        })
    }

    getMainView() {
        return <Card
            containerStyle={{ margin: 5, paddingTop: 20 }}
            wrapperStyle={{ margin: 0, padding: 0 }}
            >
            <Text  style={{color: "black", textAlign: "center", padding: 10}}>We are greatly thankful to following sponsors for their support</Text>
            <ListView contentContainerStyle={styles.list}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <SponsorsRowItem item={rowData} />}
                />
        </Card>
    }

    render() {

        return (
            this.state.loading ? <Loading /> : this.getMainView()
        );
    }
}

class SponsorsRowItem extends Component {
    render() {
        return (
            <View style={styles.item}>
                <Image source={this.props.item.pic} style={styles.itemImage} />
            </View>
        );
    }
}


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    sponsors: state.sponsors
})
const mapActions = dispatch => ({
})

export default connect(mapStateToProps, mapActions)(Sponsors);

