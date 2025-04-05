import { getUsers } from "@/utils/api/requests/get";
import { ClientCard, CreateUserForm } from "./(components)";
import { cookies } from "next/headers";

const ClientsPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value!;
  const users = await getUsers({
    config: {
      headers: {
        Authorization: token,
      },
    },
  });

  return (
    <main className="py-6 flex justify-evenly">
      <div className="relative w-full max-w-lg">
        <CreateUserForm />
      </div>
      <ul className="flex flex-col gap-4 ">
        {users.success &&
          users.data.map((user, index) => (
            <li key={index}>
              <ClientCard user={user} />
            </li>
          ))}
      </ul>
    </main>
  );
};

export default ClientsPage;
