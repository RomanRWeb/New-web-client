"use client";
import ManagerCard from "@app/modules/home/components/manager-card";
import React, { useCallback, useState } from "react";
import { CustomButton } from "@app/common/components/custom-button/CustomButton";
import Modal from "@app/common/components/modal/Modal";
import { redirect } from "next/navigation";
import { fakeManagers } from "@app/data/mocks";

interface ManagerProps {
  managerId: string;
}

const ManagerEdit: React.FC<ManagerProps> = ({ managerId }) => {
  const [dataCorrect, setDataCorrect] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleSave = useCallback(() => {
    redirect("/home/managers");
  }, []);

  const handleDelete = useCallback(() => {
    redirect("/home/managers");
  }, []);

  return (
    <>
      <div className="ActionsWrapper">
        <div style={{ display: "flex", gap: "24px" }}>
          <CustomButton
            buttonName={"Сохранить"}
            onClick={handleSave}
            active={dataCorrect}
          />
          <CustomButton
            buttonName={"Удалить менеджера"}
            onClick={() => setModalVisible(true)}
            type={"Blank"}
          />
          <Modal
            title={"Вы уверены что хотите удалить менеджера?"}
            actions={
              <CustomButton buttonName={"Удалить"} onClick={handleDelete} />
            }
            isVisible={modalVisible}
            content={""}
            onCloseFunk={() => setModalVisible(false)}
          />
        </div>
      </div>
      <ManagerCard
        onDataCorrect={setDataCorrect}
        manager={
          fakeManagers.find((manager) => manager.id === managerId) || {
            id: "0",
            role: "",
            phone: "",
            password: "",
            fullName: "",
          }
        }
      />
    </>
  );
};

export default ManagerEdit;
