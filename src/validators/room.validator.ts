import { z } from "zod";

export const roomCategoryValidator = z.object({
  roomType: z.enum(["STANDARD", "DELUXE", "LUXE"]),
  hotelId: z.number(),
  price: z.number(),
  roomCount: z.number(),
});
