import { instance } from "@/utils/api/instance";

interface CreateTariffBody {
  TariffName: string;
  InterestRate: number;
  MinAmount: number;
  MaxAmount: number;
  MaxTerm: number;
  LatePaymentPenalty: number;
  GracePeriod: number;
}

export const postCreateTariff = async (body: CreateTariffBody) =>
  instance.post<unknown, ApiResponse<{}>>(
    "/credit1c/kondakov_patterns_credit/hs/BankSystem/CreateTariff",
    body,
  );
