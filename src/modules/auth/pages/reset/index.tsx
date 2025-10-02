"use client";
import React, { useState } from "react";
import ResetForm from "@app/modules/auth/views/reset-main";
import "@app/common/styles/pages/auth/reset.scss";
import ResetError from "@app/modules/auth/views/reset-error";
import ResetSuccess from "@app/modules/auth/views/reset-success";

interface Props {
  token: string;
  isFailed: boolean;
}

const Reset: React.FC<Props> = ({ token, isFailed }) => {
  const [formComplete, setFormComplete] = useState<boolean>(false);
  console.log(token);

  return (
    <div className={"reset-wrapper"}>
      {!isFailed ? (
        !formComplete ? (
          <ResetForm onSubmit={() => setFormComplete(true)} />
        ) : (
          <ResetSuccess />
        )
      ) : (
        <ResetError />
      )}
    </div>
  );
};

export default Reset;
