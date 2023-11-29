import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AuthenticationRoutes from './AuthenticationRoutes';
// import Expenses from 'views/pages/Expenses';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// pages routing
// vehicle management
const VehicleBrand = Loadable(
  lazy(() => import('views/pages/VehicleManagement/VehicleBrand'))
);
const VehicleModel = Loadable(
  lazy(() => import('views/pages/VehicleManagement/VehicleModel'))
);
const Vehicles = Loadable(
  lazy(() => import('views/pages/VehicleManagement/Vehicles'))
);

// driver management
const Drivers = Loadable(
  lazy(() => import('views/pages/DriverManagement/Drivers'))
);

// trip management
const Parties = Loadable(
  lazy(() => import('views/pages/TripManagement/Parties'))
);
const TripIncomeHeads = Loadable(
  lazy(() => import('views/pages/TripManagement/TripIncomeHeads'))
);
const TripExpenseHeads = Loadable(
  lazy(() => import('views/pages/TripManagement/TripExpenseHeads'))
);
const AllTrips = Loadable(
  lazy(() => import('views/pages/TripManagement/AllTrips'))
);
const CreateTrip = Loadable(
  lazy(() => import('views/pages/TripManagement/AllTrips/CreateTrip'))
);
const UpdateTrip = Loadable(
  lazy(() => import('views/pages/TripManagement/AllTrips/UpdateTrip'))
);

// financial management
const AccountHeads = Loadable(
  lazy(() => import('views/pages/FinancialManagement/AccountHeads'))
);

// fuel management
const FuelTypes = Loadable(
  lazy(() => import('views/pages/FuelManagement/FuelTypes'))
);
const PumpStation = Loadable(
  lazy(() => import('views/pages/FuelManagement/PumpStation'))
);
const FuelLogs = Loadable(
  lazy(() => import('views/pages/FuelManagement/FuelLogs'))
);

// Maintenance Management
const RepairMaintenance = Loadable(
  lazy(() => import('views/pages/Maintenance/RepairMaintenance'))
);
const CreateRepair = Loadable(
  lazy(() => import('views/pages/Maintenance/RepairMaintenance/CreateRepair'))
);
const UpdateRepair = Loadable(
  lazy(() => import('views/pages/Maintenance/RepairMaintenance/UpdateRepair'))
);

// store management
const Equipment = Loadable(
  lazy(() => import('views/pages/StoreManagement/Equipment'))
);
const EquipmentTitle = Loadable(
  lazy(() => import('views/pages/StoreManagement/EquipmentTitle'))
);
const Uom = Loadable(lazy(() => import('views/pages/StoreManagement/Uom')));

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
              path: 'vehicle-management',
              children: [
                {
                  path: 'brands',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['brands']}
                    >
                      <VehicleBrand />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'models',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['models']}
                    >
                      <VehicleModel />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'vehicles',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['vehicles']}
                    >
                      <Vehicles />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'driver-management',
              children: [
                {
                  path: 'drivers',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['drivers']}
                    >
                      <Drivers />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'trip-management',
              children: [
                {
                  path: 'parties',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['parties']}
                    >
                      <Parties />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'trip-income-heads',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['trip-income-heads']}
                    >
                      <TripIncomeHeads />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'trip-expense-heads',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['trip-expense-heads']}
                    >
                      <TripExpenseHeads />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'all-trips',
                  children: [
                    {
                      path: '',
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
                      path: 'create',
                      element: (
                        <AuthenticationRoutes
                          allowedRoles={['super_admin', 'admin']}
                          allowedCodes={['all-trips']}
                        >
                          <CreateTrip />
                        </AuthenticationRoutes>
                      ),
                    },
                    {
                      path: 'edit/:id',
                      element: (
                        <AuthenticationRoutes
                          allowedRoles={['super_admin', 'admin']}
                          allowedCodes={['all-trips']}
                        >
                          <UpdateTrip />
                        </AuthenticationRoutes>
                      ),
                    },
                  ],
                },
              ],
            },
            {
              path: 'financial',
              children: [
                {
                  path: 'account-heads',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['account-heads']}
                    >
                      <AccountHeads />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'fuel-management',
              children: [
                {
                  path: 'fuel-types',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['fuel-types']}
                    >
                      <FuelTypes />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'pump-station',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['pump-station']}
                    >
                      <PumpStation />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'fuel-logs',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['fuel-logs']}
                    >
                      <FuelLogs />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'maintenance',
              children: [
                {
                  path: 'repair-maintenance',
                  children: [
                    {
                      path: '',
                      element: (
                        <AuthenticationRoutes
                          allowedRoles={['super_admin', 'admin']}
                          allowedCodes={['repair-maintenance']}
                        >
                          <RepairMaintenance />
                        </AuthenticationRoutes>
                      ),
                    },
                    {
                      path: 'create-repair',
                      element: (
                        <AuthenticationRoutes
                          allowedRoles={['super_admin', 'admin']}
                          allowedCodes={['repair-maintenance']}
                        >
                          <CreateRepair />
                        </AuthenticationRoutes>
                      ),
                    },
                    {
                      path: 'edit/:id',
                      element: (
                        <AuthenticationRoutes
                          allowedRoles={['super_admin', 'admin']}
                          allowedCodes={['repair-maintenance']}
                        >
                          <UpdateRepair />
                        </AuthenticationRoutes>
                      ),
                    },
                  ],
                },
              ],
            },
            {
              path: 'store-management',
              children: [
                {
                  path: 'equipment',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['equipment']}
                    >
                      <Equipment />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'equipment-title',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['equipment-title']}
                    >
                      <EquipmentTitle />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'uom',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['uom']}
                    >
                      <Uom />
                    </AuthenticationRoutes>
                  ),
                },
              ],
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
