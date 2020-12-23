import React, { useCallback } from 'react'
import { Platform, StyleSheet, View, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useForm } from 'react-hook-form'

import ColorConstant from '@constants/color'
import { deviceWidth } from "@constants/dimension"

import Text from '@components/Text'
import TextInput from '@components/TextInput'
import {PaddingSizeConstant} from "@constants/size"
import {debounce} from "lodash-es"

const Header = ({ title, searchBox, onSearch }) => {
  // Search Form
  const { control: sControl, setValue: sSetValue, watch: sWatch, handleSubmit: sHandleSubmit } = useForm()

  // Layout
  const insets = useSafeAreaInsets()

  const searchSubmit = (data) => {
    const { keyword } = data
    if(keyword.length > 2 || keyword === '') onSearch(keyword)
  }

  const onSubmit = useCallback(() => {
    const handle = debounce(sHandleSubmit(searchSubmit), 800)
    handle()
  }, [sHandleSubmit])

  return (
    <View style={[styles.wrapper]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.9 }}
        colors={[ColorConstant.gradientPrimary, ColorConstant.gradientSecondary]}
        style={[
          styles.container,
          { paddingTop: insets.top + Platform.select({ ios: 0, android: PaddingSizeConstant.small }) },
        ]}
      >
        {React.isValidElement(title) ? (
          title
        ) : (
          <Text size={'uLarge'} color={ColorConstant.white} style={styles.title}>
            {title}
          </Text>
        )}
        {
          searchBox && (
            <Animated.View>
              <TextInput
                returnKeyType={'search'}
                iconPosition={'left'}
                iconName={'search'}
                style={styles.searchInput}
                name={'keyword'}
                isDimmed
                isSpace={false}
                isClear
                control={sControl}
                setValue={sSetValue}
                watch={sWatch}
                placeholder={'Search'}
                onChangeHandler={onSubmit}
                onClear={onSubmit}
              />
            </Animated.View>
          )
        }
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: deviceWidth,
  },
  container: {
    paddingHorizontal: PaddingSizeConstant.small,
    paddingBottom: PaddingSizeConstant.small,
  },
  title: {
    marginBottom: PaddingSizeConstant.small,
    ...Platform.select({
      ios: {
        marginTop: PaddingSizeConstant.small,
      }
    })
  },
  searchInputWrapper: {
    marginTop: PaddingSizeConstant.small,
  },
  searchInput: {
    color: ColorConstant.white,
  },
})

export default Header
