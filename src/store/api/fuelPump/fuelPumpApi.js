import { api } from '../../api/apiSlice';

const FUEL_PUMP_URL = '/fuel-pump';

const fuelPumpApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all fuel pumps
    fuelPumps: build.query({
      query: (params) => ({
        url: FUEL_PUMP_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          fuelPumps: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['fuelPump'],
    }),

    // get single pump
    getSinglePump: build.query({
      query: (id) => ({
        url: `${FUEL_PUMP_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['fuelPump'],
    }),

    // add fuel pump
    addFuelPump: build.mutation({
      query: (data) => ({
        url: `${FUEL_PUMP_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['fuelPump'],
    }),

    // update fuel pump
    updateFuelPump: build.mutation({
      query: (data) => ({
        url: `${FUEL_PUMP_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['fuelPump'],
    }),
  }),
});

export const {
  useFuelPumpsQuery,
  useGetSinglePumpQuery,
  useAddFuelPumpMutation,
  useUpdateFuelPumpMutation,
} = fuelPumpApi;
