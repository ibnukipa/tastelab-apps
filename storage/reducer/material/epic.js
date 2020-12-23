import {catchError, mergeMap, filter} from 'rxjs/operators'
import {of} from 'rxjs';

import {listFetch, listSuccess, listError} from '@storage/reducer/material'
import getMaterials$ from "@storage/api/getMaterials"
import {normalizeResponse} from '@storage/reducer/db'

export const fetchMaterialsEpic = (action$) =>
  action$.pipe(
    filter(listFetch.match),
    mergeMap(({ payload }) => getMaterials$({
      additionalParams: {
        storeId: payload?.storeId,
        keyword: payload?.keyword,
        page: payload?.page || 1
      }
    }).pipe(
      mergeMap(({ response }) => {
        return of(
          normalizeResponse({modelName: 'material', data: response.data}),
          listSuccess({
            meta: {
              page: response?.meta?.current_page || 1,
              hasNext: !!response.links.next
            },
            data: response?.data?.map(item => ({id: item.id})),
          })
        )
      }),
      catchError(error => {
        return of(listError({ ...payload, error: error.message}));
      })
    ))
  )
