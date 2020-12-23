import React, {useState, useCallback} from 'react';
import {
  TextInput as RNTextInput,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import {Controller} from 'react-hook-form';

import ColorConstant from '@constants/color';
import {FontSizeConstant} from '@constants/size';

import Text from '@components/Text';
import Icon from '@components/Icon';
import Divider from '@components/Divider';

const TEXT_PADDING = 8;

const TextInput = ({
  title,
  containerStyle,
  style,
  secureTextEntry,
  infoMessage,
  errorMessage,
  iconPosition = 'right',
  iconName,
  iconOnPress,
  control,
  name,
  defaultValue = '',
  isSpace = true,
  isDimmed = false,
  isClear = false,
  isLight = false,
  watch,
  setValue,
  opacityAnim,
  onChangeHandler = () => {},
  onClear = () => {},
  ...restProps
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const hasIconLeft = iconName && iconPosition === 'left';
  const hasIconRight = iconName && iconPosition === 'right';
  const watchInput = watch?.(name);
  const [iconColor] = useState(isLight ? ColorConstant.blueGray : ColorConstant.white)
  const onPressSecure = useCallback(() => setIsSecure(!isSecure), [isSecure])
  const onPressClear = useCallback(() => {
    setValue?.(name, '')
    onClear()
  }, [onClear, setValue])
  return (
    <View>
      {title && <Text medium color={ColorConstant.primary}>{title}</Text>}
      <View
        style={[
          styles.container,
          isLight && styles.lightContainer,
          errorMessage && styles.containerError,
          containerStyle,
          isSpace && styles.containerSpace,
          isDimmed && styles.containerDimmed,
        ]}
      >
        {hasIconLeft && (
          <Icon
            color={iconColor}
            onPress={iconOnPress}
            style={styles.iconContainerLeft}
            name={iconName}
          />
        )}
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({onChange, onBlur, value}) => (
            <RNTextInput
              underlineColorAndroid={'transparent'}
              style={[
                styles.textInput,
                hasIconLeft && styles.textInputHasIconLeft,
                hasIconRight && styles.textInputHasIconRight,
                style,
              ]}
              placeholderTextColor={isLight ? ColorConstant.blueGray100 : ColorConstant.whiteDimmed}
              secureTextEntry={isSecure}
              onBlur={onBlur}
              onChangeText={(changedValue) => {
                onChange(changedValue)
                onChangeHandler(changedValue)
              }}
              value={value}
              {...restProps}
            />
          )}
        />

        {secureTextEntry && (
          <Icon
            color={iconColor}
            onPress={onPressSecure}
            style={styles.iconContainerRight}
            name={!isSecure ? 'eye-outline' : 'eye-off-outline'}
          />
        )}
        {isClear && !!watchInput && (
          <Icon
            color={iconColor}
            onPress={onPressClear}
            style={styles.iconContainerRight}
            name={'close-circle'}
          />
        )}
        {hasIconRight && (
          <Icon
            color={ColorConstant.white}
            onPress={iconOnPress}
            style={styles.iconContainerRight}
            name={iconName}
          />
        )}
      </View>
      <View>
        {errorMessage && (
          <Text numberOfLines={1} size={'small'} color={ColorConstant.red} style={styles.message}>
            {errorMessage}
          </Text>
        )}
        {!errorMessage && infoMessage && (
          <Text numberOfLines={1} size={'small'} color={ColorConstant.grey} style={styles.message}>
            {infoMessage}
          </Text>
        )}
      </View>
      {isSpace && <Divider space={infoMessage ? 25 : 20}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorConstant.white,
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ColorConstant.blueGray,
  },
  containerDimmed: {
    backgroundColor: ColorConstant.whiteDimmed,
  },
  containerSpace: {
    marginTop: 5,
  },
  containerError: {
    borderColor: ColorConstant.red,
  },
  message: {
    position: 'absolute',
    marginTop: 2,
  },
  textInput: {
    flex: 1,
    fontSize: FontSizeConstant.medium,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    ...Platform.select({
      ios: {
        paddingTop: TEXT_PADDING,
        paddingBottom: TEXT_PADDING,
        paddingLeft: TEXT_PADDING,
        paddingRight: TEXT_PADDING,
      },
      android: {
        paddingLeft: TEXT_PADDING,
        paddingRight: TEXT_PADDING,
        paddingTop: TEXT_PADDING - 5,
        paddingBottom: TEXT_PADDING - 5,
      },
    }),
  },
  textInputHasIconLeft: {
    paddingLeft: TEXT_PADDING,
  },
  textInputHasIconRight: {
    paddingRight: TEXT_PADDING,
  },
  iconContainerRight: {
    marginRight: TEXT_PADDING,
  },
  iconContainerLeft: {
    marginLeft: TEXT_PADDING + 2,
  },
})

export default TextInput;
