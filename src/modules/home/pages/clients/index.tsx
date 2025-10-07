"use client";
import SearchBar from "@app/common/components/search-bar/SearchBar";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DropdownBar from "@app/common/components/dropdown-bar/DropdownBar";
import { CustomButton } from "@app/common/components/custom-button/CustomButton";
import {
  ClientType,
  ColumnsHeader,
  SellStateItem,
  SubscribeItem,
} from "@app/data/types";
import "@app/common/styles/pages/home/clients.scss";
import CustomTable from "@app/common/components/custom-table/CustomTable";
import { redirect } from "next/navigation";
import { clients } from "@app/data/mocks";
import {
  ClientTableHeaders,
  sellStateItems,
  subscribeItems,
} from "@app/data/constants";

const ClientsMain: React.FC = () => {
  const columnsData: ColumnsHeader[] = useMemo(() => ClientTableHeaders, []);

  const [searchValue, setSearchValue] = useState<string>("");
  const [subscribeFilter, setSubscribeFilter] = useState<SubscribeItem | "">(
    "",
  );
  const [sellStateFilter, setSellStateFilter] = useState<SellStateItem | "">(
    "",
  );
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
  const [tableClients, setTableClients] = useState<ClientType[]>(clients);

  const handleClearFilters = useCallback(() => {
    setSearchValue("");
    setSubscribeFilter("");
    setSellStateFilter("");
  }, []);

  useEffect(() => {
    if (selectedClient !== null) {
      redirect(`/home/clients/${selectedClient.id}`);
    }
  }, [selectedClient]);

  useEffect(() => {
    let newClientsData = clients.map((el) => {
      if (el.sellWaitData && el.sellState === "В ожидании") {
        return { ...el, sellState: `Ожидание до ${el.sellWaitData}` };
      } else return el;
    });
    if (subscribeFilter !== "" || sellStateFilter !== "") {
      if (subscribeFilter !== "") {
        newClientsData = newClientsData.filter(
          (el) => el.subscribeState === subscribeFilter,
        );
      }
      if (sellStateFilter !== "") {
        if (sellStateFilter !== "В ожидании") {
          newClientsData = newClientsData.filter(
            (el) => el.sellState === sellStateFilter,
          );
        } else {
          newClientsData = newClientsData.filter(
            (el) =>
              el.sellState.replace(/\s\d{2}.\d{2}.\d{4}$/, "").trim() ===
              "Ожидание до",
          );
        }
      }
    }
    setTableClients([...newClientsData]);
  }, [subscribeFilter, sellStateFilter]);

  return (
    <>
      <div className={"clients-action-wrapper"}>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          title={"ПОИСК"}
        />
        <DropdownBar
          title={"ПОДПИСКА"}
          onSelect={setSubscribeFilter}
          items={subscribeItems}
          selectedValue={subscribeFilter}
        />
        <DropdownBar
          title={"СТАТУС ПРОДАЖИ"}
          onSelect={setSellStateFilter}
          items={sellStateItems}
          selectedValue={sellStateFilter}
        />
        <CustomButton
          buttonName={"Очистить фильтр"}
          onClick={handleClearFilters}
          gray={true}
          active={
            searchValue !== "" ||
            subscribeFilter !== "" ||
            sellStateFilter !== ""
          }
        />
      </div>
      <div>
        <CustomTable
          onClickRow={setSelectedClient}
          name={"Клиенты"}
          data={tableClients}
          columns={columnsData}
          defaultSortField={""}
        />
      </div>
    </>
  );
};

export default ClientsMain;
