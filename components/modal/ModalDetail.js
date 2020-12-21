import React, { cloneElement, useRef, useImperativeHandle, forwardRef, useState, useCallback } from 'react'
import {Modalize} from 'react-native-modalize'

const ModalDetail = (props, ref) => {
  const modal = useRef(null)
  const [detailData, setDetailData] = useState({})
  useImperativeHandle(ref, () => ({
    openModal: (data) => {
      setDetailData(data)
      modal?.current?.open()
    }
  }))
  const renderContent = useCallback(() => cloneElement(props.component, detailData), [detailData])
  return (
    <Modalize
      ref={modal}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        stickyHeaderIndices: [0],
      }}
    >
      {renderContent()}
    </Modalize>
  )
}

export default forwardRef(ModalDetail)
