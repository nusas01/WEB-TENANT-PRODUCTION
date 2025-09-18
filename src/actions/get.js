import axios from "axios";
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
} from '../reducers/get'
import {
  collectFingerprintAsync
} from '../helperComponent/fp'

import {statusExpiredUserTokenSlice} from '../reducers/expToken'

const {setStatusExpiredUserToken} = statusExpiredUserTokenSlice.actions

const {setLoginStatus} = loginStatusSlice.actions
export const fetchAuthStatusLogin = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_AUTH_STATUS_LOGIN}`,{
                withCredentials: true, 
            })
            dispatch(setLoginStatus(response?.data.loggedIn))
        } catch (error) {
            dispatch(setLoginStatus(false))
        }
    }
} 

const {setDataAccount, setErrorDataAccount, setLoadingDataAccount} = getDataAccountSlice.actions
export const fetchDataAccount = () => {
    return async (dispatch) => {
      dispatch(setLoadingDataAccount(true))
      try{
          const response = await axios.get(`${process.env.REACT_APP_ACCOUNT_TENANT_DATA}`, {
              withCredentials: true
          })
          dispatch(setDataAccount(response?.data))
      } catch(error) {
            dispatch(setErrorDataAccount(error.response?.data?.error))
      } finally {
          dispatch(setLoadingDataAccount(false))
      }
    }
}

const {setSuccessLogout, setErrorLogout, setLoadingLogout} = logoutSlice.actions
export const fetchLogout = () => {
    return async (dispatch) => {
      dispatch(setLoadingLogout(true))
      try{
          const response = await axios.get(`${process.env.REACT_APP_LOGOUT}`, {
              withCredentials: true
          })
          dispatch(setSuccessLogout(response?.data.success))
      } catch(error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setErrorLogout(error.response?.data?.error))
      } finally {
          dispatch(setLoadingLogout(false))
      }
    }
}

const {setSuccessProductService, setErrorProductService, setLoadingProductService} = productServicesSlice.actions
export const fetchProductServices = () => {
    return async (dispatch) => {
        dispatch(setLoadingProductService(true))
        try {
          const nonce_data = await collectFingerprintAsync()

          const params = {
            nonce: nonce_data.nonce, 
            value: nonce_data.value, 
            iv: nonce_data.iv, 
          }

          const response = await axios.get(`${process.env.REACT_APP_PRODUCT_SERVICES}`, {
              withCredentials: true,
              params: params,
          })
          dispatch(setSuccessProductService(response?.data))
        } catch (error) {
            dispatch(setErrorProductService(error?.response?.data?.error))
        } finally {
            dispatch(setLoadingProductService(false))
        }
    }
}

const {setSuccessPaymentMethods, setErrorPaymentMethods, setLoadingPaymentMethods} = paymentMethodsSlice.actions
export const fetchPaymentMethods = () => {
    return async (dispatch) => {
        dispatch(setLoadingPaymentMethods(true))
        try {
          const nonce_data = await collectFingerprintAsync()

          const params = {
            nonce: nonce_data.nonce, 
            value: nonce_data.value, 
            iv: nonce_data.iv, 
          }

          const response = await axios.get(`${process.env.REACT_APP_PAYMENT_METHODS}`, {
              withCredentials: true,
              params: params,
          })
          dispatch(setSuccessPaymentMethods({ 
              data: response?.data?.data,
              tax: response?.data?.tax
          }))
        } catch (error) {
            dispatch(setErrorPaymentMethods(error?.response?.data?.error))
        } finally {
            dispatch(setLoadingPaymentMethods(false))
        }
    }
}

const {
  setAllStores,
  setLoadingStore,
  setErrorStore,
} = storeSlice.actions
export const fetchAllStores = () => {
  return async (dispatch) => {
    dispatch(setLoadingStore(true))
    try {
        const response = await axios.get(process.env.REACT_APP_GET_ALL_STORE, {
            withCredentials: true,
        })
        dispatch(setAllStores(response?.data || []))
    } catch (error) {
        if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
            dispatch(setStatusExpiredUserToken(true));
        }
        dispatch(setErrorStore(error?.response?.data?.error || 'Gagal memuat daftar store'))
    } finally {
        dispatch(setLoadingStore(false))
    }
  }
}

const {
    setDetailStore, 
    setLoadingDetailStore, 
    setErrorDetailStore,
} = detailStoreSlice.actions
export const fetchDetailStore = (id) => {
    return async (dispatch) => {
        dispatch(setLoadingDetailStore(true))
        try {
            const response = await axios.get(`${process.env.REACT_APP_GET_DETAIL_STORE}`, {
                withCredentials: true,
                params: {
                    id: id,
                },
            })
            dispatch(setDetailStore(response?.data))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setErrorDetailStore(error.response?.data?.error))
        } finally {
            dispatch(setLoadingDetailStore(false))
        }
    }
}

const {
  setEmployees,
  setLoadingGetEmployees,
  setErrorGetEmployees,
} = getEmployeesSlice.actions
export const fetchAllEmployees = (storeId) => {
  return async (dispatch) => {
    dispatch(setLoadingGetEmployees(true))
    try {
      const response = await axios.get(process.env.REACT_APP_EMPLOYEE, {
        params: { store_id: storeId },
        withCredentials: true,
      })
      dispatch(setEmployees(response?.data || []))
    } catch (error) {
        if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
            dispatch(setStatusExpiredUserToken(true));
        }
        dispatch(setErrorGetEmployees(error?.response?.data?.error || 'Gagal memuat daftar employee'))
    } finally {
        dispatch(setLoadingGetEmployees(false))
    }
  }
}

const {setRequiredPayment, setLoadingRequiredPayment, setErrorRequiredPayment} = getRequiredPaymentSlice.actions
export const fetchRequiredPayment = () => {
    return async (dispatch) => {
      dispatch(setLoadingRequiredPayment(true))
      try{
        const response = await axios.get(`${process.env.REACT_APP_PENDING_TRANSACTION}`, {
            withCredentials: true
        })
        dispatch(setRequiredPayment(response?.data))
      } catch(error) {
        if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
            dispatch(setStatusExpiredUserToken(true));
        }
        dispatch(setErrorRequiredPayment(error.response?.data?.error))
      } finally {
        dispatch(setLoadingRequiredPayment(false))
      }
    }
}

const {setSuccessStatusChangePaymentGateway, setErrorStatusChangePaymentGateway, setLoadingStatusChangePaymentGateway} = GetStatusChangePaymentGatewaySlice.actions
export const fetchStatusChangePaymentGateway = () => {
    return async (dispatch) => {
      dispatch(setLoadingStatusChangePaymentGateway(true))
      try{
        const response = await axios.get(`${process.env.REACT_APP_GET_STATUS_CHANGE_PAYMENT_GATEWAY}`, {
            withCredentials: true
        })
        dispatch(setSuccessStatusChangePaymentGateway({ 
            isUpdate: response?.data?.is_update,
            isProcess: response?.data?.is_process,
        }))
      } catch(error) {
        if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
            dispatch(setStatusExpiredUserToken(true));
        }
        dispatch(setErrorStatusChangePaymentGateway(error.response?.data?.error))
      } finally {
        dispatch(setLoadingStatusChangePaymentGateway(false))
      }
    }
}

const {setSuccessProductChangePaymentGateway, setErrorProductChangePaymentGateway, setLoadingProductChangePaymentGateway} = GetProductChangePaymentGatewaySlice.actions
export const fetchProductChangePaymentGateway = () => {
    return async (dispatch) => {
      dispatch(setLoadingProductChangePaymentGateway(true))
      try{
        const response = await axios.get(`${process.env.REACT_APP_GET_PRODUCT_CHANGE_PAYMENT_GATEWAY}`, {
            withCredentials: true
        })
        dispatch(setSuccessProductChangePaymentGateway(response?.data?.data))
      } catch(error) {
        if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
            dispatch(setStatusExpiredUserToken(true));
        }
        dispatch(setErrorProductChangePaymentGateway(error.response?.data?.error))
      } finally {
        dispatch(setLoadingProductChangePaymentGateway(false))
      }
    }
}

export const fetchNonce = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_NONCE}`,
      {
        headers: {
          "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
        },
        withCredentials: true,
      }
    );

    return { data: response?.data, error: null };
  } catch (error) {
    // handle khusus kalau token expired
    if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
      return { data: null, error: "TOKEN_USER_EXPIRED" };
    }

    return { data: null, error: error.response?.data?.error || "Unexpected error" };
  }
};