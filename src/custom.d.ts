// src/custom.d.ts

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // Adicione aqui outras variáveis de ambiente que você usa
  readonly VITE_API_URL: string
  readonly VITE_FEATURE_TOGGLE: string
  // ...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}