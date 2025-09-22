"use client";
import ManagerCard from "@app/modules/home/components/manager-card/ManagerCard";
import React, { useCallback, useState } from "react";
import { CustomButton } from "@app/common/components/custom-button/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "@app/store/store";
import Modal from "@app/common/components/modal/Modal";
import { redirect } from "next/navigation";

const ManagerEditSelected: React.FC = () => {
  const [dataCorrect, setDataCorrect] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const uiState = useSelector((state: RootState) => state.ui);

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
          uiState.currentManager || {
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

export default ManagerEditSelected;
