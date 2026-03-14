/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQLURI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
