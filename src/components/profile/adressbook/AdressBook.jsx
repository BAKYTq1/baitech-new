"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AddressModal from "@/components/ui/modal/AddressModal";
import { $api } from "../../../../API/api";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../product/ui/Breadcrumb/Breadcrumb.jsx";

const API_URL = "/addressbook/addresses/";

const AddressBook = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => (await $api.get(API_URL)).data,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => $api.delete(`${API_URL}${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
    },
  });

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  // --- Состояние Скелетона (первичная загрузка) ---
  if (isLoading) {
    return (
      <div className="w-full p-4 lg:p-10 space-y-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
        <div className="h-12 w-64 bg-gray-200 animate-pulse rounded-lg" />
        {[1, 2].map((i) => (
          <div
            key={i}
            className="w-full md:w-[761px] h-[200px] bg-white rounded-xl border border-gray-100 p-8 space-y-4"
          >
            <div className="h-6 w-1/3 bg-gray-100 animate-pulse rounded" />
            <div className="h-4 w-1/2 bg-gray-100 animate-pulse rounded" />
            <div className="h-4 w-1/4 bg-gray-100 animate-pulse rounded" />
          </div>
        ))}
      </div>
    );
  }

  const addresses = data?.results || [];

  return (
    <div className="w-full cd  font-['Montserrat'] min-h-screen">
      <Breadcrumb
        items={[
          { label: t("addressBook.breadcrumbs.home"), path: "/" },
          { label: t("addressBook.breadcrumbs.account"), path: "/profile" },
          { label: t("addressBook.breadcrumbs.current"), path: "" },
        ]}
      />
      <h1 className="text-[24px] font-medium text-[#1f2937] mb-5">
        {t("addressBook.title")}
      </h1>

      <button
        onClick={handleAddNew}
        className="bg-[#122D52] text-white px-8 h-[48px] rounded-[8px] font-medium hover:bg-[#0d213d] transition-all mb-10 active:scale-95"
      >
        {t("addressBook.addNewAddress")}
      </button>

      <div className="flex flex-col gap-6">
        {addresses.map((item) => {
          // Проверяем, удаляется ли именно эта карточка прямо сейчас
          const isDeleting =
            deleteMutation.isPending && deleteMutation.variables === item.id;

          return (
            <div
              key={item.id}
              className={`w-full md:w-[761px] bg-white rounded-[12px] p-6 lg:p-8 relative shadow-sm border border-gray-100 transition-all duration-300 ${isDeleting ? "opacity-50 scale-[0.98]" : "animate-slide-up"}`}
            >
              {/* Спиннер удаления поверх карточки */}
              {isDeleting && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-[12px]">
                  <div className="w-8 h-8 border-4 border-[#122D52] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <div className="space-y-1 text-[#4b5563]">
                <p className="font-semibold text-[#1f2937] text-lg mb-2">
                  {item.first_name} {item.last_name}
                </p>
                <p>
                  {t("addressBook.fields.email")}: {item.email}
                </p>
                <p>
                  {t("addressBook.fields.address")}: {item.address_1}{" "}
                  {item.address_2 && `, ${item.address_2}`}
                </p>
                <p>
                  {t("addressBook.fields.cityPostal")}: {item.region},{" "}
                  {item.postal_code}
                </p>
                <p>
                  {t("addressBook.fields.country")}: {item.country}
                </p>
                <p>
                  {t("addressBook.fields.status")}:{" "}
                  <span
                    className={
                      item.is_primary ? "text-green-600 font-bold" : ""
                    }
                  >
                    {item.is_primary
                      ? t("addressBook.status.primary")
                      : t("addressBook.status.additional")}
                  </span>
                </p>
              </div>

              <div className="mt-6 flex lg:absolute lg:bottom-8 lg:right-8 gap-3">
                <button
                  disabled={isDeleting}
                  onClick={() => deleteMutation.mutate(item.id)}
                  className="flex items-center justify-center min-w-[100px] px-5 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {t("addressBook.buttons.delete")}
                </button>
                <button
                  disabled={isDeleting}
                  onClick={() => handleEdit(item)}
                  className="px-5 py-2 border border-[#D1D5DB] text-[#122D52] rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t("addressBook.buttons.edit")}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <AddressModal
          address={editingAddress}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AddressBook;
