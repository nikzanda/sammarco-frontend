/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQLURI: string;
  readonly VITE_SOCIAL_YEAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
