import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AuthenticationRoutes from './AuthenticationRoutes';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// pages routing

// libraries
const ActiveVehicle = Loadable(
  lazy(() => import('views/Libraries/VehicleInfo/ActiveVehicle'))
);
const ActiveDriver = Loadable(
  lazy(() => import('views/Libraries/DriverInfo/ActiveDriver'))
);
const InactiveDriver = Loadable(
  lazy(() => import('views/Libraries/DriverInfo/InactiveDriver'))
);
const VehicleBrand = Loadable(
  lazy(() => import('views/Libraries/VehicleBrand'))
);
const VehicleModel = Loadable(
  lazy(() => import('views/Libraries/VehicleModel'))
);

// utilities routing

// setting routing
const ManageUser = Loadable(lazy(() => import('views/setting/ManageUser')));
const SingleUser = Loadable(
  lazy(() => import('views/setting/ManageUser/SingleUser'))
);
const UserInfo = Loadable(
  lazy(() => import('views/setting/ManageUser/SingleUser/UserInfo'))
);
const UserPermission = Loadable(
  lazy(() => import('views/setting/ManageUser/SingleUser/UserPermission'))
);

// support routing
const Support = Loadable(lazy(() => import('views/support')));

// Support error routing
const Error404 = Loadable(lazy(() => import('views/Error404')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <PrivateRoute />,
  children: [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Navigate to="dashboard" replace={true} />,
        },
        {
          path: 'dashboard',
          element: <Navigate to="default" replace={true} />,
        },
        {
          path: 'dashboard/default',
          element: <DashboardDefault />,
        },
        {
          path: 'pages',
          children: [],
        },
        {
          path: 'libraries',
          children: [
            {
              path: 'vehicle',
              children: [
                {
                  path: 'active-vehicle',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['active-vehicle']}
                    >
                      <ActiveVehicle />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'inactive-vehicle',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['inactive-vehicle']}
                    >
                      <ActiveVehicle />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'driver',
              children: [
                {
                  path: 'active-driver',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['active-driver']}
                    >
                      <ActiveDriver />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'inactive-driver',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['inactive-driver']}
                    >
                      <InactiveDriver />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'vehicle-brand',
              element: (
                <AuthenticationRoutes
                  allowedRoles={['super_admin']}
                  allowedCodes={['vehicle-brand']}
                >
                  <VehicleBrand />
                </AuthenticationRoutes>
              ),
            },
            {
              path: 'vehicle-model',
              element: (
                <AuthenticationRoutes
                  allowedRoles={['super_admin']}
                  allowedCodes={['vehicle-model']}
                >
                  <VehicleModel />
                </AuthenticationRoutes>
              ),
            },
          ],
        },
        {
          path: 'utils',
          children: [
            {
              path: 'setting',
              children: [
                {
                  path: 'manage-user',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['manage-user']}
                    >
                      <ManageUser />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'manage-user/:id',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['manage-user']}
                    >
                      <SingleUser />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <UserInfo />,
                    },
                    {
                      path: 'permission',
                      element: <UserPermission />,
                    },
                  ],
                },
              ],
            },
            {
              path: 'support',
              element: <Support />,
            },
          ],
        },
        {
          path: '/*',
          element: <Error404 />,
        },
      ],
    },
  ],
};

export default MainRoutes;
