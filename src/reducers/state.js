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
  getDataAccountSlice,
  getRequiredPaymentSlice,
  GetStatusChangePaymentGatewaySlice,
  GetProductChangePaymentGatewaySlice,
} from './get'
import { 
  loginSlice,
  forgotPasswordSlice,
  registerAccountSlice,
  postEmployeeSlice,
  createEmployeeSlice,
  addStoreSlice,
  submissionChangePaymentGatewaySlice,
} from './post'
import {
  registerVerificationSlice,
  patchCredentialStoreSlice,
  extendServiceStoreSlice,
  changePasswordEmployeeSlice,
  updateChangePaymentGatewaySlice,
} from './patch'
import {
  updateEmployeeSlice,
  updateStoreSlice,
} from './put'
import {
  deleteEmployeeSlice
} from './delete'
import {
  statusExpiredUserTokenSlice
} from './expToken'

// 1. Reducer yang dipersist
const persistedReducers = combineReducers({
  navbar: navbarSlice.reducer,
  loginStatus: loginStatusSlice.reducer,
  productServices: productServicesSlice.reducer,
  paymentMethods: paymentMethodsSlice.reducer,
  registerVerification: registerVerificationSlice.reducer,
  extendServiceStore: extendServiceStoreSlice.reducer,
  addStore: addStoreSlice.reducer,
  store: storeSlice.reducer,
  detailStore: detailStoreSlice.reducer,
  getEmployee: getEmployeesSlice.reducer,
  getDataAccount: getDataAccountSlice.reducer,
  getRequiredPayment: getRequiredPaymentSlice.reducer, 
  GetStatusChangePaymentGateway: GetStatusChangePaymentGatewaySlice.reducer,
  GetProductChangePaymentGateway: GetProductChangePaymentGatewaySlice.reducer,
})

// 2. Konfigurasi persist
const persistConfig = {
  key: 'persisted',
  storage: sessionStorage,
}

// 3. Reducer yang tidak dipersist
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
  changePasswordEmployeeState: changePasswordEmployeeSlice.reducer,
  updateStoreState: updateStoreSlice.reducer,
  submissionChangePaymentGatewayState: submissionChangePaymentGatewaySlice.reducer,
  statusExpiredUserTokenState: statusExpiredUserTokenSlice.reducer,
  updateChangePaymentGatewayState: updateChangePaymentGatewaySlice.reducer,
}

const appReducer = combineReducers({
  persisted: persistReducer(persistConfig, persistedReducers), 
  ...nonPersistedReducers,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_ALL") {
    state = undefined; // reset semua slice ke initialState
  }
  return appReducer(state, action);
};

export const tenant = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(tenant);

export const resetApp = () => {
  // 1. Kosongkan data redux-persist
  persistor.purge();

  // 2. Kosongkan semua storage sessionStorage asli browser
  window.sessionStorage.clear();

  // 3. Reset state Redux di memory
  tenant.dispatch({ type: "RESET_ALL" });
};


export default tenant
