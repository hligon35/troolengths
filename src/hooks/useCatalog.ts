import { useEffect, useState } from 'react';
import type { Product } from '@/types';
import { loadCatalog } from '@/data/catalog';

export function useCatalog() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    loadCatalog()
      .then((items) => {
        if (!mounted) return;
        setProducts(items);
        setLoading(false);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e?.message || 'Failed to load products');
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return { products, loading, error } as const;
}
