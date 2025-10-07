"use client";
import "@app/common/styles/pages/home/tariff.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  const numberRegex = useMemo(() => /^\d+$/, []);

  const [basicCost, setBasicCost] = useState<string>(tariff.basicCost);
  const [basicCostError, setBasicCostError] = useState<boolean>(false);

  const [managersCount, setManagersCount] = useState<string>(
    tariff.managersCount,
  );
  const [managersCountError, setManagersCountError] = useState<boolean>(false);

  const [cloudVolume, setCloudVolume] = useState<string>(
    tariff.cloudStorageVolume,
  );
  const [cloudVolumeError, setCloudVolumeError] = useState<boolean>(false);

  const [addCostManager, setAddingCostPerManager] = useState<string>(
    tariff.addingCostPerManager,
  );
  const [addCostManagerError, setAddingCostPerManagerError] =
    useState<boolean>(false);

  const [addCostStorage, setAddingCostPerStorage] = useState<string>(
    tariff.addingCostPerStorage,
  );
  const [addCostStorageError, setAddingCostPerStorageError] =
    useState<boolean>(false);

  const [isDataTrue, setIsDataTrue] = useState<boolean>(false);

  useEffect(() => {
    if (
      !basicCostError &&
      !managersCountError &&
      !cloudVolumeError &&
      !addCostManagerError &&
      !addCostStorageError
    ) {
      setIsDataTrue(true);
    } else setIsDataTrue(false);
  }, [
    addCostManagerError,
    addCostStorageError,
    basicCostError,
    cloudVolumeError,
    managersCountError,
  ]);

  const handleSave = useCallback(() => {
    if (isDataTrue) {
      setTariff({
        basicCost: basicCost,
        managersCount: managersCount,
        cloudStorageVolume: cloudVolume,
        addingCostPerManager: addCostManager,
        addingCostPerStorage: addCostStorage,
      });
      setEditMode(false);
    }
  }, [
    addCostManager,
    addCostStorage,
    basicCost,
    cloudVolume,
    isDataTrue,
    managersCount,
    setEditMode,
    setTariff,
  ]);

  const handleEditSwitch = useCallback(() => {
    setEditMode(!editMode);
    if (!editMode) {
      setBasicCost(tariff.basicCost);
      setManagersCount(tariff.managersCount);
      setCloudVolume(tariff.cloudStorageVolume);
      setAddingCostPerManager(tariff.addingCostPerManager);
      setAddingCostPerStorage(tariff.addingCostPerStorage);
    }
  }, [
    editMode,
    tariff.addingCostPerManager,
    tariff.addingCostPerStorage,
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
      <div className={"tariff-main-content"}>
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
                  regex={numberRegex}
                  setError={setBasicCostError}
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
                    regex={numberRegex}
                    setError={setManagersCountError}
                  />
                  <span>{"сотрудник"}</span>
                </li>
                <li>
                  <CheckIcon />
                  <CustomInput
                    value={cloudVolume}
                    onChange={setCloudVolume}
                    errState={cloudVolumeError}
                    key={"cloudVolumeInput"}
                    regex={numberRegex}
                    setError={setCloudVolumeError}
                  />
                  <span>{"ГБ облачного хранилища"}</span>
                </li>
              </div>
              <div className={"tariff-value"}>
                <CustomInput
                  value={addCostManager}
                  onChange={setAddingCostPerManager}
                  errState={addCostManagerError}
                  key={"addCostManagerInput"}
                  regex={numberRegex}
                  setError={setAddingCostPerManagerError}
                />
                <span>{"/месяц"}</span>
                <div>
                  <span>{"за каждого дополнительного сотрудника"}</span>
                </div>
              </div>
              <div className={"tariff-value"}>
                <CustomInput
                  value={addCostStorage}
                  onChange={setAddingCostPerStorage}
                  errState={addCostStorageError}
                  key={"addCostStorageInput"}
                  regex={numberRegex}
                  setError={setAddingCostPerStorageError}
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
                <h1>{`${parseFloat(tariff.basicCost).toLocaleString()}₽`}</h1>
                <span>{"/месяц"}</span>
              </div>
              <div className={"tariff-value"}>
                <li>
                  <CheckIcon /> <span>{"1 администратор"}</span>
                </li>
                <li>
                  <CheckIcon />{" "}
                  <span>{`${tariff.managersCount} сотрудник`}</span>
                </li>
                <li>
                  <CheckIcon />{" "}
                  <span>{`${tariff.cloudStorageVolume}ГБ облачного хранилища`}</span>
                </li>
              </div>
              <div className={"tariff-value"}>
                <h1>{`${parseFloat(tariff.addingCostPerManager).toLocaleString()}₽`}</h1>
                <span>{"/месяц"}</span>
                <div>
                  <span>{"за каждого дополнительного сотрудника"}</span>
                </div>
              </div>
              <div className={"tariff-value"}>
                <h1>{`${parseFloat(tariff.addingCostPerStorage).toLocaleString()}₽`}</h1>
                <span>{"/месяц"}</span>
                <div>
                  <span>{"за каждые дополнительные 5ГБ хранилища"}</span>
                </div>
              </div>
            </section>
          </Card>
        )}
      </div>
    </>
  );
};

export default TariffMain;
