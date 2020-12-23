import React from 'react'
import { View, StyleSheet } from 'react-native'
import {PaddingSizeConstant} from "@constants/size";
import ColorConstant from "@constants/color";

const DEFAULT_SPACE = PaddingSizeConstant.xSmall
const Divider = ({ style, space = DEFAULT_SPACE, line }) => (
  <View style={[styles.divider, line && styles.line, space && !line && { marginTop: space/2, marginBottom: space/2 }, style]} />
)

const styles = StyleSheet.create({
  line: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ColorConstant.blueGray50,
  }
})

export default Divider
