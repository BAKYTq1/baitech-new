"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/lib/products/hooks/hooks";
import { Plus, Trash2, X, Camera } from "lucide-react";
import "./AddProduct.scss";

const AddProduct = () => {
  const router = useRouter();
  const {
    categories,
    brands,
    isInitialLoading,
    addProduct,
    addCategory,
    addBrand,
    deleteCategory,
    deleteBrand,
  } = useProducts();

  const [formData, setFormData] = useState({
    name: "",
    article: "",
    price: "",
    parentCategory: "", // уровень 1 — корневая категория
    category: "", // уровень 2 — подкатегория
    subCategory: "", // уровень 3 — под-подкатегория
    brand: "",
    bonus: "",
    bonusCost: "", // стоимость товара в бонусных баллах — используется, если цена не указана
    discount: "",
    description: "",
    characteristics: "",
    images: [null, null, null, null],
  });

  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState({ name: "", parent: "" });
  const [isSubmittingModal, setIsSubmittingModal] = useState(false);
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "bonus") {
      const num = Number(value);
      if (num > 9999 || num < 0) return;
      setFormData((prev) => ({ ...prev, bonus: value }));
      return;
    }

    if (name === "bonusCost") {
      const num = Number(value);
      if (num < 0) return;
      setFormData((prev) => ({ ...prev, bonusCost: value }));
      return;
    }

    if (name === "discount") {
      const num = Number(value);
      if (num > 100 || num < 0) return;
      setFormData((prev) => ({ ...prev, discount: value }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newImages = [...formData.images];
    newImages[index] = file;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages[index] = null;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const flattenCategories = (items, depth = 0) => {
    let flat = [];
    items?.forEach((item) => {
      flat.push({ ...item, displayName: `${"— ".repeat(depth)}${item.name}`, depth });
      if (item.subcategories?.length) {
        flat = flat.concat(flattenCategories(item.subcategories, depth + 1));
      }
    });
    return flat;
  };

  const flatCategories = useMemo(() => flattenCategories(categories), [categories]);

  // Списки для модалки "Управление" — раздельно по уровням
  const rootCategoriesFlat = useMemo(
    () => flatCategories.filter((item) => item.depth === 0),
    [flatCategories]
  );
  const subCategoriesFlat = useMemo(
    () => flatCategories.filter((item) => item.depth === 1),
    [flatCategories]
  );
  const subSubCategoriesFlat = useMemo(
    () => flatCategories.filter((item) => item.depth === 2),
    [flatCategories]
  );

  // ===== Категории: разворачиваем дерево на 3 уровня =====
  const rootCategories = useMemo(
    () => (categories || []).filter((item) => item.parent === null || item.parent === undefined),
    [categories]
  );

  // Уровень 2 — подкатегории выбранной корневой категории
  const selectedParentCategory = useMemo(
    () => rootCategories.find((item) => String(item.id) === String(formData.parentCategory)),
    [rootCategories, formData.parentCategory]
  );
  const availableSubcategories = selectedParentCategory?.subcategories || [];

  // Уровень 3 — под-подкатегории выбранной подкатегории (если есть)
  const selectedSubCategory = useMemo(
    () => availableSubcategories.find((item) => String(item.id) === String(formData.category)),
    [availableSubcategories, formData.category]
  );
  const availableSubSubcategories = selectedSubCategory?.subcategories || [];

  const closeModal = () => {
    setModalType(null);
    setModalData({ name: "", parent: "" });
  };

  const handleAddQuickInfo = async () => {
    if (!modalData.name.trim()) {
      alert("Название обязательно");
      return;
    }

    setIsSubmittingModal(true);
    try {
      if (modalType === "category") {
        await addCategory({
          name: modalData.name,
          parent: modalData.parent ? Number(modalData.parent) : null,
        });
      } else if (modalType === "brand") {
        await addBrand({
          name: modalData.name,
        });
      }

      closeModal();
    } catch (error) {
      console.error("Ошибка при создании:", error);
    } finally {
      setIsSubmittingModal(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmittingProduct(true);

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("article", formData.article);
    payload.append(
      "category",
      formData.subCategory || formData.category || formData.parentCategory
    );
    payload.append("brand", formData.brand);
    payload.append("discount", formData.discount || "0");
    payload.append("description", formData.description);
    payload.append("characteristics", formData.characteristics);
    payload.append("is_available", "true");

    const isBonusOnly = !(Number(formData.price) > 0);

    if (isBonusOnly) {
      // Товар доступен только за бонусные баллы — цены нет, есть только стоимость в баллах
      payload.append("price", "0");
      payload.append("bonus_price", formData.bonusCost);
      payload.append("bonus", "0");
    } else {
      payload.append("price", formData.price);
      payload.append("bonus", formData.bonus);
    }

    formData.images.forEach((file) => {
      if (file) payload.append("images", file);
    });

    try {
      await addProduct(payload);
      router.push("/productss");
    } catch (err) {
      console.error("Ошибка публикации:", err);
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  if (isInitialLoading) return <div className="loader" />;

  return (
    <div className="add-product-page">
      {modalType && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-btn" onClick={closeModal}>
              <X size={20} />
            </button>

            {modalType === "manage-category-root" || modalType === "manage-category-sub" || modalType === "manage-category-subsub" || modalType === "manage-brand" ? (
              <>
                <h3>
                  Управление{" "}
                  {modalType === "manage-category-root"
                    ? "категориями"
                    : modalType === "manage-category-sub"
                    ? "подкатегориями"
                    : modalType === "manage-category-subsub"
                    ? "под-подкатегориями"
                    : "брендами"}
                </h3>
                <div className="management-list">
                  {(modalType === "manage-category-root"
                    ? rootCategoriesFlat
                    : modalType === "manage-category-sub"
                    ? subCategoriesFlat
                    : modalType === "manage-category-subsub"
                    ? subSubCategoriesFlat
                    : brands
                  )?.map((item) => (
                    <div key={item.id} className="management-item">
                      <span>{item.displayName || item.name}</span>
                      <button
                        className="delete-item-btn"
                        onClick={async () => {
                          const isCategory = modalType !== "manage-brand";
                          const itemType = isCategory ? "категорию" : "бренд";
                          if (!window.confirm(`Вы уверены, что хотите удалить ${itemType} "${item.name}"?`)) {
                            return;
                          }

                          try {
                            if (isCategory) {
                              await deleteCategory(item.id);
                            } else {
                              await deleteBrand(item.id);
                            }
                            closeModal();
                          } catch (err) {
                            console.error("Ошибка удаления", err);
                          }
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="modal-actions">
                  <button className="cancel-btn" onClick={closeModal}>
                    Закрыть
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>Добавить {modalType === "category" ? "категорию" : "бренд"}</h3>
                <div className="modal-fields">
                  <div className="modal-group">
                    <label>Название *</label>
                    <input
                      type="text"
                      value={modalData.name}
                      onChange={(e) => setModalData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Введите название..."
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button className="cancel-btn" onClick={closeModal}>
                    Отмена
                  </button>
                  <button className="confirm-btn" onClick={handleAddQuickInfo} disabled={isSubmittingModal}>
                    {isSubmittingModal ? "..." : "Добавить"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="page-header">
        <div className="header-left">
          <button className="back-btn-new" onClick={() => router.back()} aria-label="Назад">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div className="header-titles">
            <h2>Добавление товара</h2>
            <p>Заполните информацию о новом продукте</p>
          </div>
        </div>
      </div>

      <div className="form-container">
        <div className="image-upload-section">
          <div className="thumbnail-grid">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="thumbnail-slot">
                {formData.images[idx] ? (
                  <div className="preview-container">
                    <img src={URL.createObjectURL(formData.images[idx])} alt="Превью" />
                    <button type="button" className="remove-btn-top" onClick={() => removeImage(idx)}>
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, idx)}
                      id={`thumb-${idx}`}
                      hidden
                    />
                    <label htmlFor={`thumb-${idx}`} className="upload-placeholder">
                      <Camera size={24} />
                    </label>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="main-image-slot">
            {formData.images[3] ? (
              <div className="preview-container main">
                <img src={URL.createObjectURL(formData.images[3])} alt="Главное" />
                <button type="button" className="remove-btn-top" onClick={() => removeImage(3)}>
                  ✕
                </button>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 3)}
                  id="main-image"
                  hidden
                />
                <label htmlFor="main-image" className="upload-placeholder-main">
                  <Camera size={32} />
                  <span>Загрузить главное фото</span>
                </label>
              </>
            )}
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Название</label>
            <input name="name" type="text" value={formData.name} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>Артикул</label>
            <input name="article" type="text" value={formData.article} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>Цена (сом)</label>
            <input name="price" type="number" value={formData.price} onChange={handleInputChange} />
            <small className="field-hint">
              Оставьте пустым, если товар продаётся только за бонусные баллы
            </small>
          </div>

          <div className="form-group">
            <label>Категория</label>
            <div className="select-wrapper">
              <select
                name="parentCategory"
                value={formData.parentCategory}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    parentCategory: e.target.value,
                    category: "",
                    subCategory: "",
                  }))
                }
              >
                <option value="">Выберите категорию</option>
                {rootCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="add-small-btn"
                onClick={() => {
                  setModalType("category");
                  setModalData({ name: "", parent: "" });
                }}
              >
                <Plus size={20} />
              </button>
              <button type="button" className="delete-small-btn" onClick={() => setModalType("manage-category-root")}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Подкатегория</label>
            <div className="select-wrapper">
              <select
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value,
                    subCategory: "",
                  }))
                }
                disabled={!formData.parentCategory || availableSubcategories.length === 0}
              >
                <option value="">
                  {formData.parentCategory ? "Выберите подкатегорию" : "Сначала выберите категорию"}
                </option>
                {availableSubcategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="add-small-btn"
                onClick={() => {
                  setModalType("category");
                  setModalData({
                    name: "",
                    parent: formData.parentCategory || "",
                  });
                }}
              >
                <Plus size={20} />
              </button>
              <button type="button" className="delete-small-btn" onClick={() => setModalType("manage-category-sub")}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Под-подкатегория</label>
            <div className="select-wrapper">
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                disabled={!formData.category || availableSubSubcategories.length === 0}
              >
                <option value="">
                  {formData.category ? "Выберите под-подкатегорию" : "Сначала выберите подкатегорию"}
                </option>
                {availableSubSubcategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="add-small-btn"
                onClick={() => {
                  setModalType("category");
                  setModalData({
                    name: "",
                    parent: formData.category || "",
                  });
                }}
              >
                <Plus size={20} />
              </button>
              <button type="button" className="delete-small-btn" onClick={() => setModalType("manage-category-subsub")}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Бренд</label>
            <div className="select-wrapper">
              <select name="brand" value={formData.brand} onChange={handleInputChange}>
                <option value="">Выберите бренд</option>
                {brands?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="add-small-btn"
                onClick={() => {
                  setModalType("brand");
                  setModalData({ name: "", parent: "" });
                }}
              >
                <Plus size={20} />
              </button>
              <button type="button" className="delete-small-btn" onClick={() => setModalType("manage-brand")}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="form-group">
            {Number(formData.price) > 0 ? (
              <>
                <label>Бонусные баллы (%)</label>
                <input name="bonus" type="number" value={formData.bonus} onChange={handleInputChange} />
              </>
            ) : (
              <>
                <label>Стоимость в бонусных баллах</label>
                <input name="bonusCost" type="number" value={formData.bonusCost} onChange={handleInputChange} />
                <small className="field-hint">
                  Сколько баллов нужно накопить, чтобы получить этот товар
                </small>
              </>
            )}
          </div>

          <div className="form-group">
            <label>Скидка (%)</label>
            <input name="discount" type="number" value={formData.discount} onChange={handleInputChange} />
          </div>
        </div>

        <div className="full-width-fields">
          <div className="form-group">
            <label>Описание</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Характеристики</label>
            <textarea name="characteristics" value={formData.characteristics} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => router.back()}>
            Отмена
          </button>
          <button type="button" className="submit-btn" onClick={handleSubmit} disabled={isSubmittingProduct}>
            {isSubmittingProduct ? "Публикация..." : "Опубликовать"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;