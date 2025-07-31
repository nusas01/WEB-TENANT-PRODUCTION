import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './content/home';
import StoreManagementDashboard from './content/detailStore'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/store/detail' element={<StoreManagementDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
