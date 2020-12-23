import {createSelector, createSlice} from '@reduxjs/toolkit';
import {remove, take, unionBy} from "lodash-es";
import {dbIdSelector} from "@storage/reducer/db";

const DEFAULT_LIST_STATE = {
  isLoading: false,
  fetchingMore: false,
  hasError: false,
  data: [],
  selectedData: [],
  meta: {}
}

const initialState = {
  list: DEFAULT_LIST_STATE
};

// slicer
const NAME = 'Material';
export const MaterialSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    listFetch: (state, action) => {
      const {isClearing, isReFetch} = action.payload
      const oldState = state.list
      const oldData = isReFetch ? [] : isClearing ? take(oldState?.data, 20) : oldState.data
      state.list = {
        ...oldState,
        data: oldData,
        isLoading: isClearing || isReFetch,
        fetchingMore: !isClearing && !isReFetch,
      }
    },
    listSuccess: (state, action) => {
      const {data, meta} = action.payload
      const materials = data || []
      const oldMaterials = state.list?.data || []
      state.list = {
        ...state.list,
        data: unionBy(oldMaterials, materials, 'id'),
        meta,
        isLoading: false,
        fetchingMore: false,
        hasError: false,
      }
    },
    listError: (state, action) => {
      const {meta, error} = action.payload
      state.list = {
        ...state.list,
        meta,
        isLoading: false,
        fetchingMore: false,
        hasError: true,
        error
      }
    },
    detailFetch: (state, action) => {
      state.currentId = action.payload
    },
    // TODO we can make select/unselect in different state domain (outside material domain)
    select: (state, action) => {
      state.list?.selectedData.push(action.payload)
    },
    unselect: (state, action) => {
      // const curSelectedData = state.list?.selectedData
      remove(state.list?.selectedData, (item) => item === action.payload)
      // state.list.selectedData = curSelectedData
    }
  },
});

// selectors
export const materialListStateSelector = createSelector(
  (state) => [state.material],
  ([material]) => material?.list || DEFAULT_LIST_STATE
);

export const materialListSelector = createSelector(
  (state) => [state.material],
  ([material]) => material?.list?.data || []
);

export const materialDetailSelector = (state, id) => dbIdSelector(state, {modelName: 'material', id}) || {}
export const supplierDetailSelector = (state, id) => dbIdSelector(state, {modelName: 'supplier', id}) || {}
export const warehouseDetailSelector = (state, id) => dbIdSelector(state, {modelName: 'warehouse', id}) || {}
export const storeDetailSelector = (state, id) => dbIdSelector(state, {modelName: 'store', id}) || {}
export const isMaterialSelected = createSelector(
  (state, id) => [state.material.list?.selectedData || [], id],
  ([selectedData, id]) => selectedData.includes(id)
)
export const materialCurrentIdSelector = createSelector(
  (state) => [state, state.material?.currentId],
  ([state, id]) => dbIdSelector(state, {modelName: 'material', id}) || {},
)

// actions
export const {
  listFetch,
  listSuccess,
  listError,
  detailFetch,
  select,
  unselect,
} = MaterialSlice.actions;

export default MaterialSlice.reducer;
