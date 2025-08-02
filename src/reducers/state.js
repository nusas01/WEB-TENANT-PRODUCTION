import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import { navbarSlice } from '../reducers/reducers'


// 1. Reducer yang ingin dipersist
const persistedReducers = combineReducers({
  navbar: navbarSlice.reducer,
})

// 2. Konfigurasi persist
const persistConfig = {
  key: 'persisted',
  storage: sessionStorage,
}

// 3. Reducer yang tidak ingin dipersist
const nonPersistedReducers = {
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
