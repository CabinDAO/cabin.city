import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  generates: {
    './generated/gql/hats/': {
      documents: 'lib/hats/**/*.graphql',
      schema:
        'https://api.thegraph.com/subgraphs/name/hats-protocol/hats-v1-optimism',
      plugins: [],
      preset: 'gql-tag-operations-preset',
    },
  },
  config: { namingConvention: 'keep' },
}
export default config
