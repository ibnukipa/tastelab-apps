import React, {useRef, useCallback, useState, useEffect} from 'react'
import {FlatList} from 'react-native'

import Container from "@components/Container"
import Header from "@components/Header"
import MaterialSnippet from "@components/material/MaterialSnippet"
import MaterialDetail, {MaterialDetailHeader} from "@components/material/MaterialDetail"
import {Modalize} from "react-native-modalize"
import {useDispatch, useSelector} from "react-redux"
import {detailFetch, listFetch, materialListSelector, materialListStateSelector} from "@storage/reducer/material"
import useInfiniteFetching from "@hooks/useInfiniteFetching"
import ListEmpty from "@components/ListEmpty"
import Divider from "@components/Divider"
import Text from "@components/Text"
import {authStateSelector} from "@storage/reducer/auth";
import LoginForm, {LoginFormHeader} from "@components/login/LoginForm";

export default function Materials() {
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState(null)

  // modals
  const MaterialDetailModal = useRef(null)
  const LoginModal = useRef(null)
  const openMaterialDetail = useCallback((id) => () => {
    dispatch(detailFetch(id))
    MaterialDetailModal.current?.open()
  }, [MaterialDetailModal])
  const openLoginModal = useCallback((id) => () => {
    LoginModal.current?.open()
  }, [LoginModal])

  // auth data
  const auth = useSelector(state => authStateSelector(state))

  // materials data
  const materialsState = useSelector(state => materialListStateSelector(state))
  const materials = useSelector(state => materialListSelector(state))

  // side effects
  const [fetchMore, reFetch] = useInfiniteFetching(listFetch)
  const onSearch = useCallback((keyword) => {
    setKeyword(keyword)
  }, [])
  useEffect(() => {
    if (auth.isLoggedIn) reFetch({keyword, isReFetch: true})
  }, [keyword, auth])

  // login
  useEffect(() => {
    if (!auth.isLoggedIn) LoginModal.current?.open()
    else LoginModal.current?.close()
  }, [LoginModal, auth])
  const renderLogin = useCallback(() => [
    <LoginFormHeader key={0}/>,
    <LoginForm key={1}/>
  ], [])

  // material list
  const onRefresh = useCallback(() => {
    reFetch({keyword, isClearing: true})
  }, [reFetch, keyword])
  const onEndReached = useCallback(() => {
    if (materialsState.meta.hasNext && !materialsState.fetchingMore) {
      fetchMore({keyword})
    }
  }, [fetchMore, materialsState.meta, materialsState.fetchingMore, keyword])
  const renderItem = useCallback(({item}) => (
    <MaterialSnippet
      onPress={openMaterialDetail(item.id)}
      id={item.id}
    />
  ), [])
  const renderItemKey = useCallback((item) => item.id.toString(), [])
  const renderEmptyList = useCallback(() => <ListEmpty listState={materialsState}/>, [materialsState])
  const renderLoadMore = useCallback(() => <><Text align={'center'}>Loading...</Text><Divider space={30}/></>, [])
  const renderMaterialDetail = useCallback(() => [
    <MaterialDetailHeader key='0'/>,
    <MaterialDetail key='1'/>
  ], [])

  return (
    <Container hasHeader barStyle={'light'}>
      <Header onSearch={onSearch} searchBox title={'Materials'}/>
      <FlatList
        refreshing={false}
        onRefresh={onRefresh}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        data={materials}
        keyExtractor={renderItemKey}
        renderItem={renderItem}
        onEndReachedThreshold={0.9}
        onEndReached={onEndReached}
        contentContainerStyle={{paddingTop: 5}}
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={materialsState.fetchingMore && renderLoadMore}
      />
      <Modalize
        adjustToContentHeight
        ref={MaterialDetailModal}
        panGestureComponentEnabled
      >
        {renderMaterialDetail()}
      </Modalize>
      <Modalize
        panGestureEnabled={false}
        closeOnOverlayTap={false}
        adjustToContentHeight
        ref={LoginModal}
        panGestureComponentEnabled
      >
        {renderLogin()}
      </Modalize>
    </Container>
  );
}
