import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './content/home';
import StoreManagementDashboard from './content/store'
import TenantRegistrationForm from './content/signup'
import VerificationForm from './content/verification'
import LoginForm from './content/login';
import SettingsComponent from './content/setting';
import ForgotPasswordComponent from './content/forgotPassword'
import PaymentInvoice from './content/invoice'
import { ScrollToTop } from './content/helper';
import PrivateRoute from './reducers/privateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { 
  fetchAuthStatusLogin,
  fetchDataAccount,
} from './actions/get'; 
import PaymentProcessing from './content/paymentProcessing'
import CreateEmployee from './content/createEmployee';
import AddStoreForm from './content/addStore';
import PendingTransactions from './content/transaction';
import UpdateStoreTenantForm from './content/updateStore';
import ChangePaymentGateway from './content/changePaymentGateway';

function App() {
  const dispatch = useDispatch()

  const { loggedIn } = useSelector((state) => state.persisted.loginStatus)
  useEffect(() => {
    if (!loggedIn) {
      dispatch(fetchAuthStatusLogin())
    }
  }, [loggedIn])

  // get data account
  const {dataAccount, errorDataAccount, loadingDataAccount} = useSelector((state) => state.persisted.getDataAccount)
  useEffect(() => {
    if (Object.keys(dataAccount).length === 0) {
      dispatch(fetchDataAccount())
    }
  }, [])

  const {dataRegisterVerification} = useSelector((state) => state.persisted.registerVerification)
  const {dataExtendServiceStore} = useSelector((state) => state.persisted.extendServiceStore)
  const {dataSuccess} = useSelector((state) => state.persisted.addStore)

  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signup' element={<TenantRegistrationForm/>}/>
        <Route path='/signup/verification' element={<VerificationForm/>}/>
        <Route path='/forgot/password' element={<ForgotPasswordComponent/>}/>
        <Route path='/invoice/signup' element={<PaymentInvoice paymentData={dataRegisterVerification} colorType={"external"}/>}/>

        <Route path='/payment/required' element={<PendingTransactions/>}/>

        <Route element={<PrivateRoute/>}> 
          <Route path='/store' element={<StoreManagementDashboard/>}/>
          <Route path='/store/employee' element={<CreateEmployee/>}/>
          <Route path='/store/update' element={<UpdateStoreTenantForm/>}/>
          <Route path='/store/add' element={<AddStoreForm/>}/>
          <Route path='/payment/processing' element={<PaymentProcessing/>}/>
          <Route path='/setting' element={<SettingsComponent/>}/>
          <Route path='/setting/submission/change/payment/gateway' element={<ChangePaymentGateway/>}/>
          <Route path='/invoice/extend/service' element={<PaymentInvoice paymentData={dataExtendServiceStore} colorType={"internal"}/>}/>
          <Route path='/invoice/create/store' element={<PaymentInvoice paymentData={dataSuccess} colorType={"internal"}/>}/>
        </Route> 
      </Routes>
    </Router>
  );
}

export default App;
