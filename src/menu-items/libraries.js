// assets
import {
  IconUsers,
  IconTruck,
  IconUser,
  IconSteeringWheel,
  IconCoinOff,
} from '@tabler/icons-react';

// constant
const icons = {
  IconUsers,
  IconTruck,
  IconUser,
  IconSteeringWheel,
  IconCoinOff,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const libraries = {
  id: 'libraries',
  title: 'Libraries',
  type: 'group',
  children: [
    {
      id: 'client',
      title: 'The Client',
      type: 'item',
      color: '#461959',
      icon: icons.IconUsers,
      url: '/libraries/client',
    },
    {
      id: 'vehicle',
      title: 'Vehicle Info',
      type: 'item',
      color: '#557A46',
      icon: icons.IconTruck,
      url: '/libraries/vehicle',
    },
    {
      id: 'driver',
      title: 'Driver Info',
      type: 'item',
      color: '#1D5D9B',
      icon: icons.IconUser,
      url: '/libraries/driver',
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
  ],
};

export default libraries;
