"use client";
import { CustomButton } from "@app/common/components/custom-button/CustomButton";
import { useCallback } from "react";
import { redirect } from "next/navigation";

interface Props {
  onSend: () => void;
}

const RecoveryMain = ({ onSend }: Props) => {
  const handleReturn = useCallback(() => {
    console.log("redirect button clicked");
    redirect("/auth/sign-in");
  }, []);

  return (
    <div className={"recovery-wrapper"}>
      <h1>{"Восстановление пароля"}</h1>
      <div>
        <CustomButton
          buttonName={"Отправить ссылку"}
          onClick={onSend}
          style={{ minWidth: "60%" }}
        />
        <CustomButton
          buttonName={"Вернуться к авторизации"}
          onClick={handleReturn}
          style={{ minWidth: "60%" }}
          type={"Outline"}
        />
      </div>
    </div>
  );
};

export default RecoveryMain;
