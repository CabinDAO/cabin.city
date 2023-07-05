import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getFaunaSecret } from '../auth/getFaunaSecret'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_FAUNA_GRAPHQL_BASE_URL,
})

const authLink = setContext(async (_, { headers }) => {
  const secret =
    (await getFaunaSecret()) ?? process.env.NEXT_PUBLIC_FAUNA_CLIENT_KEY

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${secret}`,
    },
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allActivities: {
            keyArgs: false,
            merge(existing, incoming) {
              if (existing?.after === incoming?.after) {
                return existing
              }
              return {
                ...incoming,
                data: [...(existing?.data ?? []), ...incoming.data],
              }
            },
          },
          getProfiles: {
            keyArgs: ['input'],
            merge(existing, incoming) {
              return {
                ...incoming,
                data: [...(existing?.data ?? []), ...incoming.data],
              }
            },
          },
          locationsByLocationType: {
            keyArgs: ['locationType', '_size'],
            merge(existing, incoming) {
              if (existing?.after === incoming?.after) {
                return incoming
              }
              return {
                ...incoming,
                data: [...(existing?.data ?? []), ...incoming.data],
              }
            },
          },
          locationsSortedByVoteCount: {
            keyArgs: ['_size'],
            merge(existing, incoming) {
              if (existing?.after === incoming?.after) {
                return incoming
              }
              return {
                ...incoming,
                data: [...(existing?.data ?? []), ...incoming.data],
              }
            },
          },
          getOffers: {
            keyArgs: ['input'],
            merge(existing, incoming) {
              return {
                ...incoming,
                data: [...(existing?.data ?? []), ...incoming.data],
              }
            },
          },
        },
      },
    },
  }),
})
