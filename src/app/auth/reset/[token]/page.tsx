import Reset from "@app/modules/auth/pages/reset";
import { ParamsToken } from "@app/data/types";

export async function generateStaticParams() {
  return [{ token: "1" }, { token: "2" }, { token: "3" }];
}

export default async function ResetPage({ params }: { params: ParamsToken }) {
  const { token } = await params;

  return <Reset token={token} isFailed={token === "1"} />;
}
