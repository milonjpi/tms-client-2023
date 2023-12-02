// assets
import {
  IconTruckDelivery,
  IconTruck,
  IconUsers,
  IconMoneybag,
  IconGasStation,
  IconTool,
  IconTrolley,
  IconCashOff,
  IconFileCertificate,
  IconReport,
} from '@tabler/icons-react';

// constant
const icons = {
  IconTruckDelivery,
  IconTruck,
  IconUsers,
  IconMoneybag,
  IconGasStation,
  IconTool,
  IconTrolley,
  IconCashOff,
  IconFileCertificate,
  IconReport,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'vehicle-management',
      title: 'Vehicle Management',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconTruck,
      children: [
        {
          id: 'brands',
          title: 'Brands',
          type: 'item',
          url: '/pages/vehicle-management/brands',
        },
        {
          id: 'models',
          title: 'Models',
          type: 'item',
          url: '/pages/vehicle-management/models',
        },
        {
          id: 'vehicles',
          title: 'Vehicles',
          type: 'item',
          url: '/pages/vehicle-management/vehicles',
        },
      ],
    },
    {
      id: 'driver-management',
      title: 'Driver Management',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconUsers,
      children: [
        {
          id: 'drivers',
          title: 'Drivers',
          type: 'item',
          url: '/pages/driver-management/drivers',
        },
      ],
    },
    {
      id: 'trip-management',
      title: 'Trip Management',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconTruckDelivery,
      children: [
        {
          id: 'parties',
          title: 'Parties',
          type: 'item',
          url: '/pages/trip-management/parties',
        },
        {
          id: 'trip-income-heads',
          title: 'Trip Income Heads',
          type: 'item',
          url: '/pages/trip-management/trip-income-heads',
        },
        {
          id: 'trip-expense-heads',
          title: 'Trip Expense Heads',
          type: 'item',
          url: '/pages/trip-management/trip-expense-heads',
        },
        {
          id: 'all-trips',
          title: 'All Trips',
          type: 'item',
          url: '/pages/trip-management/all-trips',
        },
      ],
    },
    {
      id: 'financial',
      title: 'Financial',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconMoneybag,
      children: [
        {
          id: 'account-heads',
          title: 'Account Heads',
          type: 'item',
          url: '/pages/financial/account-heads',
        },
      ],
    },
    {
      id: 'fuel-management',
      title: 'Fuel Management',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconGasStation,
      children: [
        {
          id: 'fuel-types',
          title: 'Fuel Types',
          type: 'item',
          url: '/pages/fuel-management/fuel-types',
        },
        {
          id: 'pump-station',
          title: 'Pump Station',
          type: 'item',
          url: '/pages/fuel-management/pump-station',
        },
        {
          id: 'fuel-logs',
          title: 'Fuel Logs',
          type: 'item',
          url: '/pages/fuel-management/fuel-logs',
        },
      ],
    },
    {
      id: 'maintenance',
      title: 'Maintenance',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconTool,
      children: [
        {
          id: 'repair-maintenance',
          title: 'Repair Maintenance',
          type: 'item',
          url: '/pages/maintenance/repair-maintenance',
        },
        {
          id: 'accident-history',
          title: 'Accident History',
          type: 'item',
          url: '/pages/maintenance/accident-history',
        },
      ],
    },
    {
      id: 'store-management',
      title: 'Store Management',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconTrolley,
      children: [
        {
          id: 'equipment',
          title: 'Equipment',
          type: 'item',
          url: '/pages/store-management/equipment',
        },
        {
          id: 'equipment-title',
          title: 'Equipment Title',
          type: 'item',
          url: '/pages/store-management/equipment-title',
        },
        {
          id: 'uom',
          title: 'Unit of Measurement',
          type: 'item',
          url: '/pages/store-management/uom',
        },
      ],
    },

    {
      id: 'expense',
      title: 'Miscellaneous Expenses',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconCashOff,
      children: [
        {
          id: 'expense-head',
          title: 'Expense Heads',
          type: 'item',
          url: '/pages/expense/expense-head',
        },
        {
          id: 'expense',
          title: 'All Expenses',
          type: 'item',
          url: '/pages/expense',
        },
      ],
    },
    {
      id: 'paper',
      title: 'Paper Work',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconFileCertificate,
      children: [
        {
          id: 'tax',
          title: 'Tax/Token',
          type: 'item',
          url: '/page/paper/tax',
        },
        {
          id: 'fitness',
          title: 'Fitness',
          type: 'item',
          url: '/page/paper/fitness',
        },
        {
          id: 'route',
          title: 'Route Permit',
          type: 'item',
          url: '/page/paper/route',
        },
      ],
    },
    {
      id: 'report',
      title: 'Report',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconReport,
      children: [
        {
          id: 'summary',
          title: 'Summary',
          type: 'item',
          url: '/page/report/summary',
        },
      ],
    },
  ],
};

export default pages;
