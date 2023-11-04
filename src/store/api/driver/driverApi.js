import { api } from '../../api/apiSlice';

const DRIVER_URL = '/driver';

const driverApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all drivers
    drivers: build.query({
      query: (params) => ({
        url: DRIVER_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          drivers: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['driver'],
    }),

    // get single driver
    driver: build.query({
      query: (id) => ({
        url: `${DRIVER_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['driver'],
    }),

    // add driver
    addDriver: build.mutation({
      query: (data) => ({
        url: `${DRIVER_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['driver'],
    }),

    // update driver
    updateDriver: build.mutation({
      query: (data) => ({
        url: `${DRIVER_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['driver'],
    }),

    // inactive driver
    inactiveDriver: build.mutation({
      query: (id) => ({
        url: `${DRIVER_URL}/${id}/inactive`,
        method: 'PATCH',
      }),
      invalidatesTags: ['driver'],
    }),
  }),
});

export const {
  useDriversQuery,
  useDriverQuery,
  useAddDriverMutation,
  useUpdateDriverMutation,
  useInactiveDriverMutation,
} = driverApi;
