import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './content/home';
import StoreManagementDashboard from './content/store'
import TenantRegistrationForm from './content/signup'
import VerificationForm from './content/verification'
import LoginForm from './content/login';
import SettingsComponent from './content/setting';
import { ScrollToTop } from './content/helper';

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signup' element={<TenantRegistrationForm/>}/>
        <Route path='/signup/verification' element={<VerificationForm/>}/>
        <Route path='/store' element={<StoreManagementDashboard/>}/>
        <Route path='/setting' element={<SettingsComponent/>}/>
      </Routes>
    </Router>
  );
}

export default App;
