import Client from "@app/modules/home/pages/client";
import { clients } from "@app/data/mocks";
import { Params } from "@app/data/types";

export async function generateStaticParams() {
  return clients.map((client) => {
    return { id: client.id };
  });
}

export default async function ClientPage({ params }: { params: Params }) {
  const { id } = await params;

  return <Client clientId={id} />;
}
