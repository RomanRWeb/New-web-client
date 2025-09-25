import Reset from "@app/modules/auth/pages/reset";
import { Params } from "@app/data/types";

export async function generateStaticParams() {
  return [{ token: "1" }, { token: "2" }, { token: "3" }];
}

export default async function ResetPage({ params }: { params: Params }) {
  const { id } = await params;

  return <Reset token={id} />;
}
