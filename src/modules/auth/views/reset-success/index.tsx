"use client";
import { useCallback } from "react";
import { CustomButton } from "@app/common/components/custom-button/CustomButton";
import { redirect } from "next/navigation";
import { Success } from "@app/common/components/images/Success";

const ResetSuccess = () => {
  const handleReturn = useCallback(() => {
    console.log("redirect button clicked");
    redirect("/auth/sign-in");
  }, []);

  return (
    <>
      <div>
        <h1>{"Пароль обновлен"}</h1>
        <span>
          {
            "Ваш пароль обновлен. Теперь вы можете войти в систему с новым паролем"
          }
        </span>
      </div>
      <Success />
      <CustomButton
        buttonName={"Вернуться к авторизации"}
        onClick={handleReturn}
      />
    </>
  );
};

export default ResetSuccess;
