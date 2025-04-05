import { z } from "zod";

export const formSchema = z
  .object({
    TariffName: z.string().min(2, {
      message: "Tariff name must be at least 2 characters.",
    }),
    InterestRate: z.coerce
      .number()
      .min(0, {
        message: "Interest rate must be a positive number.",
      })
      .max(100, {
        message: "Interest rate cannot exceed 100%.",
      }),
    MinAmount: z.coerce.number().positive({
      message: "Minimum amount must be greater than 0.",
    }),
    MaxAmount: z.coerce.number().positive({
      message: "Maximum amount must be greater than 0.",
    }),
    MaxTerm: z.coerce.number().int().positive({
      message: "Maximum term must be a positive integer.",
    }),
    LatePaymentPenalty: z.coerce
      .number()
      .min(0, {
        message: "Late payment penalty must be a positive number.",
      })
      .max(100, {
        message: "Late payment penalty cannot exceed 100%.",
      }),
    GracePeriod: z.coerce.number().int().min(0, {
      message: "Grace period must be a non-negative integer.",
    }),
  })
  .refine((data) => data.MaxAmount > data.MinAmount, {
    message: "Maximum amount must be greater than minimum amount.",
    path: ["MaxAmount"],
  });
