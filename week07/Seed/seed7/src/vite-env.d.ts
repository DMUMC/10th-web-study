/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: "http://localhost:8000";
    readonly VITE_APP_URL: "http://localhost:8000";
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}