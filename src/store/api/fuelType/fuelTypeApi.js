import { api } from '../../api/apiSlice';

const FUEL_TYPE_URL = '/fuel-type';

const fuelTypeApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all fuel type
    fuelType: build.query({
      query: () => ({
        url: FUEL_TYPE_URL,
        method: 'GET',
      }),
      providesTags: ['fuelType'],
    }),

    // add fuel type
    addFuelType: build.mutation({
      query: (data) => ({
        url: `${FUEL_TYPE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['fuelType'],
    }),

    // update fuel type
    updateFuelType: build.mutation({
      query: (data) => ({
        url: `${FUEL_TYPE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['fuelType'],
    }),
  }),
});

export const {
  useFuelTypeQuery,
  useAddFuelTypeMutation,
  useUpdateFuelTypeMutation,
} = fuelTypeApi;
