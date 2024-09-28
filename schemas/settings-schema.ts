import { z } from "zod";

export const settingsSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." })
    .trim(),
});
