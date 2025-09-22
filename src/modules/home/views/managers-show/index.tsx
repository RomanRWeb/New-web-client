"use client";
import CustomTable from "@app/common/components/custom-table/CustomTable";
import { ColumnsHeader, ManagerType } from "@app/data/types";
import React, { useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { CustomButton } from "@app/common/components/custom-button/CustomButton";
import SearchBar from "@app/common/components/search-bar/SearchBar";
import "@app/common/styles/pages/home/managers.scss";
import { setCurrentManager } from "@app/store/slices/uiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@app/store/store";
import { fakeManagers } from "@app/data/mocks";
import { ManagersTable } from "@app/data/constants";

const Managers: React.FC = () => {
  const tableColumns: ColumnsHeader[] = ManagersTable;

  const tableData: ManagerType[] = fakeManagers;

  const dispatch: AppDispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const [selectedManager, setSelectedManager] = useState<ManagerType>();

  useEffect(() => {
    if (selectedManager !== undefined) {
      dispatch(setCurrentManager(selectedManager));
      redirect(`/home/managers/edit-manager/${selectedManager.id}`);
    }
  }, [dispatch, selectedManager]);

  useEffect(() => {
    console.log(search);
  }, [search]);

  const handleCreateManager = useCallback(() => {
    redirect("/home/managers/add-manager");
  }, []);

  return (
    <>
      <div className="managers-actions-wrapper">
        <CustomButton
          buttonName={"Создать менеджера"}
          onClick={handleCreateManager}
        />
        <SearchBar onChange={setSearch} value={search} />
      </div>
      <CustomTable
        columns={tableColumns}
        data={tableData}
        name={"Менеджеры"}
        onClickRow={setSelectedManager}
      />
    </>
  );
};

export default Managers;
