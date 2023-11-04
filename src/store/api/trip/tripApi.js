import { api } from '../../api/apiSlice';

const TRIP_URL = '/trip';

const tripApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all trips
    trips: build.query({
      query: (params) => ({
        url: TRIP_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          trips: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['trip'],
    }),

    // get single trip
    trip: build.query({
      query: (id) => ({
        url: `${TRIP_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['trip'],
    }),

    // add trip
    addTrip: build.mutation({
      query: (data) => ({
        url: `${TRIP_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['trip'],
    }),

    // update trip
    updateTrip: build.mutation({
      query: (data) => ({
        url: `${TRIP_URL}/${data?.id}`,
        method: 'PATCH',
        data: data.body,
      }),
      invalidatesTags: ['trip'],
    }),

    // update trip
    deleteTrip: build.mutation({
      query: (id) => ({
        url: `${TRIP_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['trip'],
    }),
  }),
});

export const {
  useTripsQuery,
  useTripQuery,
  useAddTripMutation,
  useUpdateTripMutation,
  useDeleteTripMutation,
} = tripApi;
