interface CreateUserDto {
  Surname: string;
  Name: string;
  Patronymic: string;
  PhoneNumber: string;
  BirthDate: string;
  Address: string;
  PassportSeries: string;
  PassportNumber: string;
  Snils: string;
  UserType: "User" | "Worker";
}

interface UserSettings {
  theme: "light" | "dark";
  hideBalance: boolean;
}

type UserGuid = string;

interface User {
  UserGuid: UserGuid;
  Surname: string;
  Name: string;
  Patronymic: string;
  PhoneNumber: string;
  BirthDate: string;
  Address: string;
  PassportSeries: string;
  PassportNumber: string;
  Snils: string;
}

type Currency = "RUB" | "USD" | "EUR";

interface Account {
  AccountGuid: string;
  AccountState: "Открыт" | "Закрыт";
  Account: string;
  Currency: Currency;
  Balance: number;
}

type AccountOperation = {
  OperationDate: string;
  Amount: number;
} & (
  | {
      OperationType: "Пополнение";
      Where: string;
    }
  | {
      OperationType: "Снятие";
      From: string;
    }
);

interface AccountInfo extends Account {
  AccountOperations: AccountOperation[];
}

interface CreditTariff {
  TariffGuid: string;
  TariffName: string;
  InterestRate: number;
  MinAmount: number;
  MaxAmount: number;
  MaxTerm: number;
  LatePaymentPenalty: number;
  GracePeriod: number;
}

interface Credit {
  CreditGuid: string;
  Date: string;
  TariffName: string;
  Currency: "RUB";
  Amount: number;
  AmountWithPercent: number;
  IsClosed: boolean;
}

interface Error {
  error: string;
}

type ApiResponse<T> =
  | ({ success: true } & import("@siberiacancode/fetches").FetchesResponse<T>)
  | ({
      success: false;
    } & { error: import("@siberiacancode/fetches").FetchesResponse<Error> });
