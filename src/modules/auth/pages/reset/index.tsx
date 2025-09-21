"use client";
import React, { useEffect, useState } from "react";
import ResetForm from "@app/modules/auth/views/reset-main";
import "@app/common/styles/pages/auth/reset.scss";
import ResetError from "@app/modules/auth/views/reset-error";
import ResetSuccess from "@app/modules/auth/views/reset-success";

interface Props {
  token: string;
}

const Reset: React.FC<Props> = ({ token }) => {
  useEffect(() => {
    if (token === "1") {
      //fixme
      setIsFailed(true);
    } else {
      setIsFailed(false);
    }
  }, [token]);

  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [formComplete, setFormComplete] = useState<boolean>(false);

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
