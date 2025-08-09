import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import { 
  navbarSlice,
} from './reducers'
import {
  loginStatusSlice,
  logoutSlice,
  productServicesSlice,
  paymentMethodsSlice,
  storeSlice,
  detailStoreSlice,
  getEmployeesSlice,
} from './get'
import { 
  loginSlice,
  forgotPasswordSlice,
  registerAccountSlice,
  postEmployeeSlice,
  createEmployeeSlice,
  addStoreSlice,
} from './post'
import {
  registerVerificationSlice,
  patchCredentialStoreSlice,
  extendServiceStoreSlice,
} from './patch'
import {
  updateEmployeeSlice
} from './put'
import {
  deleteEmployeeSlice
} from './delete'

// 1. Reducer yang ingin dipersist
const persistedReducers = combineReducers({
  navbar: navbarSlice.reducer,
  loginStatus: loginStatusSlice.reducer,
  productServices: productServicesSlice.reducer,
  paymentMethods: paymentMethodsSlice.reducer,
  registerVerification: registerVerificationSlice.reducer,
  extendServiceStore: extendServiceStoreSlice.reducer,
  addStoreState: addStoreSlice.reducer,
  store: storeSlice.reducer,
  detailStore: detailStoreSlice.reducer,
  getEmployee: getEmployeesSlice.reducer,
})

// 2. Konfigurasi persist
const persistConfig = {
  key: 'persisted',
  storage: sessionStorage,
}

// 3. Reducer yang tidak ingin dipersist
const nonPersistedReducers = {
  loginState: loginSlice.reducer,
  logoutState: logoutSlice.reducer,
  forgotPasswordState: forgotPasswordSlice.reducer, 
  registerAccountState: registerAccountSlice.reducer,
  postEmployeeState: postEmployeeSlice.reducer,
  patchCredentialStoreState: patchCredentialStoreSlice.reducer,
  createEmployeeState: createEmployeeSlice.reducer,
  updateEmployeeState: updateEmployeeSlice.reducer,
  deleteEmployeeState: deleteEmployeeSlice.reducer,
}

const rootReducer = combineReducers({
  persisted: persistReducer(persistConfig, persistedReducers), 
  ...nonPersistedReducers,
})

export const tenant = configureStore({
  reducer: rootReducer,
})

export const persistor = persistStore(tenant)

export default tenant
