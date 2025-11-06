import { z } from "zod";

export const roomValidator = z.object({
  roomNumber: z.number(),
  hotelId: z.number(),
  price: z.number(),
  roomType: z.enum(["STANDARD", "DELUXE", "LUXE"]),
});
