import React  from 'react';
import { Ionicons as VIcon } from '@expo/vector-icons';

import { FontSizeConstant } from '@constants/size';
import ColorConstant from '@constants/color';

import Touchable from '@components/Touchable';
import {Animated} from 'react-native';

const VIconAnim = Animated.createAnimatedComponent(VIcon);

const Icon = ({
  name = 'contrast-outline',
  color = ColorConstant.black,
  size = 'medium',
  ...props
}) => {
  return (
    <Touchable onPress={props.onPress}>
      <VIconAnim {...props} color={color} name={name} size={FontSizeConstant[size]} />
    </Touchable>
  );
};

export default Icon;
