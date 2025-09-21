import React from "react";
import HomeStructure from "../../modules/home/components/home-structure";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HomeStructure>{children}</HomeStructure>;
}
