import { api } from '../../api/apiSlice';

const PARTY_URL = '/party';

const partyApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all parties
    parties: build.query({
      query: (token) => ({
        url: PARTY_URL,
        headers: { authorization: token },
        method: 'GET',
      }),
      providesTags: ['party'],
    }),

    // get single party
    party: build.query({
      query: (params) => ({
        url: `${PARTY_URL}/${params?.id}`,
        headers: { authorization: params?.token },
        method: 'GET',
      }),
      providesTags: ['party'],
    }),

    // add party
    addParty: build.mutation({
      query: (params) => ({
        url: `${PARTY_URL}/create`,
        headers: { authorization: params?.token },
        method: 'POST',
        body: params?.data,
      }),
      invalidatesTags: ['party'],
    }),

    // update party
    updateParty: build.mutation({
      query: (params) => ({
        url: `${PARTY_URL}/${params?.id}`,
        headers: { authorization: params?.token },
        method: 'PATCH',
        body: params?.data,
      }),
      invalidatesTags: ['party'],
    }),

    // inactive party
    inactiveParty: build.mutation({
      query: (params) => ({
        url: `${PARTY_URL}/${params?.id}/inactive`,
        headers: { authorization: params?.token },
        method: 'PATCH',
      }),
      invalidatesTags: ['party'],
    }),
  }),
});

export const {
  usePartiesQuery,
  usePartyQuery,
  useAddPartyMutation,
  useUpdatePartyMutation,
  useInactivePartyMutation,
} = partyApi;
