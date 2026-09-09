const AUTH_KEY = 'atelie_botanico_admin_auth_v1';

export interface AdminUser {
  username: string;
  name: string;
  role: 'Administrador Geral' | 'Curador Botânico';
  loginTime: string;
}

export const DEMO_ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'atelie123'
};

export function getAdminSession(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function saveAdminSession(user: AdminUser): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Falha ao salvar sessão de admin:', e);
  }
}

export function clearAdminSession(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (e) {
    console.error('Falha ao remover sessão de admin:', e);
  }
}
