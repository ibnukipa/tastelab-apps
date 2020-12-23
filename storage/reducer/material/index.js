import {createSelector, createSlice} from '@reduxjs/toolkit';
import {take, unionBy} from "lodash-es";
import {dbIdSelector} from "@storage/reducer/db";

const DEFAULT_LIST_STATE = {
  isLoading: false,
  fetchingMore: false,
  hasError: false,
  data: [],
  meta: {}
}

const initialState = {
  list: {
    default: DEFAULT_LIST_STATE
  }
};

// slicer
const NAME = 'Material';
export const MaterialSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    listFetch: (state, action) => {
      const { key, isClearing } = action.payload
      const listKey = key || 'default'
      const oldState = state.list[listKey]
      const oldData = isClearing ? take(oldState?.data, 20) : oldState.data
      state.list[listKey] = {
        ...oldState,
        data: oldData,
        isLoading: isClearing,
        fetchingMore: !isClearing,
      }
    },
    listSuccess: (state, action) => {
      const { key, data, meta } = action.payload
      const listKey = key || 'default'
      const materials = data || []
      const oldMaterials = state.list[listKey]?.data || []
      state.list[listKey] = {
        ...state.list[listKey],
        data: unionBy(oldMaterials, materials, 'id'),
        meta,
        isLoading: false,
        fetchingMore: false,
        hasError: false,
      }
    },
    listError: (state, action) => {
      const { key, meta, error } = action.payload
      const listKey = key || 'default'
      state.list[listKey] = {
        ...state.list[listKey],
        meta,
        isLoading: false,
        fetchingMore: false,
        hasError: true,
        error
      }
    },
    detailFetch: (state, action) => {
      state.currentId = action.payload
    }
  },
});

// selectors
export const materialListStateSelector = createSelector(
  (state, listKey) => [state.material, listKey],
  ([material, listKey]) => material?.list?.[listKey || 'default'] || DEFAULT_LIST_STATE
);

export const materialListSelector = createSelector(
  (state, listKey) => [state.material, listKey],
  ([material, listKey]) => material?.list?.[listKey || 'default']?.data || []
);

export const materialDetailSelector = (state, id) => dbIdSelector(state, { modelName: 'material', id }) || {}
export const supplierDetailSelector = (state, id) => dbIdSelector(state, { modelName: 'supplier', id }) || {}
export const warehouseDetailSelector = (state, id) => dbIdSelector(state, { modelName: 'warehouse', id }) || {}
export const storeDetailSelector = (state, id) => dbIdSelector(state, { modelName: 'store', id }) || {}

export const materialCurrentIdSelector = createSelector(
  (state) => [state, state.material?.currentId],
  ([state, id]) => dbIdSelector(state, { modelName: 'material', id }) || {},
)

// actions
export const {
  listFetch,
  listSuccess,
  listError,
  detailFetch
} = MaterialSlice.actions;

export default MaterialSlice.reducer;
