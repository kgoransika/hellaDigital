import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from './hooks/fetch.hook';
/** import all components */
import ClientHome from './components/ClientComp/ClientHome';
import Register from './components/RegisterComp/Register';
import Password from './components/RegisterComp/Password';
import Profile from './components/RegisterComp/Profile';
import Recovery from './components/RegisterComp/Recovery';
import Reset from './components/RegisterComp/Reset';
import PageNotFound from './components/PageNotFound';
import Username from './components/RegisterComp/Username';
import NavbarComponent from './components/NavbarComp/NavbarComp';
import DashboardComp from './components/DashboardComp/DashboardComp';
import OrdersComp from './components/OrdersComp/OrdersComp';
import ListingsComp from './components/ListingsComp/ListingsComp';

/** auth middleware */
import { AuthorizeUser, ProtectRoute, SellerRoute } from './middleware/auth';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<ClientHome />} />
        <Route path="/username" element={<Username />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/password"
          element={
            <ProtectRoute>
              <Password />
            </ProtectRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthorizeUser>
              <Profile />
            </AuthorizeUser>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerRoute>
              <DashboardComp />
            </SellerRoute>
          }
        />
        <Route path="/listings" element={<ListingsComp />} />
        <Route path="/orders" element={<OrdersComp />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
