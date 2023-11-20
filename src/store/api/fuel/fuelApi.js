import { api } from '../../api/apiSlice';

const FUEL_URL = '/fuel';

const fuelApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all fuels
    getFuels: build.query({
      query: (params) => ({
        url: FUEL_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          fuels: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['fuel'],
    }),
    // get single fuel
    getSingleFuel: build.query({
      query: (id) => ({
        url: `${FUEL_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['fuel'],
    }),

    // add fuel
    addFuel: build.mutation({
      query: (data) => ({
        url: `${FUEL_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['fuel'],
    }),

    // update fuel
    updateFuel: build.mutation({
      query: (data) => ({
        url: `${FUEL_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['fuel'],
    }),

    // delete fuel
    deleteFuel: build.mutation({
      query: (id) => ({
        url: `${FUEL_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['fuel'],
    }),
  }),
});

export const {
  useGetFuelsQuery,
  useGetSingleFuelQuery,
  useAddFuelMutation,
  useUpdateFuelMutation,
  useDeleteFuelMutation,
} = fuelApi;
