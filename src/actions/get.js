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
} from '../reducers/get'


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
          dispatch(setLoginStatus(false))
          // reset data customer ketika sudah di buat endpoint
      } catch(error) {
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
            const response = await axios.get(`${process.env.REACT_APP_PRODUCT_SERVICES}`, {
                withCredentials: true,
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
            const response = await axios.get(`${process.env.REACT_APP_PAYMENT_METHODS}`, {
                withCredentials: true
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
      dispatch(setErrorGetEmployees(error?.response?.data?.error || 'Gagal memuat daftar employee'))
    } finally {
      dispatch(setLoadingGetEmployees(false))
    }
  }
}

