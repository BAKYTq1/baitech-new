import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { productApi } from '../api/useProducts';
export const useProducts = ({ page = 1, search = "", category = "" , brand = ""} = {}) => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ['products', { page, search, category, brand }],
   queryFn: () => {
  const params = { page };
  if (search) params.article = search; // ← было params.search
  if (category) params.category = category;
   if (brand) params.brand = brand; 
  return productApi.getAll(params);
},
    keepPreviousData: true,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => productApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => productApi.patch(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Update product error:', error);
    },
  });

  const changeAvailabilityMutation = useMutation({
    mutationFn: ({ id, is_available }) => productApi.changeAvailability(id, is_available),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const addProductMutation = useMutation({
    mutationFn: (newProduct) => productApi.create(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const addCategoryMutation = useMutation({
    mutationFn: (newCat) => productApi.createCategory(newCat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const addBrandMutation = useMutation({
    mutationFn: (newBrand) => productApi.createBrand(newBrand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id) => productApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const deleteBrandMutation = useMutation({
    mutationFn: (id) => productApi.deleteBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: productApi.getCategories,
  });

  const brandsQuery = useQuery({
    queryKey: ['brands'],
    queryFn: productApi.getBrands,
  });
 
  return {
    products: productsQuery.data?.results || [],
    totalCount: productsQuery.data?.count ?? 0,
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    deleteProduct: deleteMutation.mutate,
    updateProduct: updateMutation.mutateAsync,
    isPending: updateMutation.isPending,
    changeAvailability: changeAvailabilityMutation.mutate,
    addProduct: addProductMutation.mutateAsync,
    categories: categoriesQuery.data?.results || (Array.isArray(categoriesQuery.data) ? categoriesQuery.data : []),
    brands: brandsQuery.data?.results || (Array.isArray(brandsQuery.data) ? brandsQuery.data : []),
    isInitialLoading: categoriesQuery.isLoading || brandsQuery.isLoading,
    addCategory: addCategoryMutation.mutateAsync,
    addBrand: addBrandMutation.mutateAsync,
    deleteCategory: deleteCategoryMutation.mutateAsync,
    deleteBrand: deleteBrandMutation.mutateAsync,
  };
};
export const useSimilarProducts = (productId) => {
    return useQuery({
        queryKey: ['similar-products', productId],
        queryFn: () => productApi.getSimilar(productId),
        enabled: !!productId,
    });
};

export const useInfiniteProducts = ({ search = "", category = "", brand = "", page } = {}) => {
  return useInfiniteQuery({
    queryKey: ['products-infinite', { search, category, brand, page }],
    queryFn: ({ pageParam = page || 1 }) => {
      const params = { page: pageParam };
      if (search) params.search = search;
      if (category) params.category = category;
      if (brand) params.brand = brand;
      return productApi.getAll(params);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get('page'));
    },
    keepPreviousData: true,
  });
};
