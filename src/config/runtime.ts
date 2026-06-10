function normalizeBasePath(value: string) {
  if (!value) return '/';
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

export const ALEPH_API_BASE = import.meta.env.VITE_ALEPH_API_BASE ?? 'http://localhost:3005';
export const AULA_API_BASE = import.meta.env.VITE_AULA_API_BASE ?? 'http://localhost:3005/api/aula';
export const AULA_SERVER_BASE = import.meta.env.VITE_AULA_SERVER_BASE
  ?? stripTrailingSlash(AULA_API_BASE).replace(/\/api\/aula$/i, '');
export const AULA_PUBLIC_URL = import.meta.env.VITE_AULA_PUBLIC_URL ?? '/aula-virtual/';
export const AULA_BASE_PATH = import.meta.env.VITE_AULA_BASE_PATH
  ? normalizeBasePath(import.meta.env.VITE_AULA_BASE_PATH)
  : null;
