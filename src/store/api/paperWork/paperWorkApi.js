import { api } from '../../api/apiSlice';

const PAPER_WORK_URL = '/paper-work';

const paperWorkApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all documents
    getPaperWorks: build.query({
      query: (params) => ({
        url: PAPER_WORK_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          paperWorks: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['paper-work'],
    }),

    // add document
    addPaperWork: build.mutation({
      query: (data) => ({
        url: `${PAPER_WORK_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['paper-work'],
    }),

    // update documents
    updatePaperWork: build.mutation({
      query: (data) => ({
        url: `${PAPER_WORK_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['paper-work'],
    }),

    // delete document
    deletePaperWork: build.mutation({
      query: (id) => ({
        url: `${PAPER_WORK_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['paper-work'],
    }),
  }),
});

export const {
  useGetPaperWorksQuery,
  useAddPaperWorkMutation,
  useUpdatePaperWorkMutation,
  useDeletePaperWorkMutation,
} = paperWorkApi;
