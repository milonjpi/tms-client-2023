import { api } from '../../api/apiSlice';

const MODEL_URL = '/model';

const modelApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all models
    models: build.query({
      query: () => ({
        url: MODEL_URL,
        method: 'GET',
      }),
      providesTags: ['model'],
    }),

    // get single model
    model: build.query({
      query: (id) => ({
        url: `${MODEL_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['model'],
    }),

    // add model
    addModel: build.mutation({
      query: (data) => ({
        url: `${MODEL_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['model'],
    }),

    // update model
    updateModel: build.mutation({
      query: (data) => ({
        url: `${MODEL_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['model'],
    }),

    // update model
    deleteModel: build.mutation({
      query: (id) => ({
        url: `${MODEL_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['model'],
    }),
  }),
});

export const {
  useModelsQuery,
  useModelQuery,
  useAddModelMutation,
  useUpdateModelMutation,
  useDeleteModelMutation,
} = modelApi;
