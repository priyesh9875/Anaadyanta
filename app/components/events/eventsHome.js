
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  ListView,
  TouchableOpacity,
  InteractionManager,
  UIManager,
  LayoutAnimation,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Loading from "@components/general/Loading";
import { Card, Button } from 'react-native-elements'
import Background from '@components/ui/background'
import { Text } from "@components/ui"
const backImages = [
  require("@images/launch/underwater1.jpeg"),
]

const category = [
  { title: "Pro Nites", pic: require("@images/proshow.jpeg"), category: 2, description: "Bonfire night, Proshow..." },
  { title: "Cultural", pic: require("@images/music.jpg"), category: 1, description: "Fashion show, Music, Dance, DJ night" },
  { title: "Technical", pic: require("@images/tech.jpg"), category: 3, description: "Cube open, Hackathon, Robowars" },

]

class EventsHome extends Component {

  static componentName = 'EventsHome';

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    },
      this.renderView = this.renderView.bind(this)
  }


  componentDidMount = () => {
    InteractionManager.runAfterInteractions(this.renderView)
  }

  renderView() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    this.setState({
      loading: false
    });
  }

  render() {
    const view = <View>

      <Background imgSource={backImages[0]} />
      <ScrollView style={{ paddingBottom: 20 }}>

        {category.map((item, index) => {
          return <EventCategory {...this.props} key={index} item={item} />
        })}
      </ScrollView>
    </View>
    return (
      this.state.loading ? <Loading /> : view
    );
  }
}

class EventCategory extends Component {

  changeCategory() {
    var title = "Event list - All";
    switch (this.props.item.category) {
      case 1: title = "Cultural events"; break;
      case 2: title = "Pro Nites"; break;
      case 3: title = "Technical events"; break;
    }
    Actions.allEvents({ category: this.props.item.category, title })
  }

  render() {
    return (

      <Card
        title={this.props.item.title}
        image={this.props.item.pic}
        titleStyle={{ textAlign: "center", fontSize: 24, color: "white", fontWeight: 'bold' }}
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        wrapperStyle={{ margin: 0 }}
        >
        <Text p numberOfLines={1} style={{ textAlign: "center", marginBottom: 10, fontSize: 15 }}>{this.props.item.description}</Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor='#4285f4'
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='VIEW NOW'
          onPress={this.changeCategory.bind(this)}
          />

      </Card>


    );
  }
}

export default EventsHome;
