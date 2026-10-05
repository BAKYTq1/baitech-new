"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { $api } from "../../../../API/api";
import ReturnHistoryCard from "../../ui/returncard/ReturnCard";
import Breadcrumb from "../../product/ui/Breadcrumb/Breadcrumb.jsx";

export function Returns() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await $api.get("api/returns/requests/");
        setData(response.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
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
          { label: t("returns.breadcrumbs.orderHistory"), path: "/" },
          {
            label: t("returns.breadcrumbs.allOrders"),
            path: "/profile?tab=orders",
          },
          { label: t("returns.breadcrumbs.delivered"), path: "" },
        ]}
      />
      <div className="orderhistorycards">
        {data.length === 0 ? (
          <p>{t("returns.empty") || "Заявок на возврат нет."}</p>
        ) : (
          data.map((item) => <ReturnHistoryCard item={item} key={item.id} />)
        )}
      </div>
    </div>
  );
}
