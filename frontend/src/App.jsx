import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import FooterComp from './components/FooterComp/FooterComp';
import MessagesComp from './components/ProfileComp/MessagesComp';
import AddDigitalProductComp from './components/ListingsComp/AddDigitalProductComp';
import ClientProducts from './components/ClientComp/ClientProducts';
import Cart from './components/ClientComp/Cart';

/** auth middleware */
import {
  AuthorizeUser,
  ProtectRoute,
  SellerRoute,
  AdminRoute,
} from './middleware/auth';
import ServicesComp from './components/ServicesComp/ServicesComp';
import AddDigitalServices from './components/ServicesComp/AddDigitalServices';
import ClientServices from './components/ClientComp/ClientServices';
import BuyHK from './components/ClientComp/BuyHK';
import AdminPanel from './components/AdminComp/AdminPanel';
import ManageUser from './components/AdminComp/ManageUser';
import ManageProducts from './components/AdminComp/ManageProducts';
import ManageServices from './components/AdminComp/ManageServices';
import SellerProfileView from './components/ClientComp/SellerProfileView';
import AccountVerify from './components/RegisterComp/AccountVerify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientHome />} />
        <Route path="/products" element={<ClientProducts />} />
        <Route path="/services" element={<ClientServices />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buyCredits" element={<BuyHK />} />
        <Route path="/sellerProfileView" element={<SellerProfileView />} />
        <Route path="/accountVerify" element={<AccountVerify />} />
        <Route path="/" element={<Layout />}>
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
          <Route
            path="/listings"
            element={
              <SellerRoute>
                <ListingsComp />
              </SellerRoute>
            }
          />
          <Route
            path="/listings/addDigitalProduct"
            element={
              <SellerRoute>
                <AddDigitalProductComp />
              </SellerRoute>
            }
          />
          <Route
            path="/serviceListings"
            element={
              <SellerRoute>
                <ServicesComp />
              </SellerRoute>
            }
          />
          <Route
            path="/serviceListings/addDigitalService"
            element={
              <SellerRoute>
                <AddDigitalServices />
              </SellerRoute>
            }
          />
          <Route path="/messages" element={<MessagesComp />} />
          <Route path="/orders" element={<OrdersComp />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>

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
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manageUsers"
          element={
            <AdminRoute>
              <ManageUser />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manageProducts"
          element={
            <AdminRoute>
              <ManageProducts />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manageServices"
          element={
            <AdminRoute>
              <ManageServices />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

function Layout() {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/" />;

  return (
    <main>
      <NavbarComponent />
      <Outlet />
      <FooterComp />
    </main>
  );
}

export default App;
