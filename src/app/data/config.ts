const rawBase = import.meta.env.VITE_API_URL || '';
// Remove trailing slash and accidental double /api
export const API_BASE = rawBase.replace(/\/$/, '').replace(/\/api$/, '');
