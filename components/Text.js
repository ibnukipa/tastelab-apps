import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';

import {AlignConstant} from 'constants/align';
import {FontSizeConstant} from 'constants/size';
import ColorConstant from 'constants/color';

const Text = ({
  children,
  color = ColorConstant.blueGray600,
  lineHeight,
  letterSpacing = 0.3,
  size = 'medium',
  align = 'left',
  lighter,
  light,
  bold,
  bolder,
  medium,
  underline,
  style,
  ...props
}) => (
  <RNText
    onPress={props.onPress}
    style={[
      styles.text,
      letterSpacing && { letterSpacing },
      color && { color },
      lineHeight && { lineHeight },
      lighter && styles.lighter,
      light && styles.light,
      bold && styles.bold,
      bolder && styles.bolder,
      medium && styles.medium,
      underline && styles.underline,
      { textAlign: AlignConstant[align] },
      { fontSize: FontSizeConstant[size] },
      style,
    ]}
    {...props}
    allowFontScaling={false}
  >
    {children}
  </RNText>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
  },
  lighter: {
    fontFamily: 'Roboto-Light',
  },
  light: {
    fontFamily: 'Roboto-Thin',
  },
  medium: {
    fontFamily: 'Roboto-Medium',
  },
  bold: {
    fontFamily: 'Roboto-Bold',
  },
  bolder: {
    fontFamily: 'Roboto-Black',
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export default Text;
