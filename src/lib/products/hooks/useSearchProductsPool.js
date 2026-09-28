'use client'
import { useQuery } from '@tanstack/react-query'
import { productApi } from '@/lib/products/api/useProducts'

const normalizeListResponse = (data) => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.results)) return data.results
  return []
}

// Без фильтров — общий "пул" товаров для поиска.
// Header и CatalogPage (без category/brand) должны использовать ИМЕННО этот ключ,
// чтобы кэш переиспользовался между ними.
export const SEARCH_POOL_BASE_KEY = ['products', 'search-all-pages']

export function useSearchProductsPool({ category = '', brand = '', enabled = true } = {}) {
  const hasFilters = Boolean(category || brand)

  return useQuery({
    queryKey: hasFilters
      ? [...SEARCH_POOL_BASE_KEY, { category, brand }]
      : SEARCH_POOL_BASE_KEY,
    queryFn: () => productApi.getAllPages(hasFilters ? { category, brand } : {}),
    enabled,
    select: normalizeListResponse,
    retry: false,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  })
}