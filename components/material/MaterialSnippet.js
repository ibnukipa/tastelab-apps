import React, {memo} from 'react'
import { StyleSheet, View } from 'react-native'
import { truncate } from "lodash-es"
import Text from "@components/Text"
import Touchable from "@components/Touchable"
import {PaddingSizeConstant} from "@constants/size"
import Divider from "@components/Divider"
import ColorConstant from "@constants/color"
import {useSelector} from "react-redux"
import {materialDetailSelector, supplierDetailSelector} from "@storage/reducer/material"
import Icon from "@components/Icon"

const MaterialSnippet = memo(({ onPress, id }) => {
  const material = useSelector(state => materialDetailSelector(state, id))
  const supplier = useSelector(state => supplierDetailSelector(state, material.supplier))
  return (
    <Touchable key={id} style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.icon}>
        <Icon size={'xxLarge'} name={'ticket-percent'} color={ColorConstant.gradientSecondary} type={'material'} />
      </View>
      <View style={styles.content}>
        <Text numberOfLines={1} medium size={'large'}>
          {material.nameEng}
        </Text>
        <Divider space={5}/>
        <View style={styles.detailContainer}>
          <View style={styles.detailWrapper}>
            {
              !!supplier?.contactName && (
                <View style={[styles.detail, styles.subDetail, styles.marginRight]}>
                  <Icon style={styles.detailIcon} color={ColorConstant.blueGray} name={'user-cog'} type={'awesome'}/>
                  <Text color={ColorConstant.blueGray300} bold size={'small'}>
                    {truncate(supplier.contactName, { length: 16 })}
                  </Text>
                </View>
              )
            }
            <View style={[styles.detail, styles.subDetail, styles.marginRight]}>
              <Icon style={styles.detailIcon} color={ColorConstant.blueGray100} name={'warehouse'} type={'awesome'}/>
              <Text color={ColorConstant.blueGray} size={'small'}>{ material?.warehouses?.length > 9 ? '9+' : material?.warehouses?.length}</Text>
            </View>
            <View style={[styles.detail, styles.subDetail, styles.marginRight]}>
              <Icon style={styles.detailIcon} color={ColorConstant.blueGray100} name={'store'} type={'awesome'}/>
              <Text color={ColorConstant.blueGray} size={'small'}>{ material?.stores?.length > 9 ? '9+' : material?.stores?.length}</Text>
            </View>
          </View>
        </View>
      </View>
    </Touchable>
  );
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: PaddingSizeConstant.medium,
    paddingHorizontal: PaddingSizeConstant.large,
    backgroundColor: ColorConstant.white,
  },
  detailContainer: {
    flexDirection: 'row',
  },
  detailWrapper: {
    flexDirection: 'row',
    flex: 0.5,
  },
  detail: {
    borderRadius: 4,
    flexDirection: 'row',
    padding: PaddingSizeConstant.xSmall,
    backgroundColor: ColorConstant.blueGray50
  },
  subDetail: {
    backgroundColor: ColorConstant.blueGray5050
  },
  detailIcon: {
    marginRight: 5,
  },
  marginRight: {
    marginRight: 5,
  },
  content: {
    flex: 1
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: PaddingSizeConstant.medium,
    backgroundColor: ColorConstant.gradientSecondaryDimmed
  }
})

export default MaterialSnippet
