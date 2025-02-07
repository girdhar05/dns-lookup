/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly SERVER_IP : string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}