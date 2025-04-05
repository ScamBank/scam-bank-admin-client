import { getUserAccounts } from "@/utils/api/requests/get/account";
import { AccountsTable } from "./(components)";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

const UserPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value!;

  const accountsResponse = await getUserAccounts({
    params: { UserGuid: userId },
    config: {
      headers: {
        Authorization: token,
      },
    },
  });

  if (!accountsResponse.success) return notFound();

  return (
    <main className="my-6 mx-auto xl:w-2/3">
      <AccountsTable accounts={accountsResponse.data} />
    </main>
  );
};

export default UserPage;
