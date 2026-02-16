/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQLURI: string;
  readonly VITE_SOCIAL_YEAR: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
