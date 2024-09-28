import { z } from "zod";

export const signInSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." })
    .trim(),
  password: z
    .string()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." })
    .trim(),
});
