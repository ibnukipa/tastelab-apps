import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import BarConstant from '@constants/bar';

const Container = ({backgroundColor, containerStyle, barStyle = 'dark', children}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top},
        backgroundColor && {backgroundColor},
        containerStyle,
      ]}
    >
      <StatusBar translucent style={barStyle && BarConstant[barStyle]}/>
      {children}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Container;
