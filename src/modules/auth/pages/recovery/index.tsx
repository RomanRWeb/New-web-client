"use client";
import "@app/common/styles/pages/auth/recovery.scss";
import { useState } from "react";
import RecoveryMain from "@app/modules/auth/views/recovery-main";
import RecoverySend from "@app/modules/auth/views/recovery-send";

const Recovery = () => {
  const [linkSend, setLinkSend] = useState<boolean>(false);

  return (
    <>
      {!linkSend ? (
        <RecoveryMain onSend={() => setLinkSend(true)} />
      ) : (
        <RecoverySend />
      )}
    </>
  );
};

export default Recovery;
