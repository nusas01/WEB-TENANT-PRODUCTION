import { createSlice } from "@reduxjs/toolkit";

const initialRegisterVerification = {
    successRegisterVerification: null,
    errorFieldsRegisterVerification: null,
    errorRegisterVerification: null,
    loadingRegisterVerification: false,
    dataRegisterVerification: null, 
}
export const registerVerificationSlice = createSlice({
    name: 'registerVerification',
    initialState: initialRegisterVerification,
    reducers: {
        setSuccessRegisterVerification: (state, action) => {
            state.successRegisterVerification = action.payload
        },
        setErrorRegisterVerification: (state, action) => {
            state.errorFieldsRegisterVerification = action.payload.errorField
            state.errorRegisterVerification = action.payload.error
        },
        setLoadingRegisterVerification: (state, action) => {
            state.loadingRegisterVerification = action.payload
        },
        setDataRegisterVerification: (state, action) => {
            state.dataRegisterVerification = action.payload
        },
        resetRegisterVerification: (state) => {
            state.errorFieldsRegisterVerification = null
            state.errorRegisterVerification = null
            state.successRegisterVerification = false
        }
    }
})

const initialPatchCredentialStore = {
    successPatchCredentialStore: null,
    errorFieldsPatchCredentialStore: null,
    errorPatchCredentialStore: null,
    loadingPatchCredentialStore: false,
}
export const patchCredentialStoreSlice = createSlice({
    name: 'patchCredentialStore',
    initialState: initialPatchCredentialStore,
    reducers: {
        setSuccessPatchCredentialStore: (state, action) => {
            state.successPatchCredentialStore = action.payload
        },
        setErrorPatchCredentialStore: (state, action) => {
            state.errorFieldsPatchCredentialStore = action.payload.errorField
            state.errorPatchCredentialStore = action.payload.error
        },
        setLoadingPatchCredentialStore: (state, action) => {
            state.loadingPatchCredentialStore = action.payload
        },
        resetPatchCredentialStore: (state) => {
            state.errorFieldsPatchCredentialStore = null
            state.errorPatchCredentialStore = null
            state.successPatchCredentialStore = false
        }
    }
})

const initialUpdateChangePaymentGateway = {
    successUpdateChangePaymentGateway: null,
    errorFieldsUpdateChangePaymentGateway: null,
    errorUpdateChangePaymentGateway: null,
    loadingUpdateChangePaymentGateway: false,
}
export const updateChangePaymentGatewaySlice = createSlice({
    name: 'updateChangePaymentGateway',
    initialState: initialUpdateChangePaymentGateway,
    reducers: {
        setSuccessUpdateChangePaymentGateway: (state, action) => {
            state.successUpdateChangePaymentGateway = action.payload
        },
        setErrorUpdateChangePaymentGateway: (state, action) => {
            state.errorFieldsUpdateChangePaymentGateway = action.payload.errorField
            state.errorUpdateChangePaymentGateway = action.payload.error
        },
        setLoadingUpdateChangePaymentGateway: (state, action) => {
            state.loadingUpdateChangePaymentGateway = action.payload
        },
        resetUpdateChangePaymentGateway: (state) => {
            state.errorFieldsUpdateChangePaymentGateway = null
            state.errorUpdateChangePaymentGateway = null
            state.successUpdateChangePaymentGateway = false
        }
    }
})


const initialExtendServiceStore = {
    successExtendServiceStore: null,
    errorFieldsExtendServiceStore: null,
    errorSubdomain: null,
    errorExtendServiceStore: null,
    loadingExtendServiceStore: false,
    dataExtendServiceStore: null,
}
export const extendServiceStoreSlice = createSlice({
    name: 'extendServiceStore',
    initialState: initialExtendServiceStore,
    reducers: {
        setSuccessExtendServiceStore: (state, action) => {
            state.successExtendServiceStore = action.payload
        },
        setErrorExtendServiceStore: (state, action) => {
            state.errorFieldsExtendServiceStore = action.payload.errorField
            state.errorExtendServiceStore = action.payload.error
            state.errorSubdomain = action.payload.errorSubdomain
        },
        setLoadingExtendServiceStore: (state, action) => {
            state.loadingExtendServiceStore = action.payload
        },
        setDataExtendServiceStore: (state, action) => {
            state.dataExtendServiceStore = action.payload
        },
        resetErrorExtendServiceStore: (state) => {
            state.errorExtendServiceStore = null
            state.errorFieldsExtendServiceStore = null
        },
        resetExtendServiceStore: (state) => {
            state.errorFieldsExtendServiceStore = null
            state.errorExtendServiceStore = null
            state.successExtendServiceStore = false
        }
    }
})


const initialChangePasswordEmployeeStore = {
    successChangePasswordEmployee: null,
    errorFieldsChangePasswordEmployee: null,
    errorChangePasswordEmployee: null,
    loadingChangePasswordEmployee: false,
}
export const changePasswordEmployeeSlice = createSlice({
    name: 'changePasswordEmployee',
    initialState: initialChangePasswordEmployeeStore,
    reducers: {
        setSuccessChangePasswordEmployee: (state, action) => {
            state.successChangePasswordEmployee = action.payload
        },
        setErrorChangePasswordEmployee: (state, action) => {
            state.errorFieldsChangePasswordEmployee = action.payload.errorField
            state.errorChangePasswordEmployee = action.payload.error
        },
        setLoadingChangePasswordEmployee: (state, action) => {
            state.loadingChangePasswordEmployee = action.payload
        },
        resetChangePasswordEmployee: (state) => {
            state.errorFieldsChangePasswordEmployee = null
            state.errorChangePasswordEmployee = null
            state.successChangePasswordEmployee = false
        }
    }
})