import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
    successLogin: null, 
    errorLogin: null, 
    loadingLogin: false, 
    errorField: {},
}
export const loginSlice = createSlice({
    name: 'login', 
    initialState: initialLoginState, 
    reducers: {
        loginSuccess: (state, action) => {
            state.successLogin = action.payload
        },
        loginError: (state, action) => {
            state.errorLogin = action.payload.errorLogin 
            state.errorField = action.payload.errorField || {}
        },
        setLoadingLogin: (state, action) => {
            state.loadingLogin = action.payload
        }, 
        resetLogin: (state) => {
            state.successLogin = false
            state.errorLogin = null
            state.errorField = {}
        }
    }
})

const initialForgotPassword = {
    succesForgotPassword: null,
    errorForgotPassword: null, 
    errorFieldForgotPassword: null,
    loadingForgotPassword: false,
}
export const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: initialForgotPassword,
    reducers: {
        setLoadingForgotPassword: (state, action) => {
            state.loadingForgotPassword = action.payload
        },
        setSuccessForgotPassword: (state, action) => {
            state.succesForgotPassword = action.payload
        },
        setErrorForgotPassword: (state, action) => {
            state.errorForgotPassword = action.payload.error
            state.errorFieldForgotPassword = action.payload.errorField
        },
        resetForgotPassword: (state) => {
            state.errorForgotPassword = null
            state.errorFieldForgotPassword = null
            state.succesForgotPassword = false
        }
    }
})

const initialRegisterAccount = {
    successRegister: null,
    dataSuccessRegister: null,
    errorFieldsRegister: null,
    errorRegister: null,
    errorDomain: null,
    loadingRegister: false,
}
export const registerAccountSlice = createSlice({
    name: 'registerAccount',
    initialState: initialRegisterAccount,
    reducers: {
        setSuccessRegisterAccount: (state, action) => {
            state.successRegister = action.payload.success
            state.dataSuccessRegister = action.payload.data
        },
        setErrorRegisterAccount: (state, action) => {
            state.errorFieldsRegister = action.payload.errorField
            state.errorDomain = action.payload.errorDomain
            state.errorRegister = action.payload.error 
        }, 
        setLoadingRegisterAccount: (state, action) => {
            state.loadingRegister = action.payload
        },
        resetRegisterAccount: (state) => {
            state.errorFieldsRegister = null
            state.errorRegister = null
            state.successRegister = false
        }
    }
})

const initialPostEmployee = {
    successPostEmployee: null,
    errorFieldsPostEmployee: null,
    errorPostEmployee: null,
    loadingPostEmployee: false,
}
export const postEmployeeSlice = createSlice({
    name: 'postEmployee',
    initialState: initialPostEmployee,
    reducers: {
        setSuccessPostEmployee: (state, action) => {
            state.successPostEmployee = action.payload
        },
        setErrorPostEmployee: (state, action) => {
            state.errorFieldsPostEmployee = action.payload.errorField
            state.errorPostEmployee = action.payload.error
        },
        setLoadingPostEmployee: (state, action) => {
            state.loadingPostEmployee = action.payload
        },
        resetPostEmployee: (state) => {
            state.errorFieldsPostEmployee = null
            state.errorPostEmployee = null
            state.successPostEmployee = false
        }
    }
})

const initialCreateEmployeeState = {
  successCreateEmployee: null,
  errorCreateEmployee: null,
  ErrorFieldCreateEmployee: null,
  loadingCreateEmployee: false,
}
export const createEmployeeSlice = createSlice({
  name: 'createEmployee',
  initialState: initialCreateEmployeeState,
  reducers: {
    setSuccessCreateEmployee: (state, action) => {
      state.successCreateEmployee = action.payload
    },
    setErrorCreateEmployee: (state, action) => {
      state.errorCreateEmployee = action.payload.error || null
      state.ErrorFieldCreateEmployee = action.payload.errorField || null
    },
    setLoadingCreateEmployee: (state, action) => {
      state.loadingCreateEmployee = action.payload
    },
    resetCreateEmployee: (state) => {
      state.successCreateEmployee = null
      state.errorCreateEmployee = null
      state.ErrorFieldCreateEmployee = null
    },
  },
})


const initialAddStore = {
    successAddStore: null,
    dataSuccess: null,
    errorFieldsAddStore: {},
    errorAddStore: null,
    loadingAddStore: false,
}
export const addStoreSlice = createSlice({
    name: 'addStore',
    initialState: initialAddStore,
    reducers: {
        setSuccessAddStore: (state, action) => {
            state.successAddStore = action.payload.success 
            state.dataSuccess = action.payload.data
        },
        setErrorAddStore: (state, action) => {
            state.errorFieldsAddStore = action.payload.errorField || {}
            state.errorAddStore = action.payload.error
        },
        setLoadingAddStore: (state, action) => {
            state.loadingAddStore = action.payload
        },
        resetAddStore: (state) => {
            state.errorFieldsAddStore = {}
            state.errorAddStore = null
            state.successAddStore = false
        }
    }
})

const initialSubmissionChangePaymentGatewayState = {
  successSubmissionChangePaymentGateway: null,
  errorSubmissionChangePaymentGateway: null,
  errorFieldSubmissionChangePaymentGateway: null,
  loadingSubmissionChangePaymentGateway: false,
}
export const submissionChangePaymentGatewaySlice = createSlice({
  name: 'submissionChangePaymentGateway',
  initialState: initialSubmissionChangePaymentGatewayState,
  reducers: {
    setSuccessSubmissionChangePaymentGateway: (state, action) => {
      state.successSubmissionChangePaymentGateway = action.payload
    },
    setErrorSubmissionChangePaymentGateway: (state, action) => {
      state.errorSubmissionChangePaymentGateway = action.payload.error || null
      state.errorFieldSubmissionChangePaymentGateway = action.payload.errorField || null
    },
    setLoadingSubmissionChangePaymentGateway: (state, action) => {
      state.loadingSubmissionChangePaymentGateway = action.payload
    },
    resetSubmissionChangePaymentGateway: (state) => {
      state.successSubmissionChangePaymentGateway = false
      state.errorSubmissionChangePaymentGateway = null
      state.errorFieldSubmissionChangePaymentGateway = null
    },
  },
})