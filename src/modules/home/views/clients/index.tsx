"use client";
import SearchBar from "@app/common/components/SearchBar/SearchBar";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DropdownBar from "@app/common/components/DropdownBar/DropdownBar";
import { CustomButton } from "@app/common/components/CustomButton/CustomButton";
import {
  ClientType,
  ColumnsHeader,
  SellStateItem,
  SubscribeItem,
} from "@app/data/types";
import "@app/common/styles/pages/home/clients.scss";
import CustomTable from "@app/common/components/CustomTable/CustomTable";
import { redirect } from "next/navigation";
import { AppDispatch } from "@app/store/store";
import { useDispatch } from "react-redux";
import { setCurrentClient } from "@app/store/slices/uiSlice";
import { Clients } from "@app/data/mocks";
import {
  ClientTableHeaders,
  sellStateItems,
  subscribeItems,
} from "@app/data/constants";

const ClientsMain: React.FC = () => {
  const columnsData: ColumnsHeader[] = useMemo(() => ClientTableHeaders, []);

  const dispatch: AppDispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>("");
  const [subscribeFilter, setSubscribeFilter] = useState<SubscribeItem | "">(
    "",
  );
  const [sellStateFilter, setSellStateFilter] = useState<SellStateItem | "">(
    "",
  );
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
  const [tableClients, setTableClients] = useState<ClientType[]>(Clients);

  const handleClearFilters = useCallback(() => {
    setSearchValue("");
    setSubscribeFilter("");
    setSellStateFilter("");
  }, []);

  useEffect(() => {
    if (selectedClient !== null) {
      dispatch(
        setCurrentClient(Clients.find((el) => el.id === selectedClient?.id)),
      );
      redirect(`/home/clients/${selectedClient.id}`);
    }
  }, [dispatch, selectedClient]);

  useEffect(() => {
    let newClientsData = Clients.map((el) => {
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
