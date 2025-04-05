import { getUsers } from "@/utils/api/requests/get";
import { ClientCard, CreateUserForm } from "./(components)";

const ClientsPage = async () => {
  const users = await getUsers();

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
