"use client";
import ManagerCard from "@app/modules/home/components/manager-card/ManagerCard";
import React, { useCallback, useState } from "react";
import { CustomButton } from "@app/common/components/custom-button/CustomButton";
import { redirect } from "next/navigation";

const ManagerAddNew: React.FC = () => {
  const [dataCorrect, setDataCorrect] = useState<boolean>(false);

  const handleSave = useCallback(() => {
    redirect("/home/managers");
  }, []);

  return (
    <>
      <div className="actions-wrapper">
        <CustomButton
          buttonName={"Сохранить"}
          onClick={handleSave}
          active={dataCorrect}
          gray={true}
        />
      </div>
      <ManagerCard onDataCorrect={setDataCorrect} />
    </>
  );
};

export default ManagerAddNew;
