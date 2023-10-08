import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectAuth } from 'store/authSlice';
import Login from 'views/login';

const PrivateRoute = () => {
  const auth = useSelector(selectAuth);
  return auth?.user ? <Outlet /> : <Login />;
};

export default PrivateRoute;
