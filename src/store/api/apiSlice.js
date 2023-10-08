import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.0.244:5000/api/v1',
  }),
  tagTypes: [
    'brand',
    'department',
    'designation',
    'model',
    'engineCC',
    'authLog',
    'guard',
  ],
  endpoints: () => ({}),
});
