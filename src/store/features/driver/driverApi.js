import { api } from '../../api/apiSlice';

const DRIVER_URL = '/driver';

const driverApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all drivers
    drivers: build.query({
      query: (token) => ({
        url: DRIVER_URL,
        headers: { authorization: token },
        method: 'GET',
      }),
      providesTags: ['driver'],
    }),

    // get single driver
    driver: build.query({
      query: (params) => ({
        url: `${DRIVER_URL}/${params?.id}`,
        headers: { authorization: params?.token },
        method: 'GET',
      }),
      providesTags: ['driver'],
    }),

    // add driver
    addDriver: build.mutation({
      query: (params) => ({
        url: `${DRIVER_URL}/create`,
        headers: { authorization: params?.token },
        method: 'POST',
        body: params?.data,
      }),
      invalidatesTags: ['driver'],
    }),

    // update driver
    updateDriver: build.mutation({
      query: (params) => ({
        url: `${DRIVER_URL}/${params?.id}`,
        headers: { authorization: params?.token },
        method: 'PATCH',
        body: params?.data,
      }),
      invalidatesTags: ['driver'],
    }),

    // inactive driver
    inactiveDriver: build.mutation({
      query: (params) => ({
        url: `${DRIVER_URL}/${params?.id}/inactive`,
        headers: { authorization: params?.token },
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
