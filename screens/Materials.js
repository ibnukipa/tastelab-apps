import React, { useRef, useCallback } from 'react'
import { Animated, FlatList } from 'react-native';

import Container from "@components/Container"
import Header from "@components/Header"

import faker from 'faker';
import MaterialSnippet from "@components/material/MaterialSnippet";
import ModalDetail from "@components/modal/ModalDetail";
import MaterialDetail from "@components/material/MaterialDetail";

const generateFakeItems = (nums) => {
  const items = []
  for(let i = 0; i< nums; i++) {
    items.push({
      uuid: faker.random.uuid(),
      name: faker.commerce.productName(),
      unit: faker.commerce.department(),
      price: faker.commerce.price(),
    })
  }
  return items
}

const ITEMS = generateFakeItems(50)

export default function Materials() {
  const scroller = useRef();
  const scrollY = useRef(new Animated.Value(0)).current;

  const DetailModal = useRef(null);

  const renderItem = useCallback(({item}) => (
    <MaterialSnippet
      onPress={() => {
        DetailModal.current?.openModal(item);
      }}
      name={item.name}
    />
  ), [])

  return (
    <Container hasHeader barStyle={'light'}>
      <Header searchBox scrollY={scrollY} title={'Materials'} />
      <FlatList
        showsVerticalScrollIndicator={false}
        ref={scroller}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
        data={ITEMS}
        keyExtractor={item => item.uuid}
        renderItem={renderItem}
      />
      <ModalDetail ref={DetailModal} component={<MaterialDetail />}/>
    </Container>
  );
}
