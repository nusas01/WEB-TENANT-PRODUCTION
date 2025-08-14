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

const initialDataAccountState = {
  dataAccount: {},
  loadingDataAccount: false,
  errorDataAccount: null,
}
export const getDataAccountSlice = createSlice({
  name: 'getDataAccount',
  initialState: initialDataAccountState,
  reducers: {
    setDataAccount: (state, action) => {
      state.dataAccount = action.payload || {}
    },
    setLoadingDataAccount: (state, action) => {
      state.loadingDataAccount = action.payload
    },
    setErrorDataAccount: (state, action) => {
      state.errorDataAccount = action.payload || null
    },
    resetErrorDataAccount: (state) => {
      state.errorDataAccount = null
    },
  },
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

const initialGetEmployeesState = {
  employees: [],
  loadingGetEmployees: false,
  errorGetEmployees: null,
}
export const getEmployeesSlice = createSlice({
  name: 'getEmployees',
  initialState: initialGetEmployeesState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload || []
    },
    setLoadingGetEmployees: (state, action) => {
      state.loadingGetEmployees = action.payload
    },
    setErrorGetEmployees: (state, action) => {
      state.errorGetEmployees = action.payload || null
    },
    resetErrorGetEmployees: (state) => {
      state.errorGetEmployees = null
    },
  },
})

const initialRequiredPaymentState = {
  dataRequiredPayment: [],
  loadingRequiredPayment: false,
  errorRequiredPayment: null,
}
export const getRequiredPaymentSlice = createSlice({
  name: 'dataRequiredPayment',
  initialState: initialRequiredPaymentState,
  reducers: {
    setRequiredPayment: (state, action) => {
      state.dataRequiredPayment = action.payload || []
    },
    setLoadingRequiredPayment: (state, action) => {
      state.loadingRequiredPayment = action.payload
    },
    setErrorRequiredPayment: (state, action) => {
      state.errorRequiredPayment = action.payload || null
    },
    resetErrorRequiredPayment: (state) => {
      state.errorRequiredPayment = null
    },
  },
})

const initialStatusChangePaymentGatewayState = {
  isUpdate: null,
  loadingStatusChangePaymentGateway: false,
  errorStatusChangePaymentGateway: null,
}
export const GetStatusChangePaymentGatewaySlice = createSlice({
  name: 'statusChangePaymentGateway',
  initialState: initialStatusChangePaymentGatewayState,
  reducers: {
    setSuccessStatusChangePaymentGateway: (state, action) => {
      state.isUpdate = action.payload || null
    },
    setLoadingStatusChangePaymentGateway: (state, action) => {
      state.loadingStatusChangePaymentGateway = action.payload
    },
    setErrorStatusChangePaymentGateway: (state, action) => {
      state.errorStatusChangePaymentGateway = action.payload || null
    },
    resetErrorStatusChangePaymentGateway: (state) => {
      state.errorStatusChangePaymentGateway = null
    },
  },
})

const initialProductChangePaymentGatewayState = {
  dataProductChangePaymentGateway: {},
  loadingProductChangePaymentGateway: false,
  errorProductChangePaymentGateway: null,
}
export const GetProductChangePaymentGatewaySlice = createSlice({
  name: 'ProductChangePaymentGateway',
  initialState: initialProductChangePaymentGatewayState,
  reducers: {
    setSuccessProductChangePaymentGateway: (state, action) => {
      state.dataProductChangePaymentGateway= action.payload || {}
    },
    setLoadingProductChangePaymentGateway: (state, action) => {
      state.loadingProductChangePaymentGateway = action.payload
    },
    setErrorProductChangePaymentGateway: (state, action) => {
      state.errorProductChangePaymentGateway = action.payload || null
    },
    resetProductChangePaymentGateway: (state) => {
      state.errorProductChangePaymentGateway = null
    },
  },
})