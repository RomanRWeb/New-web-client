"use client";
import Card from "@app/common/components/Card/Card";
import React, { useCallback, useMemo } from "react";
import { CustomButton } from "@app/common/components/CustomButton/CustomButton";
import "@app/common/styles/pages/home/tariff.scss";
import { CheckIcon } from "@app/common/icons/check";
import { Tariff } from "@app/data/types";

interface TariffProps {
  tariffInfo: Tariff;
  setIsEdit: (value: boolean) => void;
}

const TariffShow: React.FC<TariffProps> = ({ tariffInfo, setIsEdit }) => {
  const tariff = useMemo(() => tariffInfo, [tariffInfo]);

  const handleEdit = useCallback(() => {
    setIsEdit(true);
  }, [setIsEdit]);

  return (
    <>
      <div className={"tariff-actions-wrapper"}>
        <CustomButton buttonName={"Сохранить"} active={false} gray={true} />
        <CustomButton
          buttonName={"Редактировать"}
          onClick={handleEdit}
          type={"Blank"}
        />
      </div>
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
    </>
  );
};

export default TariffShow;
