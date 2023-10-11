import { api } from '../../api/apiSlice';

const VEHICLE_URL = '/vehicle';

const vehicleApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all vehicles
    vehicles: build.query({
      query: (token) => ({
        url: VEHICLE_URL,
        headers: { authorization: token },
        method: 'GET',
      }),
      providesTags: ['vehicle'],
    }),

    // get single vehicle
    vehicle: build.query({
      query: (params) => ({
        url: `${VEHICLE_URL}/${params?.id}`,
        headers: { authorization: params?.token },
        method: 'GET',
      }),
      providesTags: ['vehicle'],
    }),

    // add vehicle
    addVehicle: build.mutation({
      query: (params) => ({
        url: `${VEHICLE_URL}/create`,
        headers: { authorization: params?.token },
        method: 'POST',
        body: params?.data,
      }),
      invalidatesTags: ['vehicle'],
    }),

    // update vehicle
    updateVehicle: build.mutation({
      query: (params) => ({
        url: `${VEHICLE_URL}/${params?.id}`,
        headers: { authorization: params?.token },
        method: 'PATCH',
        body: params?.data,
      }),
      invalidatesTags: ['vehicle'],
    }),

    // update vehicle
    inactiveVehicle: build.mutation({
      query: (params) => ({
        url: `${VEHICLE_URL}/${params?.id}/inactive`,
        headers: { authorization: params?.token },
        method: 'PATCH',
      }),
      invalidatesTags: ['vehicle'],
    }),
  }),
});

export const {
  useVehiclesQuery,
  useVehicleQuery,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  useInactiveVehicleMutation,
} = vehicleApi;
