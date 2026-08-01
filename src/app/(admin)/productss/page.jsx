"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { useProducts } from "@/lib/products/hooks/hooks";
import "./CamerCatalog.scss";

const PAGE_SIZE = 20;

const getPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  if (currentPage <= 4)
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  if (currentPage >= totalPages - 3)
    return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
};

const CamerCatalog = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

 const handleSearch = () => {
  setDebouncedSearch(searchTerm);
};

const handleKeyDown = (e) => {
  if (e.key === "Enter") handleSearch();
};
  const {
    products,
    totalCount,
    isLoading,
    deleteProduct,
    changeAvailability,
    categories,
    isInitialLoading,
  } = useProducts({
    page,
    search: debouncedSearch,
    category: selectedCategory,
  });

  const productsArray = Array.isArray(products) ? products : products?.results || [];
  const totalPages = Math.max(1, Math.ceil((totalCount ?? 0) / PAGE_SIZE));
  const paginationItems = getPaginationItems(page, totalPages);

  // Защита от выхода за пределы страниц
useEffect(() => {
  if (isLoading) return; // не сбрасываем страницу пока грузятся новые данные
  if (page > 1 && totalPages > 0 && page > totalPages) {
    setPage(1);
  }
}, [totalPages, page, isLoading]);

  // --- Модальные окна ---
  const openActionModal = (product) => {
    setSelectedProduct(product);
    setIsActionModalOpen(true);
  };
  const closeActionModal = () => {
    setIsActionModalOpen(false);
    setSelectedProduct(null);
  };

  const openStatusModal = (product) => {
    setSelectedProduct(product);
    setIsStatusModalOpen(true);
  };
  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedProduct(null);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleStatusChange = (statusText) => {
    if (!selectedProduct) return;
    changeAvailability({
      id: selectedProduct.id,
      is_available: statusText === "В наличии",
    });
    closeStatusModal();
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    deleteProduct(selectedProduct.id);
    closeDeleteModal();
    closeActionModal();
  };

  if (!mounted || isLoading) {
    return <div className="loader" />;
  }

  return (
    <div className="admin-content">
      <div className="header">
        <div className="search-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Поиск по названию или артикулу"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search-icon" type="button " onClick={handleSearch}>
              <IoSearch />
            </button>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-dropdown"
          >
            <option value="">Все Товары</option>
            {categories &&
              !isInitialLoading &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        <button
          className="add-product-btn"
          onClick={() => router.push("/add-product")}
        >
          Добавить товар +
        </button>
      </div>

      <div className="products-section">
        <h2>
          {categories?.find((cat) => cat.id === Number(selectedCategory))?.name ||
            "Все категории"}
        </h2>

        <div className="products-grid">
          {productsArray.length > 0 ? (
            productsArray.map((product) => (
              <div key={product.id} className="product-card">
                <div className="card-header">
                  <div className="product-image">
                    {product.existing_images && product.existing_images.length > 0 ? (
                      <img
                        src={product.existing_images[0]?.image}
                        alt={product.name}
                      />
                    ) : (
                      <div className="placeholder-image">Нет фото</div>
                    )}
                  </div>
                </div>

                <div className="card-content">
                  <div className="info-grid">
                    <div className="info-block">
                      <div className="info-label">Название</div>
                      <div className="info-value name-value">{product.name}</div>
                    </div>
                    <div className="info-block">
                      <div className="info-label">Артикул</div>
                      <div className="info-value">{product.article}</div>
                    </div>
                    <div className="info-block">
                      <div className="info-label">
                        {Number(product.price) > 0 ? "Цена" : "Цена в бонусах"}
                      </div>
                      <div className="info-value">
                        {Number(product.price) > 0
                          ? `${product.price} сом`
                          : `${product.bonus_price ?? 0} баллов`}
                      </div>
                    </div>
                    <div className="info-block">
                      <div className="info-label">Статус</div>
                      <div
                        className={`status-badge ${
                          product.is_available ? "in-stock" : "out-of-stock"
                        }`}
                      >
                        {product.is_available ? "В наличии" : "Нет в наличии"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="menu-container">
                  <button
                    className="menu-btn"
                    type="button"
                    onClick={() => openActionModal(product)}
                  >
                    ...
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Товары не найдены</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn arrow"
              type="button"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              &lt;
            </button>

            {paginationItems.map((item, index) =>
              item === "ellipsis" ? (
                <span key={`dots-${index}`} className="dots">
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  className={`page-btn ${item === page ? "active" : ""}`}
                  type="button"
                  onClick={() => setPage(item)}
                >
                  {item}
                </button>
              )
            )}

            <button
              className="page-btn arrow"
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      {/* Модал: Действия */}
      {isActionModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={closeActionModal}>
          <div
            className="modal-content action-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Действия</h3>
              <button className="close-btn" onClick={closeActionModal}>×</button>
            </div>
            <div className="modal-body">
              <button
                className="action-btn"
                onClick={() => {
                  closeActionModal();
                  openStatusModal(selectedProduct);
                }}
              >
                Изменить статус
              </button>
              <button
                className="action-btn"
                onClick={() => router.push(`/edit-product/${selectedProduct.id}`)}
              >
                Редактировать
              </button>
              <button
                className="action-btn delete-btn"
                onClick={() => {
                  closeActionModal();
                  openDeleteModal(selectedProduct);
                }}
              >
                Удалить публикацию
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модал: Изменить статус */}
      {isStatusModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={closeStatusModal}>
          <div
            className="modal-content status-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Изменить статус</h3>
              <button className="close-btn" onClick={closeStatusModal}>×</button>
            </div>
            <div className="modal-body">
              <p>
                Новый статус для: <strong>{selectedProduct.name}</strong>
              </p>
              <div className="status-options">
                <button
                  className={`status-option ${selectedProduct.is_available ? "selected" : ""}`}
                  onClick={() => handleStatusChange("В наличии")}
                >
                  В наличии
                </button>
                <button
                  className={`status-option ${!selectedProduct.is_available ? "selected" : ""}`}
                  onClick={() => handleStatusChange("Не в наличии")}
                >
                  Не в наличии
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модал: Удаление */}
      {isDeleteModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div
            className="modal-content delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Подтверждение</h3>
              <button className="close-btn" onClick={closeDeleteModal}>×</button>
            </div>
            <div className="modal-body">
              <p>
                Вы точно уверены, что хотите удалить товар{" "}
                <strong>"{selectedProduct.name}"?</strong>
              </p>
              <div className="delete-actions">
                <button className="cancel-btn" onClick={closeDeleteModal}>
                  Отмена
                </button>
                <button className="confirm-delete-btn" onClick={handleDeleteProduct}>
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CamerCatalog;