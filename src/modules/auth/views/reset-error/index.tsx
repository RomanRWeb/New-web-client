"use client";
import { useCallback } from "react";
import { CustomButton } from "@app/common/components/CustomButton/CustomButton";
import { redirect } from "next/navigation";
import { Error } from "@app/common/components/Icons/Error";

const ResetError = () => {
  const handleReturn = useCallback(() => {
    console.log("redirect button clicked");
    redirect("/auth/sign-in");
  }, []);

  return (
    <>
      <div>
        <h1>{"Ссылка недействительна"}</h1>
        <span>
          {
            "К сожалению, ссылка по которой вы открыли данную страницу, уже недействительна. Если вы хотите восстановить пароль, инициируйте эту процедуру заново."
          }
        </span>
      </div>
      <Error />
      <CustomButton
        buttonName={"Вернуться к авторизации"}
        onClick={handleReturn}
      />
    </>
  );
};

export default ResetError;
