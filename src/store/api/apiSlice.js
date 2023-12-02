import { createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'api/client';
import { axiosBaseQuery } from 'helper/axios/axiosBaseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: [
    'auth',
    'brand',
    'model',
    'driver',
    'equipment',
    'equipment-title',
    'expense-head',
    'fuel',
    'fuelType',
    'fuelPump',
    'account-head',
    'income-head',
    'maintenance',
    'party',
    'trip',
    'uom',
    'user',
    'vehicle',
    'accident-history',
    'expense',
    'paper-work',
  ],
  endpoints: () => ({}),
});
