import { api } from '../../api/apiSlice';

const UOM_URL = '/uom';

const uomApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all uom
    uom: build.query({
      query: () => ({
        url: UOM_URL,
        method: 'GET',
      }),
      providesTags: ['uom'],
    }),

    // add uom
    addUom: build.mutation({
      query: (data) => ({
        url: `${UOM_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['uom'],
    }),

    // update uom
    updateUom: build.mutation({
      query: (data) => ({
        url: `${UOM_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['uom'],
    }),
  }),
});

export const { useUomQuery, useAddUomMutation, useUpdateUomMutation } = uomApi;
