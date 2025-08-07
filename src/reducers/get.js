import { createSlice } from "@reduxjs/toolkit";
import { MappingPackage } from "../content/helper";

const initialLoginStatusState = {
    loggedIn: false,
}
export const loginStatusSlice = createSlice({
    name: 'loginStatus',
    initialState: initialLoginStatusState,
    reducers: {
        setLoginStatus: (state, action) => {
            state.loggedIn = action.payload
        }
    }
})

const initialLogoutState = {
    logoutSuccess: false,
    logoutError: null,
    loadingLogout: false
}
export const logoutSlice = createSlice({
    name: "logout",
    initialState: initialLogoutState,
    reducers: {
        setLoadingLogout: (state, action) => {
            state.loadingLogout = action.payload
        },
        setSuccessLogout: (state, action) => {
            state.logoutSuccess = action.payload
        }, 
        setErrorLogout: (state, action) => {
            state.logoutError = action.payload || null
        },
        resetLogout: (state) => {
            state.logoutSuccess = false
            state.logoutError = null
        }
    }
})

const initialProductServices = {
    dataProductService: [],
    errorProductService: null, 
    loadingProductService: false,
}
export const productServicesSlice = createSlice({
    name: 'productService',
    initialState: initialProductServices,
    reducers: {
        setSuccessProductService: (state, action) => {
            state.dataProductService = MappingPackage(action.payload) || []
        },
        setErrorProductService: (state, action) => {
            state.errorProductService = action.payload || null
        },
        setLoadingProductService: (state, action) => {
            state.loadingProductService = action.payload
        },
        resetErrorProductService: (state) => {
            state.errorProductService = null
        }
    }
})

const initialPaymentMethods = {
    dataPaymentMethods: [],
    tax: 0,
    errorPaymentMethods: null, 
    loadingPaymentMethods: false,
}
export const paymentMethodsSlice = createSlice({
    name: 'paymentMethods',
    initialState: initialPaymentMethods,
    reducers: {
        setSuccessPaymentMethods: (state, action) => {
            state.dataPaymentMethods = action.payload.data || []
            state.tax = action.payload.tax || 0
        },
        setErrorPaymentMethods: (state, action) => {
            state.errorPaymentMethods = action.payload || null
        },
        setLoadingPaymentMethods: (state, action) => {
            state.loadingPaymentMethods = action.payload
        },
        resetErrorPaymentMethods: (state) => {
            state.errorPaymentMethods = null
        }
    }
})

const initialStoreState = {
  allStores: [],
  loadingStore: false,
  errorStore: null,
}
export const storeSlice = createSlice({
  name: 'store',
  initialState: initialStoreState,
  reducers: {
    setAllStores: (state, action) => {
      state.allStores = action.payload || []
    },
    setLoadingStore: (state, action) => {
      state.loadingStore = action.payload
    },
    setErrorStore: (state, action) => {
      state.errorStore = action.payload || null
    },
    resetStoreError: (state) => {
      state.errorStore = null
    },
  },
})

const initialDetailStoreState = {
  detailStore: null,
  selectedStore: {},
  loadingDetailStore: false,
  errorDetailStore: null,
}
export const detailStoreSlice = createSlice({
  name: 'detailStore',
  initialState: initialDetailStoreState,
  reducers: {
    setDetailStore: (state, action) => {
      state.detailStore = action.payload || []
    },
    setSelectedStore: (state, action) => {
        state.selectedStore = action.payload || {}
    },
    setLoadingDetailStore: (state, action) => {
      state.loadingDetailStore = action.payload
    },
    setErrorDetailStore: (state, action) => {
      state.errorDetailStore = action.payload || null
    },
    resetDetailStoreError: (state) => {
      state.errorDetailStore = null
    },
  },
})
