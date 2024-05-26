import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Landing from './Pages/Landing';
import Dashboard from './Pages/Dashboard';
import SellerDashboard from './Pages/SellerDashboard';

function App() {
  return (
    // <div>
    //   {/* <Login/> */}
    //   {/* <Register/> */}
    //   {/* <Landing/> */}
    //   {/* <Dashboard/> */}
    //   <SellerDashboard/>
    // </div>

    <Router>
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buyerdashboard" element={<Dashboard />} />
          <Route path="/sellerdashboard" element={<SellerDashboard />} />
      </Routes>
    </Router>

  );
}

export default App;
