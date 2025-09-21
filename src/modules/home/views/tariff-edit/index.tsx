"use client";
import Card from "@app/common/components/Card/Card";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CustomButton } from "@app/common/components/CustomButton/CustomButton";
import "@app/common/styles/pages/home/tariff.scss";
import { CheckIcon } from "@app/common/icons/check";
import { CustomInput } from "@app/common/components/CustomInput/CustomInput";
import { Tariff } from "@app/data/types";

interface TariffEditProps {
  tariffInfo: Tariff;
  setIsEdit: (value: boolean) => void;
  setTariff: (value: Tariff) => void;
}

const TariffEdit: React.FC<TariffEditProps> = ({
  tariffInfo,
  setIsEdit,
  setTariff,
}) => {
  const tariff = useMemo(() => tariffInfo, [tariffInfo]);

  const [basicCost, setBasicCost] = useState<string>(tariff.basicCost);
  const [basicCostError, setBasicCostError] = useState<boolean>(false);

  const [managersCount, setManagersCount] = useState<string>(
    tariff.managersCount,
  );
  const [managersCountError, setManagersCountError] = useState<boolean>(false);

  const [cloudStorageVolume, setCloudStorageVolume] = useState<string>(
    tariff.cloudStorageVolume,
  );
  const [cloudStorageVolumeError, setCloudStorageVolumeError] =
    useState<boolean>(false);

  const [addingCostPerManager, setAddingCostPerManager] = useState<string>(
    tariff.addingCostPerManager,
  );
  const [addingCostPerManagerError, setAddingCostPerManagerError] =
    useState<boolean>(false);

  const [addingCostPerStorage, setAddingCostPerStorage] = useState<string>(
    tariff.addingCostPerManager,
  );
  const [addingCostPerStorageError, setAddingCostPerStorageError] =
    useState<boolean>(false);

  const [isDataTrue, setIsDataTrue] = useState<boolean>(false);

  useEffect(() => {
    if (
      !basicCostError &&
      !managersCountError &&
      !cloudStorageVolumeError &&
      !addingCostPerManagerError &&
      !addingCostPerStorageError
    ) {
      setIsDataTrue(true);
    } else setIsDataTrue(false);
  }, [
    addingCostPerManagerError,
    addingCostPerStorageError,
    basicCostError,
    cloudStorageVolumeError,
    managersCountError,
  ]);

  const handleSave = useCallback(() => {
    if (isDataTrue) {
      setTariff({
        basicCost: basicCost,
        managersCount: managersCount,
        cloudStorageVolume: cloudStorageVolume,
        addingCostPerStorage: addingCostPerManager,
        addingCostPerManager: addingCostPerStorage,
      });
      setIsEdit(false);
    }
  }, [
    addingCostPerManager,
    addingCostPerStorage,
    basicCost,
    cloudStorageVolume,
    isDataTrue,
    managersCount,
    setIsEdit,
    setTariff,
  ]);

  const handleEdit = useCallback(() => {
    setIsEdit(false);
  }, [setIsEdit]);

  useEffect(() => {
    const numberRegex = /^\d+$/;
    if (numberRegex.test(basicCost)) {
      setBasicCostError(false);
    } else {
      setBasicCostError(true);
    }
  }, [basicCost]);

  useEffect(() => {
    const numberRegex = /^\d+$/;
    if (numberRegex.test(managersCount)) {
      setManagersCountError(false);
    } else {
      setManagersCountError(true);
    }
  }, [managersCount]);

  useEffect(() => {
    const numberRegex = /^\d+$/;
    if (numberRegex.test(cloudStorageVolume)) {
      setCloudStorageVolumeError(false);
    } else {
      setCloudStorageVolumeError(true);
    }
  }, [cloudStorageVolume]);

  useEffect(() => {
    const numberRegex = /^\d+$/;
    if (numberRegex.test(addingCostPerManager)) {
      setAddingCostPerManagerError(false);
    } else {
      setAddingCostPerManagerError(true);
    }
  }, [addingCostPerManager]);

  useEffect(() => {
    const numberRegex = /^\d+$/;
    if (numberRegex.test(addingCostPerStorage)) {
      setAddingCostPerStorageError(false);
    } else {
      setAddingCostPerStorageError(true);
    }
  }, [addingCostPerStorage]);

  return (
    <>
      <div className={"tariff-actions-wrapper"}>
        <CustomButton
          buttonName={"Сохранить"}
          onClick={handleSave}
          active={isDataTrue}
          gray={true}
        />
        <CustomButton
          buttonName={"Отмена"}
          onClick={handleEdit}
          type={"Blank"}
        />
      </div>
      <Card>
        <h1>{"Итоговое описание тарифа"}</h1>
        <h1>{"Базовая стоимость"}</h1>
        <section className={"tariff"}>
          <div className={"tariff-value"}>
            <CustomInput
              value={basicCost}
              onChange={setBasicCost}
              errState={basicCostError}
              key={"basicCostInput"}
            />
            <span>{"/месяц"}</span>
          </div>
          <div className={"tariff-value"}>
            <li>
              <CheckIcon />
              <span>{"1 администратор"}</span>
            </li>
            <li>
              <CheckIcon />
              <CustomInput
                value={managersCount}
                onChange={setManagersCount}
                errState={managersCountError}
                key={"managerCountInput"}
              />
              <span>{"сотрудник"}</span>
            </li>
            <li>
              <CheckIcon />
              <CustomInput
                value={cloudStorageVolume}
                onChange={setCloudStorageVolume}
                errState={cloudStorageVolumeError}
                key={"cloudStorageVolumeInput"}
              />
              <span>{"ГБ облачного хранилища"}</span>
            </li>
          </div>
          <div className={"tariff-value"}>
            <CustomInput
              value={addingCostPerManager}
              onChange={setAddingCostPerManager}
              errState={addingCostPerManagerError}
              key={"addingCostPerManagerInput"}
            />
            <span>{"/месяц"}</span>
            <div>
              <span>{"за каждого дополнительного сотрудника"}</span>
            </div>
          </div>
          <div className={"tariff-value"}>
            <CustomInput
              value={addingCostPerStorage}
              onChange={setAddingCostPerStorage}
              errState={addingCostPerStorageError}
              key={"addingCostPerStorageInput"}
            />
            <span>{"/месяц"}</span>
            <div>
              <span>{"за каждые дополнительные 5ГБ хранилища"}</span>
            </div>
          </div>
        </section>
      </Card>
    </>
  );
};

export default TariffEdit;
