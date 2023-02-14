import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { hatsConfig } from '../protocol-config'

const httpLink = new HttpLink({
  uri: hatsConfig.subgraphUrl,
})

export const hatsClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})
