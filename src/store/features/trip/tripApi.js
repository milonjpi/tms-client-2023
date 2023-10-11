import { api } from '../../api/apiSlice';

const TRIP_URL = '/trip';

const tripApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all trips
    trips: build.query({
      query: (params) => ({
        url: TRIP_URL,
        headers: { authorization: params?.token },
        method: 'GET',
        params: params?.arg,
      }),
      providesTags: ['trip'],
    }),

    // get single trip
    trip: build.query({
      query: (params) => ({
        url: `${TRIP_URL}/${params?.id}`,
        headers: { authorization: params?.token },
        method: 'GET',
      }),
      providesTags: ['trip'],
    }),

    // add trip
    addTrip: build.mutation({
      query: (params) => ({
        url: `${TRIP_URL}/create`,
        headers: { authorization: params?.token },
        method: 'POST',
        body: params?.data,
      }),
      invalidatesTags: ['trip'],
    }),

    // update trip
    updateTrip: build.mutation({
      query: (params) => ({
        url: `${TRIP_URL}/${params?.id}`,
        headers: { authorization: params?.token },
        method: 'PATCH',
        body: params?.data,
      }),
      invalidatesTags: ['trip'],
    }),

    // update trip
    deleteTrip: build.mutation({
      query: (params) => ({
        url: `${TRIP_URL}/${params?.id}`,
        headers: { authorization: params?.token },
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
