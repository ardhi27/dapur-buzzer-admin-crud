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

/**
 * Schema for Update User'S Data
 */
export const InfluencerUpdateSchema = InfluencerRegisterSchema.pick({
  fullName: true,
  userName: true,
  followers: true,
  picture: true,
});

/**
 * Type for Updated User's Data Information.
 */
export type UpdatedInfluencerInformation = z.infer<
  typeof InfluencerUpdateSchema
>;

/**
 * Type for API Response.
 */
export type ApiResponse<T> = {
  data: T | null;
  error: string | any[] | null;
};

/**
 * Payload to update user.
 */
export type UpdateUserPayload = {
  userName?: string;
  fullName?: string;
  followers?: number;
  role?: string;
  picture?: string;
};
