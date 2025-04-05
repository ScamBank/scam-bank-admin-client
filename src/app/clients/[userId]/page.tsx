import { getUserAccounts } from "@/utils/api/requests/get/account";
import { AccountsTable } from "./(components)";
import { notFound } from "next/navigation";

const UserPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

  const accountsResponse = await getUserAccounts({
    params: { UserGuid: userId },
  });

  if (!accountsResponse.success) return notFound();

  return (
    <main className="my-6 mx-auto xl:w-2/3">
      <AccountsTable accounts={accountsResponse.data} />
    </main>
  );
};

export default UserPage;
