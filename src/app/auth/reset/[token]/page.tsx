"use client";
import Reset from "@app/modules/auth/pages/reset";
import { usePathname } from "next/navigation";

export default function ResetPage() {
  const pathname = usePathname().split("/");

  return <Reset token={pathname[pathname.length - 1]} />;
}
