import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { AppSizes } from '@theme/';
class NavTab extends Component {

    render() {
        return <View style={[styles.tabs]}>
            <TouchableOpacity style={styles.titleContainer} onPress={this.props.toggleSideMenu}>
                <Icon name="view-headline" size={30} color='white' />
            </TouchableOpacity>
            <View style={{
                flex: 1,
                justifyContent: "center",
                paddingLeft: 20
            }}>
                <Text style={{
                    fontSize: 20,
                    color: "white",
                    fontWeight: "bold",
                }}>Anaadyanta 17</Text>
            </View>
        </View>
    }
}

NavTab.PropTypes = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    toggleSideMenu: React.PropTypes.func
}


const styles = StyleSheet.create({
    tabs: {
        height: AppSizes.navbarHeight,
        flexDirection: 'row',
        backgroundColor: '#0E4EF8',
        elevation: 5
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,
        width: 50
    },
    title: {
        fontSize: 20,
        color: '#ffffff'
    },
    tab: {
        paddingRight: 25,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default NavTab;