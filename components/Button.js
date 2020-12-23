import React from 'react'
import {StyleSheet} from 'react-native'
import Touchable from "@components/Touchable"
import ColorConstant from "@constants/color"
import Text from "@components/Text"
import {PaddingSizeConstant} from "@constants/size"

const Button = ({onPress, name, isDisabled}) => (
  <Touchable style={[styles.button, isDisabled && styles.disabled]} isDisabled={isDisabled} onPress={onPress}>
    <Text medium align={'center'} size={'large'} color={ColorConstant.white}>{name}</Text>
  </Touchable>
)

const styles = StyleSheet.create({
  button: {
    paddingVertical: PaddingSizeConstant.medium,
    marginBottom: PaddingSizeConstant.medium,
    backgroundColor: ColorConstant.blueGray700,
    borderRadius: 5,
  },
  disabled: {
    backgroundColor: ColorConstant.blueGray,
  }
})

export default Button
