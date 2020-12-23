import React from 'react'
import {Ionicons, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'

import {FontSizeConstant} from '@constants/size'
import ColorConstant from '@constants/color'

import Touchable from '@components/Touchable'
import {Animated} from 'react-native'

const IoniconsAnimated = Animated.createAnimatedComponent(Ionicons)
const FontAwesome5Animated = Animated.createAnimatedComponent(FontAwesome5)
const MaterialCommunityIconsAnimated = Animated.createAnimatedComponent(MaterialCommunityIcons)

const TYPES = {
  ionic: IoniconsAnimated,
  awesome: FontAwesome5Animated,
  material: MaterialCommunityIconsAnimated
}

const Icon = ({name = 'contrast-outline', color = ColorConstant.black, size = 'medium', type = 'ionic', ...props}) => {
  const Component = TYPES[type]
  return (
    <Touchable onPress={props.onPress}>
      <Component {...props} color={color} name={name} size={FontSizeConstant[size]}/>
    </Touchable>
  );
};

export default Icon;
