import { otterspaceConfig } from '@/lib/protocol-config'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const httpLink = new HttpLink({
  uri: otterspaceConfig.subgraphUrl,
})

export const otterspaceClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})
