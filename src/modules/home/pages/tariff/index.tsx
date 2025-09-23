"use client";
import "@app/common/styles/pages/home/tariff.scss";
import React, { useCallback, useEffect, useState } from "react";
import { Tariff } from "@app/data/types";
import { fakeTariff } from "@app/data/mocks";
import "@app/common/styles/pages/home/tariff.scss";
import { CustomButton } from "@app/common/components/custom-button/CustomButton";
import Card from "@app/common/components/сard/Card";
import { CustomInput } from "@app/common/components/custom-input/CustomInput";
import { CheckIcon } from "@app/common/icons/check";

const TariffMain = () => {
  const [tariff, setTariff] = useState<Tariff>(fakeTariff); //fixme: mock
  const [editMode, setEditMode] = useState<boolean>(false);

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
      setEditMode(false);
    }
  }, [
    addingCostPerManager,
    addingCostPerStorage,
    basicCost,
    cloudStorageVolume,
    isDataTrue,
    managersCount,
    setEditMode,
    setTariff,
  ]);

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

  const handleEditSwitch = useCallback(() => {
    setEditMode(!editMode);
    if (!editMode) {
      setBasicCost(tariff.basicCost);
      setManagersCount(tariff.managersCount);
      setCloudStorageVolume(tariff.cloudStorageVolume);
      setAddingCostPerManager(tariff.addingCostPerManager);
      setAddingCostPerStorage(tariff.addingCostPerManager);
    }
  }, [
    editMode,
    tariff.addingCostPerManager,
    tariff.basicCost,
    tariff.cloudStorageVolume,
    tariff.managersCount,
  ]);

  return (
    <>
      <div className={"tariff-actions-wrapper"}>
        <CustomButton
          buttonName={"Сохранить"}
          onClick={handleSave}
          active={isDataTrue && editMode}
          gray={true}
        />
        <CustomButton
          buttonName={editMode ? "Отмена" : "Редактировать"}
          onClick={handleEditSwitch}
          type={"Blank"}
        />
      </div>
      {editMode ? (
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
      ) : (
        <Card>
          <h1>{"Итоговое описание тарифа"}</h1>
          <h1>{"Базовая стоимость"}</h1>
          <section className={"tariff"}>
            <div className={"tariff-value"}>
              <h1>{`${tariff.basicCost}₽`}</h1>
              <span>{"/месяц"}</span>
            </div>
            <div className={"tariff-value"}>
              <li>
                <CheckIcon /> <span>{"1 администратор"}</span>
              </li>
              <li>
                <CheckIcon /> <span>{`${tariff.managersCount} сотрудник`}</span>
              </li>
              <li>
                <CheckIcon />{" "}
                <span>{`${tariff.cloudStorageVolume}ГБ облачного хранилища`}</span>
              </li>
            </div>
            <div className={"tariff-value"}>
              <h1>{`${tariff.addingCostPerManager}₽`}</h1>
              <span>{"/месяц"}</span>
              <div>
                <span>{"за каждого дополнительного сотрудника"}</span>
              </div>
            </div>
            <div className={"tariff-value"}>
              <h1>{`${tariff.addingCostPerStorage}₽`}</h1>
              <span>{"/месяц"}</span>
              <div>
                <span>{"за каждые дополнительные 5ГБ хранилища"}</span>
              </div>
            </div>
          </section>
        </Card>
      )}
    </>
  );
};

export default TariffMain;
