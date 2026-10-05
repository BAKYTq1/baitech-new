"use client";
import React, { useEffect, useState } from "react";
import "./OrderHistory.scss";
import OtherHistoryCard from "@/components/ui/orderhistorycard/Ordercard";
import { useTranslation } from "react-i18next";
import { $api } from "../../../../API/api";
import Breadcrumb from "../../product/ui/Breadcrumb/Breadcrumb.jsx";

function OrderHistory() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await $api.get("ordering/orders/");
        setData(response.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="otderhistory container">
        <p className="loader"></p>
      </div>
    );

  if (error)
    return (
      <div className="otderhistory container">
        <p>{`Ошибка: ${error}`}</p>
      </div>
    );

  return (
    <div className="otderhistory container">
      <Breadcrumb
        items={[
          { label: t("orderHistory.breadcrumbs.home"), path: "/" },
          { label: t("orderHistory.breadcrumbs.account"), path: "/profile" },
          { label: t("orderHistory.breadcrumbs.current"), path: "" },
        ]}
      />
      <div className="orderhistorycards">
        {data.length === 0 ? (
          <p>{t("orderHistory.empty") || "Заказов нет."}</p>
        ) : (
          data.map((item) => <OtherHistoryCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
