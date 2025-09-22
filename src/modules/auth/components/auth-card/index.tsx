import { Logo } from "@app/common/components/images/Logo";
import React from "react";
import info from "../../../../../package.json";
import "@app/common/styles/pages/auth/auth.scss";

export default function AuthCard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const version = info.version;

  return (
    <div className={"background"}>
      <main className={"modal"}>
        <header className={"auth-header"}>
          <Logo />
          <div className={"auth-text"}>
            <b>{"VGL Control"}</b>
            <span>{"Версия " + version}</span>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
