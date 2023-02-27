import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

/** import all components */
import Register from './components/RegisterComp/Register';
import Password from './components/RegisterComp/Password';
import Profile from './components/RegisterComp/Profile';
import Recovery from './components/RegisterComp/Recovery';
import Reset from './components/RegisterComp/Reset';
import PageNotFound from './components/PageNotFound';
import Username from './components/RegisterComp/Username';

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth';

/** root routes */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username></Username>,
  },
  {
    path: '/register',
    element: <Register></Register>,
  },
  {
    path: '/password',
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: '/recovery',
    element: <Recovery></Recovery>,
  },
  {
    path: '/reset',
    element: <Reset></Reset>,
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
