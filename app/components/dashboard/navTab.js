import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
class NavTab extends Component {

    render() {
        return <View style={styles.tabs}>
            <TouchableOpacity style={styles.titleContainer} onPress={this.props.toggleSideMenu}>
                <Icon name="view-headline" size={30} />
            </TouchableOpacity>

            {this.props.tabs.map((tab, i) => {
                return (
                    <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                        <Icon
                            name={tab}
                            size={30}
                            color={this.props.activeTab === i ? 'black' : 'red'}
                            />
                    </TouchableOpacity>
                )
            })}
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
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#4285f4',
        elevation: 5
    },
    titleContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    title: {
        fontFamily: 'MagmaWave',
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