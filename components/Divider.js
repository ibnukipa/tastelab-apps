import React from 'react'
import { View, StyleSheet } from 'react-native'
import {PaddingSizeConstant} from "@constants/size";

const Divider = ({ style, space }) => (
  <View style={[styles.divider, space && { marginTop: space }, style]} />
)

const styles = StyleSheet.create({
  divider: {
    marginTop: PaddingSizeConstant.xSmall,
  },
})

export default Divider
