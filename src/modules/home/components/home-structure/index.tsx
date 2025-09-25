import React from "react";
import Sidebar from "@app/modules/home/components/sidebar";
import HomeHeader from "@app/modules/home/components/home-header";
import "@app/common/styles/pages/home/home.scss";

const HomeStructure = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={"home-layout"}>
      <Sidebar />
      <section className={"main-content"}>
        <HomeHeader />
        <div className={"content-wrapper"}>{children}</div>
      </section>
    </div>
  );
};

export default HomeStructure;
