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
const AllTrips = Loadable(lazy(() => import('views/pages/TheTrip/AllTrips')));
const TripExpense = Loadable(
  lazy(() => import('views/pages/TheTrip/TripExpense'))
);

// libraries
const ActiveParty = Loadable(
  lazy(() => import('views/Libraries/TheParty/ActiveParty'))
);
const InactiveParty = Loadable(
  lazy(() => import('views/Libraries/TheParty/InactiveParty'))
);
const ActiveVehicle = Loadable(
  lazy(() => import('views/Libraries/VehicleInfo/ActiveVehicle'))
);
const InactiveVehicle = Loadable(
  lazy(() => import('views/Libraries/VehicleInfo/InactiveVehicle'))
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
          children: [
            {
              path: 'trip',
              children: [
                {
                  path: 'all-trips',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['all-trips']}
                    >
                      <AllTrips />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'trip-expense',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['trip-expense']}
                    >
                      <TripExpense />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
          ],
        },
        {
          path: 'libraries',
          children: [
            {
              path: 'party',
              children: [
                {
                  path: 'active-party',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['active-party']}
                    >
                      <ActiveParty />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'inactive-party',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['inactive-party']}
                    >
                      <InactiveParty />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'vehicle',
              children: [
                {
                  path: 'active-vehicle',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
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
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['inactive-vehicle']}
                    >
                      <InactiveVehicle />
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
                      allowedRoles={['super_admin', 'admin']}
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
                      allowedRoles={['super_admin', 'admin']}
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
                  allowedRoles={['super_admin', 'admin']}
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
                  allowedRoles={['super_admin', 'admin']}
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
                      allowedRoles={['super_admin', 'admin']}
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
                      allowedRoles={['super_admin', 'admin']}
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
