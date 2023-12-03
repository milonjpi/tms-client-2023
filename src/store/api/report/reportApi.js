import { api } from '../apiSlice';

const REPORT_URL = '/report';

export const reportApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSummary: build.query({
      query: (params) => ({
        url: `${REPORT_URL}/summary`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          summaries: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['maintenance', 'trip', 'vehicle', 'expense'],
    }),
    getFuelStatus: build.query({
      query: (params) => ({
        url: `${REPORT_URL}/fuel-status`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          fuelStatus: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['maintenance', 'trip', 'vehicle', 'expense', 'fuel'],
    }),
    getStockStatus: build.query({
      query: (params) => ({
        url: `${REPORT_URL}/stock-status`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          stockStatus: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: [
        'maintenance',
        'trip',
        'vehicle',
        'equipment-title',
        'equipment',
      ],
    }),
  }),
});

export const {
  useGetSummaryQuery,
  useGetFuelStatusQuery,
  useGetStockStatusQuery,
} = reportApi;
