import './App.css';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Profile from './components/pages/Profile';
import UpdateProfile from './components/pages/UpdateProfile';
import UpdatePassword from './components/pages/UpdatePassword';
import UpdateUser from './components/pages/UpdateUser';
import ProtectedRoute from './components/route/ProtectedRoute';
import Dashboard from './components/pages/Dashboard';


function App() {
 
  useEffect(() => {
    store.dispatch(loadUser)
  }, [])

  
  return (
    <Router>
      <div className="App">
        <Header />

        <div className='container container-fluid'>
          <ToastContainer theme='dark' />
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/myprofile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
            <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
            <Route path='/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
            <Route path='/dashboard/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
