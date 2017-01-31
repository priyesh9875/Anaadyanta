import React, { Component } from 'react';
import {
    InteractionManager,
    UIManager,
    LayoutAnimation,
} from 'react-native';

import Contacts from "@components/contacts"
class ContactsContainer extends Component {

    render() {
        const { contacts, actions} = this.props
        return (
            <Contacts {...actions} contacts={contacts} />
        );
    }
}


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ContactsActions from "@redux/contacts/action";

const mapStateToProps = state => ({
    contacts: state.contacts.contacts
})
const mapActions = dispatch => ({
    actions: bindActionCreators(ContactsActions, dispatch)
})

export default connect(mapStateToProps, mapActions)(ContactsContainer);


