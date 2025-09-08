import React from "react";
import {Logo} from "@/common/components/Icons/Logo";
import info from "../../package.json"
import "../../common/styles/pages/auth/auth.scss"
import "../../common/styles/global.scss"

export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const version = info.version

    return (
        <div className={"Background"}>
            <main className={"Modal"}>
                <header className={"AuthHeader"}>
                    <Logo/>
                    <span>
                        <div>
                            <b>{"VGL Control"}</b>
                        </div>
                        <div>
                            <span>{"Версия " + version}</span>
                        </div>
                    </span>

                </header>
                {children}
            </main>
        </div>
    )
}
