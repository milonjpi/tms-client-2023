import React from 'react';
import { useSelector } from 'react-redux';
import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import { selectAuth } from 'store/authSlice';

const UnAuthorized = Loadable(lazy(() => import('views/UnAuthorized')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = ({ children, allowedRoles, allowedCodes }) => {
  const auth = useSelector(selectAuth);
  return allowedRoles.includes(auth?.user?.role) ||
    auth?.user?.menus?.find((code) => allowedCodes.includes(code.label)) ||
    auth?.user?.subMenus?.find((code) => allowedCodes.includes(code.label)) ||
    auth?.user?.sections?.find((code) => allowedCodes.includes(code.label)) ? (
    children
  ) : (
    <UnAuthorized />
  );
};

export default AuthenticationRoutes;
