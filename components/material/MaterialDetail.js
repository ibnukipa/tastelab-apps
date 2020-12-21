import React from 'react'
import { StyleSheet, View } from 'react-native'

import Text from "@components/Text";
import Touchable from "@components/Touchable"
import {PaddingSizeConstant} from "@constants/size";
import Divider from "@components/Divider";
import ColorConstant from "@constants/color";

const MaterialDetail = (props) => {
  return (
    <Touchable style={styles.container} activeOpacity={0.9}>
      <View>
        <Text medium size={'large'}>{props.name}</Text>
      </View>
      <Divider space={10}/>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginRight: 15 }}>
          <Text size={'xSmall'}>Created at:</Text>
          <Text size={'small'}>28 Nov 2019</Text>
        </View>
        <View>
          <Text size={'xSmall'}>Supplier:</Text>
          <Text size={'small'}>Mr. Minh</Text>
        </View>
      </View>
      <Divider space={15} />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ backgroundColor: ColorConstant.gray, paddingVertical: 2, paddingHorizontal: 4, borderRadius: 4 }}>
          <Text size={'xSmall'}>Category 1</Text>
        </View>
      </View>
    </Touchable>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: PaddingSizeConstant.medium,
    paddingHorizontal: PaddingSizeConstant.large,
    marginBottom: PaddingSizeConstant.xSmall,
  },
})

export default MaterialDetail
