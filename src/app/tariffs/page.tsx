import { getCreditTariffs } from "@/utils/api/requests/get";
import { CreateTariffForm, CreditTariffCard } from "./(components)";
import { cookies } from "next/headers";

const TariffsPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value!;
  const tariffsResponse = await getCreditTariffs({
    config: {
      headers: {
        Authorization: token,
      },
    },
  });

  return (
    <main className="py-6 flex justify-evenly">
      <div className="relative w-full max-w-lg">
        <CreateTariffForm />
      </div>
      <ul className="flex flex-col gap-4 ">
        {tariffsResponse.success &&
          tariffsResponse.data.map((tariff, index) => (
            <li key={index}>
              <CreditTariffCard tariff={tariff} withButton={false} />
            </li>
          ))}
      </ul>
    </main>
  );
};

export default TariffsPage;
