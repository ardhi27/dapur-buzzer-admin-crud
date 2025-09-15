import * as z from "zod";

/**
 * Schema for Validation User's Data.
 */
export const InfluencerRegisterSchema = z.object({
  userName: z.string().min(1, "Username harus ada!"),
  fullName: z
    .string()
    .min(1, "Fullname harus ada!")
    .max(100, "Fullname maksimal 100 karakter"),
  followers: z.number().nonnegative("Followers tidak boleh negatif"),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
  picture: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file ||
        (file instanceof File &&
          ["image/jpeg", "image/png", "image/jpg"].includes(file.type)),
      "File harus berupa gambar (jpg/png)"
    ),
});

export type InfluencerRegisterData = z.infer<typeof InfluencerRegisterSchema>;

/**
 * Schema for User's Data
 */
export const InfluencerInformationSchema = InfluencerRegisterSchema.omit({
  role: true,
}).extend({
  id: z.int(),
  createdAt: z.string(),
});

/**
 * Type for User's Data Information
 */
export type InfluencerInformation = z.infer<typeof InfluencerInformationSchema>;
