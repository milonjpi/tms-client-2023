// assets
import {
  IconUsers,
  IconTruck,
  IconUser,
  IconSteeringWheel,
  IconCoinOff,
  IconBadgeTm,
  IconBrandVolkswagen,
  IconRulerMeasure,
  IconDropletHalf2Filled,
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
  IconRulerMeasure,
  IconDropletHalf2Filled,
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
      color: '#2F0F5D',
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
      color: '#2F0F5D',
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
      color: '#2F0F5D',
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
      color: '#2F0F5D',
      icon: icons.IconSteeringWheel,
      url: '/libraries/accessories',
    },
    {
      id: 'expense-head',
      title: 'Expense Head',
      type: 'item',
      color: '#2F0F5D',
      icon: icons.IconCoinOff,
      url: '/libraries/expense-head',
    },
    {
      id: 'vehicle-brand',
      title: 'Vehicle Brand',
      type: 'item',
      color: '#2F0F5D',
      icon: icons.IconBadgeTm,
      url: '/libraries/vehicle-brand',
    },
    {
      id: 'vehicle-model',
      title: 'Vehicle Model',
      type: 'item',
      color: '#2F0F5D',
      icon: icons.IconBrandVolkswagen,
      url: '/libraries/vehicle-model',
    },
    {
      id: 'uom',
      title: 'Unit of Measurement',
      type: 'item',
      color: '#2F0F5D',
      icon: icons.IconRulerMeasure,
      url: '/libraries/uom',
    },
    {
      id: 'fuel-type',
      title: 'Fuel Type',
      type: 'item',
      color: '#2F0F5D',
      icon: icons.IconDropletHalf2Filled,
      url: '/libraries/fuel-type',
    },
  ],
};

export default libraries;
