
import React, { PropTypes, Component } from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';

// Consts and Libs
import { AppStyles } from '@theme/';

/*

 Component ==================================================================== */
const Loading = ({ text, transparent }) => (
  <View
    style={[
      AppStyles.container,
      AppStyles.containerCentered,
      transparent && { backgroundColor: 'rgba(255,255,255,0.75)' },
    ]}
    >
    <ActivityIndicator
      animating
      size={'large'}
      color={transparent ? '#000' : '#AAA'}
      />

  </View>
);

Loading.propTypes = {
  text: PropTypes.string,
  transparent: PropTypes.bool,
};

/* Export Component ==================================================================== */
export default Loading;
