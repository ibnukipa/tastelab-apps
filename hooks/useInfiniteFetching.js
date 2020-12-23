import React, {useCallback, useEffect, useState} from "react"
import {useDispatch} from "react-redux"

const useInfiniteFetching = (fetcher) => {
  const dispatch = useDispatch()
  const [shouldFetchMore, setShouldFetchMore] = useState(false)
  const [shouldReFetch, setShouldReFetch] = useState(false)
  const [fetchData, setFetchData] = useState({})
  const [loadMorePage, setLoadMorePage] = useState(2)

  const fetchMore = useCallback((data) => {
    setFetchData(data)
    setShouldFetchMore(true)
  }, [])

  const reFetch = useCallback((data) => {
    setFetchData(data)
    setShouldReFetch(true)
  }, [])

  useEffect(() => {
    if (!shouldReFetch) return
    dispatch(fetcher({...fetchData, page: 1}))
    setShouldReFetch(false)
    setLoadMorePage(2)
  }, [shouldReFetch])

  useEffect(() => {
    if (!shouldFetchMore) return
    dispatch(fetcher({...fetchData, page: loadMorePage}))
    setShouldFetchMore(false);
    setLoadMorePage(loadMorePage + 1)
  }, [loadMorePage, shouldFetchMore])

  return [fetchMore, reFetch]
}

export default useInfiniteFetching
