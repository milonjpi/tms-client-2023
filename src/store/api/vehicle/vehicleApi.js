import { api } from '../../api/apiSlice';

const VEHICLE_URL = '/vehicle';

const vehicleApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all vehicles
    vehicles: build.query({
      query: (params) => ({
        url: VEHICLE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          vehicles: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['vehicle'],
    }),

    // get single vehicle
    vehicle: build.query({
      query: (id) => ({
        url: `${VEHICLE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['vehicle'],
    }),

    // add vehicle
    addVehicle: build.mutation({
      query: (data) => ({
        url: `${VEHICLE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['vehicle'],
    }),

    // update vehicle
    updateVehicle: build.mutation({
      query: (data) => ({
        url: `${VEHICLE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['vehicle'],
    }),

    // update vehicle
    inactiveVehicle: build.mutation({
      query: (id) => ({
        url: `${VEHICLE_URL}/${id}/inactive`,
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
