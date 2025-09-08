import React from "react";
import SideBar from "@/common/components/SideBar/SideBar";
import HomeHeader from "@/common/components/HomeHeader/HomeHeader";
import '../../common/styles/pages/home/home.scss'
import "../../common/styles/global.scss"


export default function HomeLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={"HomeLayout"}>
            <SideBar/>
            <section className={"MainContent"}>
                <HomeHeader/>
                <div className={"ContentWrapper"}>
                    {children}
                </div>
            </section>
        </div>
    )
}
