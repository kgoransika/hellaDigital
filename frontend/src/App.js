import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

/** import all components */
import Register from './components/RegisterComp/Register';
import Profile from './components/RegisterComp/Profile';
import Recovery from './components/RegisterComp/Recovery';
import Reset from './components/RegisterComp/Reset';
import PageNotFound from './components/PageNotFound';
import Login from './components/RegisterComp/Login';

/** root routes */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login></Login>,
  },
  {
    path: '/register',
    element: <Register></Register>,
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
    path: '/profile',
    element: <Profile></Profile>,
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
