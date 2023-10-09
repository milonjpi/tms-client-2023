// assets
import {
  IconTruckDelivery,
  IconGasStation,
  IconTool,
  IconCashOff,
  IconFileCertificate,
  IconReport,
} from '@tabler/icons-react';

// constant
const icons = {
  IconTruckDelivery,
  IconGasStation,
  IconTool,
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
      id: 'trip',
      title: 'The Trip',
      type: 'item',
      color: '#747ba0',
      icon: icons.IconTruckDelivery,
      url: '/page/trip',
    },
    {
      id: 'fuel',
      title: 'Fuel',
      type: 'item',
      color: '#068DA9',
      icon: icons.IconGasStation,
      url: '/page/fuel',
    },
    {
      id: 'expense',
      title: 'Expenses',
      type: 'collapse',
      color: '#ff2825',
      icon: icons.IconCashOff,
      children: [
        {
          id: 'trip-expense',
          title: 'Trip Expenses',
          type: 'item',
          url: '/pages/expense/trip-expense',
        },
        {
          id: 'fixed-expense',
          title: 'Fixed Expenses',
          type: 'item',
          url: '/pages/expense/fixed-expense',
        },
      ],
    },
    {
      id: 'maintenance',
      title: 'Maintenance',
      type: 'collapse',
      color: '#7f5345',
      icon: icons.IconTool,
      children: [
        {
          id: 'schedule',
          title: 'Schedule',
          type: 'item',
          url: '/page/maintenance/schedule',
        },
        {
          id: 'unschedule',
          title: 'Unschedule',
          type: 'item',
          url: '/page/maintenance/unschedule',
        },
        {
          id: 'accidental',
          title: 'Accidental',
          type: 'item',
          url: '/page/maintenance/accidental',
        },
      ],
    },

    {
      id: 'paper',
      title: 'Paper Work',
      type: 'collapse',
      color: '#6f32be',
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
      color: '#0066ff',
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
