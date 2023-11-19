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
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconTruckDelivery,
      children: [
        {
          id: 'all-trips',
          title: 'All Trips',
          type: 'item',
          url: '/pages/trip/all-trips',
        },
        {
          id: 'trip-expense',
          title: 'Trip Expenses',
          type: 'item',
          url: '/pages/trip/trip-expense',
        },
      ],
    },
    {
      id: 'fuel',
      title: 'Fuel',
      type: 'item',
      color: '#2F0F5D',
      icon: icons.IconGasStation,
      url: '/pages/fuel',
    },
    {
      id: 'expense',
      title: 'Expenses',
      type: 'item',
      color: '#2F0F5D',
      icon: icons.IconCashOff,
      url: '/pages/expense',
    },
    {
      id: 'maintenance',
      title: 'Maintenance',
      type: 'collapse',
      color: '#2F0F5D',
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
