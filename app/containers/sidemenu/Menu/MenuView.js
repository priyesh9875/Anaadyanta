
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ListView,
  InteractionManager,
  Platform,
  Linking
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Loading from "@components/general/Loading"
import { Container, Content, List, ListItem, Badge, Icon, Thumbnail } from 'native-base';
import { AppStyles, AppSizes } from '@theme/';

import { Text } from "@components/ui"

const menuList = [
  { text: "Profile", targetPage: "profile", icon: "ios-people" },
  { text: "Events", targetPage: "events", icon: "ios-aperture" },
  { text: "Contacts", targetPage: "contacts", icon: "ios-person" },
  { text: "About", targetPage: "about", icon: "ios-clipboard" },
  { text: "FAQ", targetPage: "faq", icon: "ios-paper" }
]

let mapUrl = ""
if (Platform.OS == 'ios') {
  mapUrl = "http://maps.apple.com/?ll=13.128464,77.587308,15"
} else {
  mapUrl = "geo:13.128464,77.587308,15"
}

class Menu extends Component {
  static propTypes = {
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
        <Image source={require("@images/launch/underwater5.jpg")} style={{  height: 700, width: null }}>

          <View style={{ height: 150,flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Thumbnail size={60} source={require("@images/user.png")} />

            <Text h3 style={{ padding: 10, color: 'black' }}>
              {name}
            </Text>
          </View>

          {role === 'admin'
            ? <View>
              <TouchableOpacity
                style={{  flexDirection: 'row', padding: 5, paddingTop: 10, paddingLeft: 35 }}
                onPress={() => { Actions.makeAnnouncement() } } >
                <Icon name="ios-mic" style={{ width: 35, color: 'green' }} />
                <Text p style={{ flex: 1, color: "green", paddingLeft: 10 }}>Make Announcement</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{  flexDirection: 'row', padding: 5, paddingTop: 10, paddingLeft: 35 }}
                onPress={() => { Actions.AddCoordinator() } } >
                <Icon name="ios-people" style={{ width: 35, color: 'green' }} />
                <Text p style={{ flex: 1, color: "green", paddingLeft: 10 }}>Add coordinator</Text>
              </TouchableOpacity>

            </View>
            : null
          }

          {
            menuList.map((val, index) => {

              return <TouchableOpacity
                key={index}
                style={{flexDirection: 'row', padding: 5, paddingTop: 20, paddingLeft: 35}}
                onPress={() => {
                  if (val.targetPage) Actions[val.targetPage]()
                  else {
                    Linking.openURL(mapUrl)
                  }
                } } >
                <Icon name={val.icon} style={{ width: 35, color: 'black' }} />
                <Text p style={{  color: "black", paddingLeft: 10 }}>{val.text}</Text>
              </TouchableOpacity>



            })
          }

        </Image>

      </Content>
    </Container>


    return (
      mainView
    );
  }
}

export default Menu

