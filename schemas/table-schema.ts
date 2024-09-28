import { z } from "zod";

export const tableSchema = z.object({
  group: z
    .string()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." })
    .trim(),
  performer: z
    .string()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." })
    .trim(),
  partnerName: z
    .string()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." })
    .trim(),
  partnerContact: z
    .string()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." })
    .trim(),
  request: z
    .string()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." })
    .trim(),
  response: z
    .string()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." })
    .trim(),
  requestSolutionDate: z.date(),
  solvingRequestInDays: z.number().nullable(),
  feedback: z
    .string()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." })
    .trim(),
  source: z
    .string()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." })
    .trim(),
  requestStatus: z
    .string()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." })
    .trim(),
  requestCreatedAt: z.date(),
});
