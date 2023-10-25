import { Navigate, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound';
import { useEffect, useState } from 'react';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import jwtDecode from "jwt-decode";
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import WishList from './components/WishList/WishList';

function App() {
      let [userData, setUserData ] =useState(null);
      useEffect(()=>{
        if(localStorage.getItem('userToken')) {
          let token = localStorage.getItem('userToken');
          let data = jwtDecode(token);
      saveUserData(data);
        }
      },[])

      function saveUserData(data) {
        setUserData(data)
      }
      function ProtectedRoute(props) {
        if(localStorage.getItem('userToken')) {
            return props.children
        }
        else {
          return <Login saveUserData={saveUserData}/>
        }
      }
      function logOut() {
        saveUserData(null)
        localStorage.removeItem('userToken');
        
        return <Navigate to = '/login' />
      }

      const routes = createBrowserRouter([
      {path:'',element:< Layout logOut={logOut} userData={userData}/>,children:[
      {index:true,element:<ProtectedRoute> <Home userData={userData} /> </ProtectedRoute> },
      {path:'home',element:<ProtectedRoute> <Home userData={userData} /> </ProtectedRoute> },
      {path:'categories',element:<ProtectedRoute> < Categories userData={userData} /> </ProtectedRoute> },
      {path:'products',element:<ProtectedRoute> < Products userData={userData} /> </ProtectedRoute> },
      {path:'ProductDetails/:id',element:<ProtectedRoute> < ProductDetails userData={userData} /> </ProtectedRoute> },
      {path:'cart',element:<ProtectedRoute> < Cart userData={userData} /> </ProtectedRoute> },
      {path:'checkout',element:<ProtectedRoute> < Checkout /> </ProtectedRoute> },
      {path:'wishlist',element:<ProtectedRoute> < WishList /> </ProtectedRoute> },
      {path:'brands',element:<ProtectedRoute> < Brands userData={userData} /> </ProtectedRoute> },
      {path:'register',element:<Register />},
      {path:'login',element:<Login saveUserData={saveUserData}/>},
      {path:'forgetPassword',element:<ForgetPassword />},
      {path:'resetPassword',element:<ResetPassword />},
      {path:'',element:<Layout />},
      {path:'*',element:<NotFound />},
      ]},
      
    ])
  return (
    <>
<Provider store={store}> 
      <RouterProvider router={routes}/>
<Toaster />
</Provider>
    </>
  );
}

export default App;
