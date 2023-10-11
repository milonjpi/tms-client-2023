// assets
import {
  IconUsers,
  IconTruck,
  IconUser,
  IconSteeringWheel,
  IconCoinOff,
  IconBadgeTm,
  IconBrandVolkswagen,
} from '@tabler/icons-react';

// constant
const icons = {
  IconUsers,
  IconTruck,
  IconUser,
  IconSteeringWheel,
  IconCoinOff,
  IconBadgeTm,
  IconBrandVolkswagen,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const libraries = {
  id: 'libraries',
  title: 'Libraries',
  type: 'group',
  children: [
    {
      id: 'party',
      title: 'The Party',
      type: 'collapse',
      color: '#461959',
      icon: icons.IconUsers,
      children: [
        {
          id: 'active-party',
          title: 'Active Party',
          type: 'item',
          url: '/libraries/party/active-party',
        },
        {
          id: 'inactive-party',
          title: 'Inactive Party',
          type: 'item',
          url: '/libraries/party/inactive-party',
        },
      ],
    },
    {
      id: 'vehicle',
      title: 'Vehicle Info',
      type: 'collapse',
      color: '#557A46',
      icon: icons.IconTruck,
      children: [
        {
          id: 'active-vehicle',
          title: 'Active Vehicle',
          type: 'item',
          url: '/libraries/vehicle/active-vehicle',
        },
        {
          id: 'inactive-vehicle',
          title: 'Inactive Vehicle',
          type: 'item',
          url: '/libraries/vehicle/inactive-vehicle',
        },
      ],
    },
    {
      id: 'driver',
      title: 'Driver Info',
      type: 'collapse',
      color: '#1D5D9B',
      icon: icons.IconUser,
      children: [
        {
          id: 'active-driver',
          title: 'Active Driver',
          type: 'item',
          url: '/libraries/driver/active-driver',
        },
        {
          id: 'inactive-driver',
          title: 'Inactive Driver',
          type: 'item',
          url: '/libraries/driver/inactive-driver',
        },
      ],
    },
    {
      id: 'accessories',
      title: 'Accessories List',
      type: 'item',
      color: '#176B87',
      icon: icons.IconSteeringWheel,
      url: '/libraries/accessories',
    },
    {
      id: 'expense-head',
      title: 'Expense Head',
      type: 'item',
      color: '#B31312',
      icon: icons.IconCoinOff,
      url: '/libraries/expense-head',
    },
    {
      id: 'vehicle-brand',
      title: 'Vehicle Brand',
      type: 'item',
      color: '#004225',
      icon: icons.IconBadgeTm,
      url: '/libraries/vehicle-brand',
    },
    {
      id: 'vehicle-model',
      title: 'Vehicle Model',
      type: 'item',
      color: '#F39F5A',
      icon: icons.IconBrandVolkswagen,
      url: '/libraries/vehicle-model',
    },
  ],
};

export default libraries;
