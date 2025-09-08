import type {Metadata} from "next";
import "../common/styles/normalize.scss"
import {Providers} from "@/store/Providers";

export const metadata: Metadata = {
    title: "VGL prototype",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <Providers>
            <body>
            {children}
            </body>
        </Providers>
        </html>
    );
}
