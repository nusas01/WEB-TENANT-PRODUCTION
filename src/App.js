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
import { fetchAuthStatusLogin } from './actions/get'; 
import PaymentProcessing from './content/paymentProcessing'

function App() {
  const dispatch = useDispatch()

  const { loggedIn } = useSelector((state) => state.persisted.loginStatus)
  useEffect(() => {
    if (!loggedIn) {
      dispatch(fetchAuthStatusLogin())
    }
  }, [loggedIn])

  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signup' element={<TenantRegistrationForm/>}/>
        <Route path='/signup/verification' element={<VerificationForm/>}/>
        <Route path='/forgot/password' element={<ForgotPasswordComponent/>}/>
        <Route path='/invoice' element={<PaymentInvoice/>}/>

        <Route element={<PrivateRoute/>}> 
          <Route path='/store' element={<StoreManagementDashboard/>}/>
          <Route path='/payment/processing' element={<PaymentProcessing/>}/>
          <Route path='/setting' element={<SettingsComponent/>}/>
        </Route> 
      </Routes>
    </Router>
  );
}

export default App;
