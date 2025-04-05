import { isValid, min, parse } from "date-fns";
import { z } from "zod";

export const formSchema = z.object({
  Name: z.string().min(2, "Имя должно содержать не менее 2 символов").max(50),
  Patronymic: z
    .string()
    .min(2, "Отчество должно содержать не менее 2 символов")
    .max(50),
  Surname: z
    .string()
    .min(2, "Фамилия должна содержать не менее 2 символов")
    .max(50),
  PhoneNumber: z
    .string()
    .regex(
      /^\+7-\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
      "Неверный формат телефонного номера",
    ),
  Snils: z
    .string()
    .regex(
      /^\d{3}-\d{3}-\d{3}\s\d{2}$/,
      "СНИЛС должен иметь формат XXX-XXX-XXX XX",
    ),
  passport: z
    .string()
    .regex(/^\d{4}\s\d{6}$/, "Паспорт должен иметь формат XXXX XXXXXX"),
  BirthDate: z
    .string({
      required_error: "Дата рождения обязательна",
    })
    .refine(
      (dateStr) => {
        const date = parse(dateStr, "dd.MM.yyyy", new Date());
        return isValid(date) && date < new Date();
      },
      {
        message:
          "Дата рождения должна быть действительной в прошлом (ДД.ММ.ГГГГ)",
      },
    ),
});
