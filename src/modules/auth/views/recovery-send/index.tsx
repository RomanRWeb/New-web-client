"use client";
import { CustomButton } from "@app/common/components/custom-button/CustomButton";
import { useCallback } from "react";
import { redirect } from "next/navigation";
import "@app/common/styles/pages/auth/recovery.scss";
import { Success } from "@app/common/components/images/Success";

const RecoverySend = () => {
  const handleReturn = useCallback(() => {
    console.log("redirect button clicked");
    redirect("/auth/sign-in");
  }, []);

  return (
    <div className={"recovery-wrapper"}>
      <div>
        <h1>{"Письмо отправлено"}</h1>
        <span>
          {
            "Мы отправили инструкции по сбросу пароля на Email владельца сервиса."
          }
        </span>
        <Success size={100} />
      </div>
      <CustomButton
        buttonName={"Вернуться к авторизации"}
        onClick={handleReturn}
        style={{ minWidth: "60%" }}
        type={"Fill"}
      />
    </div>
  );
};

export default RecoverySend;
