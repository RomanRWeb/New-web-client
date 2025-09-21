import type { Metadata } from "next";
import "../common/styles/normalize.scss";
import "../common/styles/global.scss";
import { Providers } from "@app/store/Providers";

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
        <body style={{ overflow: "hidden" }}>{children}</body>
      </Providers>
    </html>
  );
}
