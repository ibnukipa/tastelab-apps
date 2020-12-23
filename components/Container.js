import React from 'react'
import {StyleSheet, View} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import BarConstant from '@constants/bar'
import ColorConstant from "@constants/color"

const Container = ({backgroundColor, containerStyle, barStyle = 'dark', children, hasHeader}) => {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={[
        styles.container,
        !hasHeader && {paddingTop: insets.top},
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
    backgroundColor: ColorConstant.white,
  },
})

export default Container
