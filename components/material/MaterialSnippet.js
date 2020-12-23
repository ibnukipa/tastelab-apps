import React, {memo, useCallback} from 'react'
import { StyleSheet, View } from 'react-native'
import { truncate } from "lodash-es"
import Text from "@components/Text"
import Touchable from "@components/Touchable"
import {PaddingSizeConstant} from "@constants/size"
import Divider from "@components/Divider"
import ColorConstant from "@constants/color"
import {useDispatch, useSelector} from "react-redux"
import {isMaterialSelected, materialDetailSelector, supplierDetailSelector, unselect, select} from "@storage/reducer/material"
import Icon from "@components/Icon"
import * as Haptics from 'expo-haptics'

const MaterialSnippet = memo(({ onPress, id }) => {
  const dispatch = useDispatch()
  const material = useSelector(state => materialDetailSelector(state, id))
  const supplier = useSelector(state => supplierDetailSelector(state, material.supplier))

  // selections
  // TODO add animation for select/unselect
  const isSelected = useSelector(state => isMaterialSelected(state, id))
  const onLongPressSnippet = useCallback(() => {
    if(!isSelected) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      dispatch(select(id))
    }
  }, [id, isSelected])
  const onPressSnippet = useCallback(() => {
    if(!isSelected) onPress()
    else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      dispatch(unselect(id))
    }
  }, [onPress, id, isSelected])

  return (
    <Touchable
      key={id}
      style={[styles.container, isSelected && styles.containerSelected]}
      onPress={onPressSnippet}
      onLongPress={onLongPressSnippet}
      activeOpacity={isSelected ? 1 : .8}
    >
      <View style={[styles.icon, isSelected && styles.iconSelected]}>
        <Icon
          size={'xxLarge'}
          name={isSelected ? 'check' : 'ticket-percent'}
          color={isSelected ? ColorConstant.white : ColorConstant.gradientSecondary}
          type={'material'}
        />
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
                <View style={[styles.detail, styles.marginRight, isSelected && styles.detailSelected]}>
                  <Icon style={styles.detailIcon} color={ColorConstant.blueGray} name={'user-cog'} type={'awesome'}/>
                  <Text color={ColorConstant.blueGray300} bold size={'small'}>
                    {truncate(supplier.contactName, { length: 16 })}
                  </Text>
                </View>
              )
            }
            <View style={[styles.detail, styles.marginRight, isSelected && styles.detailSelected]}>
              <Icon style={styles.detailIcon} color={ColorConstant.blueGray100} name={'warehouse'} type={'awesome'}/>
              <Text color={ColorConstant.blueGray} size={'small'}>{ material?.warehouses?.length > 9 ? '9+' : material?.warehouses?.length}</Text>
            </View>
            <View style={[styles.detail, isSelected && styles.detailSelected]}>
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
    marginBottom: 5,
    marginLeft: 5,
  },
  containerSelected: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: ColorConstant.gradientSecondaryDimmed
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
    backgroundColor: ColorConstant.blueGray5050
  },
  detailSelected: {
    backgroundColor: ColorConstant.white
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
  },
  iconSelected: {
    backgroundColor: ColorConstant.primary
  }
})

export default MaterialSnippet
