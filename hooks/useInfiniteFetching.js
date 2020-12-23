import React, {useCallback, useEffect, useState} from "react"
import {useDispatch} from "react-redux"

const useInfiniteFetching = (fetcher, fetcherData) => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [shouldFetchMore, setShouldFetchMore] = useState(false)
  const [shouldReFetch, setShouldReFetch] = useState(true)

  const fetchMore = useCallback((meta) => {
    if (meta.hasNext) setShouldFetchMore(true)
  }, [])

  const reFetch = useCallback(() => {
    setShouldReFetch(true)
  }, [])

  useEffect(() => {
    if (!shouldReFetch) return
    dispatch(fetcher({...fetcherData, meta: {...(fetcherData?.meta || {}), page: 1}, isClearing: true}))
    setShouldReFetch(false)
    setPage(2);
  }, [shouldReFetch])

  useEffect(
    () => {
      if (!shouldFetchMore) return

      dispatch(fetcher({...fetcherData, meta: {...(fetcherData?.meta || {}), page}}))
      setShouldFetchMore(false);
      setPage(page + 1);
    }, [page, shouldFetchMore],
  );

  return [fetchMore, reFetch]
}

export default useInfiniteFetching
