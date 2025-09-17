import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import AdminLogin from './Adminlogin';
import Dashboard from './Dashboard';
import Donation from './Donation';
import Donation1 from './Donation1';
import Adoption from './Adoption';
import About from './About';
import Children from './Children';
import ChildrenEdit from './ChildrenEdit';
import ChildrenUpdate from './ChildrenUpdate';
import AdoptionAdmin from './AdoptionAdmin';
import ChildrenView from './ChildrenView';
import DonationAdmin from './DonationAdmin';
import DashboardAdmin from './DashboardAdmin';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/about' element={<About />} />
        <Route path='/donation' element={<Donation />} />
        <Route path='/donation1' element={<Donation1 />} />
        <Route path='/adoption' element={<Adoption />} />
        <Route path='/childrenview' element={<ChildrenView />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='children' element={<Children />} />
          <Route path='adoptionadmin' element={<AdoptionAdmin />} />
          <Route path='donationadmin' element={<DonationAdmin />} />
          <Route path='dashboardadmin' element={<DashboardAdmin />} />
          <Route path='childrenedit' element={<ChildrenEdit />} />
          <Route path='childrenupdate/:id' element={<ChildrenUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

