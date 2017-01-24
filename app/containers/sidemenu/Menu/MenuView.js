
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ListView,
  InteractionManager,
  Platform,
  Linking
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Loading from "@components/general/Loading"
import { Container, Content, List, ListItem, Badge, Icon } from 'native-base';
import { AppStyles, AppSizes } from '@theme/';

import { Text } from "@components/ui"

const menuList = [
  { text: "Events", targetPage: "events", icon: "ios-aperture" },
  { text: "Feeds", targetPage: "feeds", icon: "ios-pulse" },
  { text: "Locate Us", icon: "ios-navigate" },
  { text: "Sponsors", targetPage: "sponsors", icon: "ios-people" },
  { text: "Contacts", targetPage: "contacts", icon: "ios-contacts" },
  { text: "About", targetPage: "about", icon: "ios-clipboard" }
]

let mapUrl = ""
if (Platform.OS == 'ios') {
  mapUrl = "http://maps.apple.com/?ll=13.128464,77.587308,15"
} else {
  mapUrl = "geo:13.128464,77.587308,15"
}

class Menu extends Component {
  static propTypes = {
    closeSideMenu: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
      name: PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
  }


  componentDidMount() {

  }

  render = () => {
    const { name, role } = this.props.currentUser
    const mainView = <Container>
      <Content>
        <List>
          <Image source={require("@images/banner3.jpg")} style={{ height: 200 }}>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text h3 style={{ padding: 10 }}>
                {name}
              </Text>
            </View>

          </Image>
          {role === 'admin'
            ? <View>
              <ListItem iconLeft onPress={() => { Actions.makeAnnouncement() } } >
                <Icon name="ios-mic" style={{ color: '#0A69FE' }} />
                <Text  style={{ color: "#0A69FE", paddingLeft: 10 }}>Make Announcement</Text>
              </ListItem>
              <ListItem iconLeft onPress={() => { Actions.AddCoordinator() } }>
                <Icon name="ios-people" style={{ color: '#0A69FE' }} />
                <Text  style={{ color: "#0A69FE", paddingLeft: 10 }}>Add coordinator</Text>
              </ListItem>
            </View>
            : null
          }

          {
            menuList.map((val, index) => {

              return <ListItem iconLeft key={index} onPress={() => {
                if (val.targetPage) Actions[val.targetPage]()
                else {
                  Linking.openURL(mapUrl)
                }
              } }>
                <Icon name={val.icon} style={{ color: '#0A69FE' }} />
                <Text  style={{ color: "#0A69FE", paddingLeft: 10 }}>{val.text}</Text>
              </ListItem>
            })
          }
        </List>
      </Content>
    </Container>


    return (
      mainView
    );
  }
}

export default Menu

