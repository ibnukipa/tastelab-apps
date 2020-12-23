import {schema} from 'normalizr'

export const user = new schema.Entity('users')
export const supplier = new schema.Entity('suppliers')
export const store = new schema.Entity('stores')
export const warehouse = new schema.Entity('warehouses')
export const category = new schema.Entity('categories')

export const material = new schema.Entity('materials', {
  stores: [store],
  warehouses: [warehouse],
  categories: [category],
  supplier: supplier,
  updatedBy: user
});
