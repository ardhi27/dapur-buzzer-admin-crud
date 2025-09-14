import Roles from "@/shared/const/role-enum";
import * as z from "zod";

/**
 * Influencer schema for validating user data.
 */
const InfluencerSchema = z.object({
  id: z.int(),
  fullName: z
    .string("Harap masukkan username")
    .min(1, "Username tidak boleh kosong"),
  userName: z.string(),
  role: z.enum([Roles.ADMIN, Roles.USER], "peran tidak valid"),
  photo: z.string("Silahkan input foto").min(1, "Foto tidak boleh kosong"),
});

/**
 * Type definition of influencer data
 */
type InfluencerData = z.infer<typeof InfluencerSchema>;

/**
 * Schema for input influencer data.
 */
const InfluencerRegisterSchema = InfluencerSchema.pick({
  fullName: true,
  userName: true,
  photo: true,
});

/**
 * Type definition of data credentials.
 */
type InfluencerRegisterData = z.infer<typeof InfluencerRegisterSchema>;

export { InfluencerSchema, InfluencerRegisterSchema };
export type { InfluencerData, InfluencerRegisterData };
