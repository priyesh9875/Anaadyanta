
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
import { Container, Content, List, ListItem, Text, Badge, Icon } from 'native-base';
import { AppStyles, AppSizes } from '@theme/';


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
          <Image source={require("@images/banner3.jpg")} style={styles.profileInfoContainer}>
            <View style={styles.profileNameContainer}>
              <Text style={styles.profileName}>
                {name}
              </Text>

            </View>

          </Image>
          {role === 'admin'
            ? <View>
              <ListItem iconLeft onPress={() => { Actions.makeAnnouncement() } }>
                <Icon name="ios-mic" style={{ color: '#0A69FE' }} />
                <Text>Make Announcement</Text>
                <Text note><Icon name="ios-arrow-forward" style={{ color: '#0A69FE' }} /></Text>
              </ListItem>
              <ListItem iconLeft onPress={() => { Actions.AddCoordinator() } }>
                <Icon name="ios-mic" style={{ color: '#0A69FE' }} />
                <Text>Add coordinator</Text>
                <Text note><Icon name="ios-arrow-forward" style={{ color: '#0A69FE' }} /></Text>
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
                <Text>{val.text}</Text>
                <Text note><Icon name="ios-arrow-forward" style={{ color: '#0A69FE' }} /></Text>
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

const styles = StyleSheet.create({

  profileInfoContainer: {
    flexDirection: 'row',
    height: 200,
    backgroundColor: '#4285f4'
  },
  profileNameContainer: {
    position: 'absolute',
    bottom: 20,
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  profileName: {
    marginLeft: 20,
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    color: '#ffffff',
  },
  menuContainer: {
    padding: 5,
    margin: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#4285f4',
    flexDirection: "row",
    borderRadius: 5,
    marginLeft: 12,
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    padding: 10,
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: "black"
  },
  menuArrow: {
    fontSize: 30,
    paddingTop: 2,
    paddingRight: 10,
    fontFamily: 'Roboto-Bold'

  },
  profileCountsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5
  },
  profileCounts: {
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
    color: '#ffffff'
  },
  countsName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: '#ffffff'
  }
})


export default Menu

