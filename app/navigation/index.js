
import React from 'react';
import { Actions, Scene, ActionConst } from "react-native-router-flux";

import Dashboard from "@containers/dashboard";
import Profile from "@containers/ProfileContainer";
import Auth from "@containers/auth";
import SyncServer from "@containers/syncServer";

// Consts and Libs
import AppConfig from '@config/constants';
import { AppStyles, AppSizes } from '@theme/';

import Placeholder from '@components/general/Placeholder';
import LocateUs from '@containers/locateUs';
import FAQ from '@containers/faq';
import SetWinners from '@components/events/SetWinners';
import UpdateEventDetails from '@components/events/UpdateEventDetails';
import MakeAnnouncement from '@components/dashboard/makeAnnouncement';
import AddEvent from '@components/dashboard/AddEvent';
import AddCoordinatorContainer from '@containers/AddCoordinatorContainer';

import Drawer from '@containers/sidemenu/DrawerContainer';
import AllEventsContainer from '@containers/events/allEventsContainer';
import FavEventsContainer from '@containers/events/favEventsContainer';
import RegEventsContainer from '@containers/events/regEventsContainer';
import CoordinatingEventsContainer from '@containers/events/coordEventsContainer';
import EventDetails from '@containers/events/eventDetailsContainer';
import Sponsors from '@containers/sponsors';
import About from '@containers/about';
import ContactsContainer from '@containers/contactsContainer';
import EventsHome from '@components/events/eventsHome';
import FeedsContainer from '@containers/feedsContainer';


const navbarProps = {
    ...AppConfig.navbarProps,
    sceneStyle: {
        ...AppConfig.navbarProps.sceneStyle,
    },
};
export default Actions.create(

    <Scene key="root" >


        <Scene
            key="login"
            component={Auth}
            hideNavBar
            initial
            />


        <Scene
            key="syncServer"
            component={SyncServer}
            hideNavBar
            />

        <Scene key={'dashboard'} component={Drawer} >
            <Scene
                key="home"
                title="Dashboard"
                component={Dashboard}
                hideNavBar
                />
        </Scene>


        <Scene
            key="about"
            title="About"
            component={About}
            {...navbarProps}
            />

        <Scene
            key="profile"
            title="Profile"
            component={Profile}
            {...navbarProps}
            />

        <Scene
            key="contacts"
            title="Contacts"
            component={ContactsContainer}
            {...navbarProps}

            />

        <Scene
            key="locateUs"
            title="Locate Us"
            component={LocateUs}
            {...navbarProps}
            />
        <Scene
            key="faq"
            title="FAQ"
            component={FAQ}
            {...navbarProps}
            />

        <Scene
            key="schedule"
            title="Schedule"
            component={Placeholder}
            {...navbarProps}

            />
        <Scene
            key="events"
            title="Events"
            component={EventsHome}
            {...navbarProps}

            />


        <Scene
            key="allEvents"
            title="All Events"
            component={AllEventsContainer}
            {...navbarProps}

            />

        <Scene
            key="eventDetails"
            title=""
            component={EventDetails}
            direction="vertical"
            {...navbarProps}
            
            />

        <Scene
            key="myEvents"
            title="My Events"
            component={FavEventsContainer}
            {...navbarProps}

            />

        <Scene
            key="setWinners"
            title="Set winners"
            component={SetWinners}
            {...navbarProps}

            />

        <Scene
            key="updateEventDetails"
            title="Update Event"
            component={UpdateEventDetails}
            {...navbarProps}

            />
        <Scene
            key="registeredEvents"
            title="Registered Events"
            component={RegEventsContainer}
            {...navbarProps}

            />
        <Scene
            key="coordEvents"
            title="Coordinating events"
            component={CoordinatingEventsContainer}
            {...navbarProps}

            />



        <Scene
            key="makeAnnouncement"
            title="Make Announcement"
            component={MakeAnnouncement}
            {...navbarProps}
            />

        <Scene
            key="AddCoordinator"
            title=" AddCoordinator"
            component={AddCoordinatorContainer}
            {...navbarProps}
            />



        <Scene
            key="feeds"
            title="Feeds"
            component={FeedsContainer}
            {...navbarProps}
            />
        <Scene
            key="sponsors"
            title="Sponsors"
            component={Sponsors}
            {...navbarProps}
            
            />


        <Scene
            key="AddEvent"
            title=" Add event"
            component={AddEvent}
            {...navbarProps}
            />




    </Scene>

);