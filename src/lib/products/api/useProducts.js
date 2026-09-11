import { $api } from "../../../../API/api";
const apiClient = $api;

const normalizeListResponse = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

export const productApi = {
  search: async (query) => {
    const { data } = await apiClient.get('products/products/search/', {
      params: { q: query },
    });
    return data;
  },

  getAll: async (params = {}) => {
    // Убираем пустые значения чтобы не слать ?search=&category=
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
    );
    const { data } = await apiClient.get('products/products/', { params: cleanParams });
    return data;
  },

  getAllPages: async (params = {}) => {
    const { page: _page, search: _search, article: _article, ...baseParams } = params;
    const firstPage = await productApi.getAll({ ...baseParams, page: 1 });
    const firstResults = normalizeListResponse(firstPage);
    const allResults = [...firstResults];
    const pageSize = firstResults.length || 20;
    const totalPages = firstPage?.count ? Math.ceil(firstPage.count / pageSize) : null;
    let page = 2;

    while (totalPages ? page <= totalPages : Boolean(firstPage?.next) && page <= 100) {
      const data = await productApi.getAll({ ...baseParams, page });
      const results = normalizeListResponse(data);

      if (results.length === 0) break;
      allResults.push(...results);

      if (!totalPages && !data?.next) break;
      page += 1;
    }

    return {
      ...firstPage,
      count: allResults.length,
      next: null,
      previous: null,
      results: allResults,
    };
  },

  getSimilar: async (productId) => {
    const response = await apiClient.get('/products/products/', {
      params: { similar_features: productId }
    });
    return response.data;
  },

  getByBrand: async (brandId, page = 1) => {
    const response = await apiClient.get('/products/products/', {
      params: { brand: brandId, page }
    });
    return response.data;
  },

  getByCategory: async (category, page = 1) => {
    const response = await apiClient.get('/products/products/', {
      params: { category, page }
    });
    return response.data;
  },

  getByArticle: async (article) => {
    const response = await apiClient.get('/products/products/', {
      params: { article }
    });
    return response.data;
  },

  getByPrice: async (price, page = 1) => {
    const response = await apiClient.get('/products/products/', {
      params: { price, page }
    });
    return response.data;
  },

  getById: async (id) => {
    const { data } = await apiClient.get(`products/products/${id}/`);
    return data;
  },

  delete: async (id) => {
    const { data } = await apiClient.delete(`products/products/${id}/`);
    return data;
  },

  patch: async (id, payload) => {
    const { data } = await apiClient.patch(`products/products/${id}/`, payload);
    return data;
  },

  changeAvailability: async (id, is_available) => {
    const { data } = await apiClient.patch(`products/products/${id}/availability/`, { is_available });
    return data;
  },

  getCategories: async () => {
    const { data } = await apiClient.get('products/categories/');
    return data;
  },

  getBrands: async () => {
    const { data } = await apiClient.get('products/brands/');
    return data;
  },

  create: async (payload) => {
    const { data } = await apiClient.post('products/products/', payload);
    return data;
  },

  createCategory: async (payload) => {
    const { data } = await apiClient.post('products/categories/', payload);
    return data;
  },

  createBrand: async (payload) => {
    const { data } = await apiClient.post('products/brands/', payload);
    return data;
  },

  deleteCategory: async (id) => {
    const { data } = await apiClient.delete(`products/categories/${id}/`);
    return data;
  },

  deleteBrand: async (id) => {
    const { data } = await apiClient.delete(`products/brands/${id}/`);
    return data;
  },
};
