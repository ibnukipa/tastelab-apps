import React, { useRef, useCallback } from 'react'
import { FlatList } from 'react-native';

import Container from "@components/Container"
import Header from "@components/Header"
import MaterialSnippet from "@components/material/MaterialSnippet";
import MaterialDetail from "@components/material/MaterialDetail";
import {Modalize} from "react-native-modalize";
import {useDispatch, useSelector} from "react-redux";
import {detailFetch, listFetch, materialListSelector, materialListStateSelector} from "@storage/reducer/material";
import useInfiniteFetching from "@hooks/useInfiniteFetching";
import ListEmpty from "@components/ListEmpty";
import Divider from "@components/Divider";
import Text from "@components/Text";

export default function Materials() {
  const dispatch = useDispatch()
  const MaterialDetailModal = useRef(null)
  const openMaterialDetail = useCallback((id) => () => {
    dispatch(detailFetch(id))
    MaterialDetailModal.current?.open()
  }, [])

  // materials data
  const materialsState = useSelector(state => materialListStateSelector(state))
  const materials = useSelector(state => materialListSelector(state))
  const [fetchMore, reFetch] = useInfiniteFetching(listFetch)

  const onEndReached = () => fetchMore(materialsState.meta)
  const renderItem = useCallback(({item}) => (
    <MaterialSnippet
      onPress={openMaterialDetail(item.id)}
      id={item.id}
    />
  ), [])
  const renderItemKey = useCallback((item) => item.id.toString(), [])
  const renderSeparator = useCallback(() => <Divider line/>, [])
  const renderEmptyList = useCallback(() => <ListEmpty listState={materialsState}/>, [])
  const renderLoadMore = useCallback(() => <><Text align={'center'}>Loading...</Text><Divider space={30}/></>, [])
  return (
    <Container hasHeader barStyle={'light'}>
      <Header searchBox title={'Materials'} />
      <FlatList
        refreshing={false}
        onRefresh={reFetch}
        removeClippedSubviews
        data={materials}
        keyExtractor={renderItemKey}
        renderItem={renderItem}
        onEndReachedThreshold={0.9}
        onEndReached={onEndReached}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={materialsState.fetchingMore && renderLoadMore}
      />
      <Modalize
        ref={MaterialDetailModal}
        panGestureComponentEnabled
      >
        <MaterialDetail />
      </Modalize>
    </Container>
  );
}
