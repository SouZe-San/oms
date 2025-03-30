//^ TODO: Use this for ADMIN also

import { z } from "zod";

// --------------------------------------------------------------------------------------------

// ! CUSTOMER - PART

export const getProduct_reqSchema = z.object({
  skipCount: z.number().int().nonnegative("skipCount should be >= 0").default(0).optional(),
  takeCount: z.number().int().positive("takeCount must be positive").default(10).optional(),
});
