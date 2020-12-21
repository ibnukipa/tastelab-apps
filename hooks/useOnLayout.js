import { useState, useCallback } from 'react'

export const useOnLayoutListener = () => {
  const [size, setSize] = useState({ height: 0, width: 0 })
  const [isReady, setIsReady] = useState(false)
  const onLayoutListener = useCallback((layoutSize) => {
    setSize(layoutSize)
    setIsReady(true)
  });

  return [size, onLayoutListener, isReady]
}

export const useOnLayout = (listener) => {
  const [size, setSize] = useState({ height: 0, width: 0 })
  const [isReady, setIsReady] = useState(false)
  const onLayout = useCallback((event) => {
    const { width, height } = event.nativeEvent.layout
    listener?.({ width, height })
    setSize({ width, height })
    setIsReady(true)
  }, []);

  return [size, onLayout, isReady]
}
