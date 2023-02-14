import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  generates: {
    './generated/gql/hats/': {
      documents: 'lib/hats/**/*.graphql',
      schema:
        'https://api.thegraph.com/subgraphs/name/hats-protocol/hats-protocol-polygon-beta6',
      plugins: [],
      preset: 'client',
    },
    './generated/gql/otterspace/': {
      documents: 'lib/otterspace/**/*.graphql',
      schema:
        'https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-optimism',
      plugins: [],
      preset: 'client',
    },
  },
}
export default config
