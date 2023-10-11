import { api } from '../../api/apiSlice';

const MODEL_URL = '/model';

const modelApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all models
    models: build.query({
      query: (token) => ({
        url: MODEL_URL,
        headers: { authorization: token },
        method: 'GET',
      }),
      providesTags: ['model'],
    }),

    // get single model
    model: build.query({
      query: (params) => ({
        url: `${MODEL_URL}/${params?.id}`,
        headers: { authorization: params?.token },
        method: 'GET',
      }),
      providesTags: ['model'],
    }),

    // add model
    addModel: build.mutation({
      query: (params) => ({
        url: `${MODEL_URL}/create`,
        headers: { authorization: params?.token },
        method: 'POST',
        body: params?.data,
      }),
      invalidatesTags: ['model'],
    }),

    // update model
    updateModel: build.mutation({
      query: (params) => ({
        url: `${MODEL_URL}/${params?.id}`,
        headers: { authorization: params?.token },
        method: 'PATCH',
        body: params?.data,
      }),
      invalidatesTags: ['model'],
    }),

    // update model
    deleteModel: build.mutation({
      query: (params) => ({
        url: `${MODEL_URL}/${params?.id}`,
        headers: { authorization: params?.token },
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
