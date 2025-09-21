import React from "react";
import "@app/common/styles/pages/auth/auth.scss";
import AuthCard from "@app/modules/auth/components/auth-card";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthCard>{children}</AuthCard>;
}
