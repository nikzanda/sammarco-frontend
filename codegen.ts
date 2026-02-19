import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  documents: 'src/**/*.graphql.ts',
  config: {
    sort: false,
    namingConvention: {
      enumValues: 'upper-case#upperCase',
    },
    scalars: {
      YearMonth: 'string',
    },
  },
  generates: {
    'src/gql/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      plugins: [],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
