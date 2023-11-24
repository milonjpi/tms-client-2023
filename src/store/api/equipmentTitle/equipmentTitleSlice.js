import { api } from '../apiSlice';

const EQUIPMENT_TITLE_URL = '/equipment-title';

const equipmentTitleApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all equipment titles
    getEquipmentTitles: build.query({
      query: (params) => ({
        url: EQUIPMENT_TITLE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          equipmentTitles: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['equipment-title'],
    }),

    // add equipment title
    addEquipmentTitle: build.mutation({
      query: (data) => ({
        url: `${EQUIPMENT_TITLE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['equipment-title'],
    }),

    // update equipment Title
    updateEquipmentTitle: build.mutation({
      query: (data) => ({
        url: `${EQUIPMENT_TITLE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['equipment-title'],
    }),
  }),
});

export const {
  useGetEquipmentTitlesQuery,
  useAddEquipmentTitleMutation,
  useUpdateEquipmentTitleMutation,
} = equipmentTitleApi;
