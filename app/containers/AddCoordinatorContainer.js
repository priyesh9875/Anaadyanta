import React, { Component } from 'react'
import {
    InteractionManager,
    UIManager,
    LayoutAnimation,
    View,
    Button
} from 'react-native'
import { Text } from "@components/ui"
import { firebaseApp } from '@config/firebase'

import AddCoordinator from "@components/dashboard/AddCoordinator"
import Loading from "@components/general/Loading";
class AddCoordinatorContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            fetchingData: false,
            fetchedDate: false
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            this.setState({
                loading: false,
            })
        })
    }


    fetchUsers() {
        this.setState({
            fetchingData: true
        })
        firebaseApp.database().ref('/users/').orderByChild('management').equalTo(true).once('value', (snaphot) => {
            
            if(!snaphot.val()) {
                alert("Fetch exception: SNAPSHOT NULL")
                return
            }
            // let db = {}
            // Object.keys(snaphot.val()).map( key => {
            //     if(snaphot.val()[key].role == 'coordinator' || snaphot.val()[key].role == 'admin')
            //     db[key] = snaphot.val()[key]
            // })
            this.setState({
                db: snaphot.val(),
                fetchedDate: true
            })
        })
    }

    renderView() {
        if (!this.state.fetchedDate) {
            return <View style={{ flex: 1, backgroundColor: 'white', justifyContent: "center", alignItems: "center" }}>
                <Text  style={{ textAlign: 'center', color: "black" }}>This action requires good internet speed as it fetches all coordinators database from server</Text>
                <Button title={this.state.fetchingData ? "Fetching" : "Fetch data"} onPress={() => { this.fetchUsers() } } />
            </View>
        }

        return <AddCoordinator
            allEvents={this.props.allEvents}
            updateEvent={this.props.eventActions.updateEvent}
            currentUser={this.props.currentUser}
            db={this.state.db}
            />

    }
    render() {
        return (
            this.state.loading ? <Loading /> : this.renderView()
        );
    }
}



import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from "@redux/user/action"
import * as eventActions from "@redux/events/action"

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    allEvents: state.events.allEvents,
    db: state.currentUser.db

})
const mapActions = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    eventActions: bindActionCreators(eventActions, dispatch),
})

export default connect(mapStateToProps, mapActions)(AddCoordinatorContainer);

