import ManagerEdit from "@app/modules/home/pages/manager-edit";
import { fakeManagers } from "@app/data/mocks";
import { Params } from "@app/data/types";

export async function generateStaticParams() {
  return fakeManagers.map((manager) => {
    return { id: manager.id };
  });
}

export default async function ManagerEditPage({ params }: { params: Params }) {
  const { id } = await params;
  return <ManagerEdit managerId={id} />;
}
