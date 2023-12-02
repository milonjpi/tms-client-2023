import { api } from '../../api/apiSlice';

const ACCIDENT_HISTORY_URL = '/accident-history';

const accidentHistoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all accident histories
    getHistories: build.query({
      query: (params) => ({
        url: ACCIDENT_HISTORY_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          accidentHistories: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['accident-history'],
    }),

    // add accident history
    addAccidentHistory: build.mutation({
      query: (data) => ({
        url: `${ACCIDENT_HISTORY_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['accident-history'],
    }),

    // update Accident history
    updateAccidentHistory: build.mutation({
      query: (data) => ({
        url: `${ACCIDENT_HISTORY_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['accident-history'],
    }),

    // delete accident history
    deleteAccidentHistory: build.mutation({
      query: (id) => ({
        url: `${ACCIDENT_HISTORY_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['accident-history'],
    }),
  }),
});

export const {
  useGetHistoriesQuery,
  useAddAccidentHistoryMutation,
  useUpdateAccidentHistoryMutation,
  useDeleteAccidentHistoryMutation,
} = accidentHistoryApi;
