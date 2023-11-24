import { api } from '../../api/apiSlice';

const EQUIPMENT_URL = '/equipment';

const equipmentApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all equipments
    getEquipments: build.query({
      query: (params) => ({
        url: EQUIPMENT_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          equipments: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['equipment'],
    }),

    // add equipment
    addEquipment: build.mutation({
      query: (data) => ({
        url: `${EQUIPMENT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['equipment'],
    }),

    // update equipment
    updateEquipment: build.mutation({
      query: (data) => ({
        url: `${EQUIPMENT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['equipment'],
    }),

    // delete equipment
    deleteEquipment: build.mutation({
      query: (id) => ({
        url: `${EQUIPMENT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['equipment'],
    }),
  }),
});

export const {
  useGetEquipmentsQuery,
  useAddEquipmentMutation,
  useUpdateEquipmentMutation,
  useDeleteEquipmentMutation,
} = equipmentApi;
