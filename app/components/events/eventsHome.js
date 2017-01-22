
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  ListView,
  TouchableOpacity,
  InteractionManager,
  UIManager,
  LayoutAnimation,
} from 'react-native';

import { Actions, ActionConst } from 'react-native-router-flux';
import { AppStyles, AppSizes } from '@theme/';
import Loading from "@components/general/Loading";
import { Card, Icon, Button } from 'react-native-elements'
import Background from '@components/ui/background'
const backImages = [
  require("@images/launch/underwater1.jpeg"),
  require("@images/launch/underwater2.jpeg"),
  require("@images/launch/underwater3.png"),
  require("@images/launch/underwater4.jpeg"),
]
const styles = StyleSheet.create({
  categoryImage: {
    height: 150,
    width: 400
  },
  categoryTitle: {
    paddingLeft: 8,
    fontSize: 20,
    color: "black"
  },
  categoryContainer: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    alignItems: "center"
  }
});

const category = [
  { title: "Technical", pic: require("@images/tech.jpg"), category: 3, description: "Robowars, Hackathon, Jahaaz, Programming" },
  { title: "Cultural", pic: require("@images/music.jpg"), category: 1, description: "Fashion show, Music, Dance, DJ night" },
  { title: "Games and Sports", pic: require("@images/sport.jpg"), category: 2, description: "Soccer, BasketBall, Counter Strike NFS" },

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

      <Background imgSource={backImages[2]} />
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
      case 1: title = "Cultural"; break;
      case 2: title = "Games and Sports"; break;
      case 3: title = "Technical"; break;
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
        <Text numberOfLines={1} style={{ color: 'white', textAlign: "center", marginBottom: 10, fontSize: 15 }}>{this.props.item.description}</Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor='#4285f4'
          fontFamily='Lato'
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='VIEW NOW'
          onPress={this.changeCategory.bind(this)}
          />

      </Card>


    );
  }
}

export default EventsHome;
