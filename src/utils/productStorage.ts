import { SoapProduct } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';

const STORAGE_KEY = 'atelie_botanico_cms_products_v1';

export const BOTANICAL_PHOTO_PRESETS = [
  {
    label: 'Lavanda & Karité Rústico',
    url: 'https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Argila Rosa & Pétalas',
    url: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Carvão Ativado & Eucalipto',
    url: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Capim-Limão & Ervas',
    url: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Café Robusta & Canela',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Camomila & Mel Silvestre',
    url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Romã & Argila Vermelha',
    url: 'https://images.unsplash.com/photo-1508759073847-9ca702cec7d2?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Alecrim & Azeite Nobre',
    url: 'https://images.unsplash.com/photo-1608248597359-0091ff6f8905?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Eucalipto & Menta Verde',
    url: 'https://images.unsplash.com/photo-1512290900672-1f55b6a0ad8b?auto=format&fit=crop&w=800&q=80'
  }
];

export function getStoredProducts(): SoapProduct[] {
  if (typeof window === 'undefined') {
    return INITIAL_PRODUCTS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_PRODUCTS;
  } catch (err) {
    console.error('Erro ao ler produtos do localStorage:', err);
    return INITIAL_PRODUCTS;
  }
}

export function saveStoredProducts(products: SoapProduct[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Erro ao salvar produtos no localStorage:', err);
  }
}

export function resetStoredProducts(): SoapProduct[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  } catch (err) {
    console.error('Erro ao resetar produtos no localStorage:', err);
  }
  return INITIAL_PRODUCTS;
}

export function generateProductId(): string {
  return `soap-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}
