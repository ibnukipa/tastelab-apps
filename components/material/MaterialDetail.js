import React, {memo} from 'react'
import {StyleSheet, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {truncate} from "lodash-es"

import Text from "@components/Text"
import {PaddingSizeConstant} from "@constants/size"
import {useSelector} from "react-redux"
import {
  materialCurrentIdSelector,
  storeDetailSelector,
  supplierDetailSelector,
  warehouseDetailSelector
} from "@storage/reducer/material"
import ColorConstant from "@constants/color";
import Divider from "@components/Divider";
import Icon from "@components/Icon";

export const MaterialDetailHeader = () => {
  const material = useSelector(state => materialCurrentIdSelector(state))
  return (
    <View style={styles.header} key="0">
      <Text bold size={'xxLarge'} color={ColorConstant.primary}>{material.nameEng}</Text>
      <Text color={ColorConstant.blueGray100}>{material.uuid}</Text>
    </View>
  )
}

export const MaterialWarehouse = memo(({id}) => {
  const warehouse = useSelector(state => warehouseDetailSelector(state, id))
  return (
    <View style={styles.warehouse}>
      <View style={styles.warehouseHeader}>
        <Icon style={styles.listHeaderIcon} color={ColorConstant.blueGray} name={'warehouse'} type={'awesome'}/>
        <Text color={ColorConstant.blueGray300} bold size={'small'}>
          {truncate(warehouse.name, {length: 18})}
        </Text>
      </View>
    </View>
  )
})

export const MaterialStore = memo(({id}) => {
  const store = useSelector(state => storeDetailSelector(state, id))
  return (
    <View style={styles.warehouse}>
      <View style={styles.warehouseHeader}>
        <Icon style={styles.listHeaderIcon} color={ColorConstant.blueGray} name={'store'} type={'awesome'}/>
        <Text color={ColorConstant.blueGray300} bold size={'small'}>
          {truncate(store.name, {length: 18})}
        </Text>
      </View>
    </View>
  )
})

export const MaterialSupplier = memo(({id}) => {
  const supplier = useSelector(state => supplierDetailSelector(state, id))
  return (
    <View style={styles.supplier}>
      <View style={styles.supplierIcon}>
        <Icon size={'xxLarge'} name={'user-tie'} color={ColorConstant.gradientSecondary} type={'awesome'}/>
      </View>
      <View style={styles.supplierContent}>
        {
          supplier.contactName && (
            <Text numberOfLines={1} medium>
              {supplier.contactName}
            </Text>
          )
        }
        <Text numberOfLines={1} size={'small'}>
          {supplier.name}
        </Text>
      </View>
    </View>
  )
})

const MaterialDetail = () => {
  const material = useSelector(state => materialCurrentIdSelector(state))
  return (
    <View style={styles.container}>
      <Divider space={20}/>
      <View style={styles.listHeader}>
        <Text color={ColorConstant.blueGray300} bold size={'small'}>Warehouses ({material?.warehouses?.length})</Text>
      </View>
      <Divider/>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {material?.warehouses?.map(id => <MaterialWarehouse key={id} id={id}/>)}
      </ScrollView>
      <Divider space={20}/>
      <View style={styles.listHeader}>
        <Text color={ColorConstant.blueGray300} bold size={'small'}>Stores ({material?.stores?.length})</Text>
      </View>
      <Divider/>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {material?.stores?.map(id => <MaterialStore key={id} id={id}/>)}
      </ScrollView>
      <Divider space={20}/>
      <View style={styles.listHeader}>
        <Text color={ColorConstant.blueGray300} bold size={'small'}>Supplier</Text>
      </View>
      <Divider space={15}/>
      <MaterialSupplier id={material.supplier}/>
      <Divider space={50}/>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    padding: PaddingSizeConstant.large,
    paddingTop: PaddingSizeConstant.xxxLarge,
    paddingBottom: 0,
    backgroundColor: ColorConstant.whiteDimmed,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  container: {
    paddingHorizontal: PaddingSizeConstant.large,
  },
  listHeader: {
    flexDirection: 'row'
  },
  listHeaderIcon: {
    marginRight: 5,
  },
  warehouse: {
    width: 150,
    borderRadius: 5,
    marginRight: PaddingSizeConstant.small,
    backgroundColor: ColorConstant.gray,
    padding: PaddingSizeConstant.small
  },
  warehouseHeader: {
    flexDirection: 'row',
  },
  supplier: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supplierIcon: {
    height: 40,
    width: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: PaddingSizeConstant.medium,
    backgroundColor: ColorConstant.gradientSecondaryDimmed
  },
  supplierContent: {
    flex: 1
  }
})

export default MaterialDetail
