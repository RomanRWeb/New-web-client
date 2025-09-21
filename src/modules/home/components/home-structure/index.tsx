import React from "react";
import SideBar from "@app/modules/home/components/sidebar/SideBar";
import HomeHeader from "@app/modules/home/components/home-header/HomeHeader";
import "@app/common/styles/pages/home/home.scss";

const HomeStructure = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={"home-layout"}>
      <SideBar />
      <section className={"main-content"}>
        <HomeHeader />
        <div className={"content-wrapper"}>{children}</div>
      </section>
    </div>
  );
};

export default HomeStructure;
