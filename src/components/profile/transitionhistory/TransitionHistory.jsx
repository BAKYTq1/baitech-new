"use client";

import React from "react";
import { RxCross2 } from "react-icons/rx";
import "./TransactionHistory.scss";
import { useTranslation } from "react-i18next";
import { useTransactions } from "@/lib/transactions/hooks/hooks";
import Breadcrumb from "../../product/ui/Breadcrumb/Breadcrumb.jsx";

function TransactionHistory() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useTransactions();

  const transactions = data?.results || data || [];

  if (isLoading) return <div className="loader"></div>;
  if (error) return <p>{t("transactionHistory.error") || "Ошибка загрузки"}</p>;

  return (
    <div className="transactionhistory container">
      <Breadcrumb
        items={[
          { label: t("transactionHistory.breadcrumb.home"), path: "/" },
          {
            label: t("transactionHistory.breadcrumb.personalAccount"),
            path: "/profile",
          },
          { label: t("transactionHistory.breadcrumb.history"), path: "" },
        ]}
      />

      {transactions.length === 0 && (
        <p className="transactionhistory__empty">
          {t("transactionHistory.empty.title") || "У вас пока нет транзакций"}
        </p>
      )}

      {transactions.map((item) => {
        const isSuccess = item.status === "succeeded";

        return (
          <div key={item.id} className="transactionhistorycard">
            <div
              className={`icon ${isSuccess ? "icon--success" : "icon--error"}`}
            >
              <span>
                {isSuccess ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13.3332 7.33333L6.6665 14L3.33317 10.6667"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <RxCross2 />
                )}
              </span>
            </div>

            <div className="details">
              <div className="title">
                <h3>
                  {t("transactionHistory.payment")} №{item.order}
                </h3>
                <span>
                  {Number(item.amount).toLocaleString()}{" "}
                  {t("transactionHistory.currency") || "сом"}
                </span>
              </div>
              <div className="date">
                <p>{item.formatted_date}</p>
              </div>
              <div className="status">
                <p>{item.status_display}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionHistory;
