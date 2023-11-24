import { api } from '../../api/apiSlice';

const MAINTENANCE_URL = '/maintenance';

const maintenanceApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all maintenances
    getMaintenances: build.query({
      query: (params) => ({
        url: MAINTENANCE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          maintenances: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['maintenance'],
    }),
    // get single maintenance
    getSingleMaintenance: build.query({
      query: (id) => ({
        url: `${MAINTENANCE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['maintenance'],
    }),

    // add maintenance
    addMaintenance: build.mutation({
      query: (data) => ({
        url: `${MAINTENANCE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['maintenance'],
    }),

    // update maintenance
    updateMaintenance: build.mutation({
      query: (data) => ({
        url: `${MAINTENANCE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['maintenance'],
    }),

    // delete maintenance
    deleteMaintenance: build.mutation({
      query: (id) => ({
        url: `${MAINTENANCE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['maintenance'],
    }),
  }),
});

export const {
  useGetMaintenancesQuery,
  useGetSingleMaintenanceQuery,
  useAddMaintenanceMutation,
  useUpdateMaintenanceMutation,
  useDeleteMaintenanceMutation,
} = maintenanceApi;
