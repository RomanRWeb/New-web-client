"use client";
import "@app/common/styles/pages/home/tariff.scss";
import TariffEdit from "@app/modules/home/views/tariff-edit";
import { useState } from "react";
import { Tariff } from "@app/data/types";
import { fakeTariff } from "@app/data/mocks";
import TariffShow from "@app/modules/home/views/tariff-show";
import "@app/common/styles/pages/home/tariff.scss";

const TariffMain = () => {
  const [tariff, setTariff] = useState<Tariff>(fakeTariff); //fixme: mock
  const [editMode, setEditMode] = useState<boolean>(false);

  return editMode ? (
    <TariffEdit
      tariffInfo={tariff}
      setIsEdit={setEditMode}
      setTariff={setTariff}
    />
  ) : (
    <TariffShow tariffInfo={tariff} setIsEdit={setEditMode} />
  );
};

export default TariffMain;
