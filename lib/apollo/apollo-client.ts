import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getFaunaSecret } from '../auth/getFaunaSecret'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_FAUNA_GRAPHQL_BASE_URL,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[GQL network error]: ${networkError}`)
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

const links =
  process.env.NODE_ENV === 'production'
    ? [authLink, httpLink]
    : [authLink, errorLink, httpLink]

export const apolloClient = new ApolloClient({
  link: from(links),
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
          locationsByOfferType: {
            keyArgs: ['offerType', '_size'],
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
