import * as z from "zod";

/**
 * Schema for Validation User's Data.
 */
export const InfluencerRegisterSchema = z.object({
  userName: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(50, "Username maksimal 50 karakter"),
  fullName: z
    .string()
    .min(3, "Fullname minimal 3 karakter")
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
