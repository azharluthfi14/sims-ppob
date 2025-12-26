import z from 'zod';

export const listBannerSchema = z.object({
  banner_name: z.string(),
  banner_image: z.string(),
  description: z.string(),
});

export const servicesSchema = z.object({
  service_code: z.string(),
  service_name: z.string(),
  service_icon: z.string(),
  service_tariff: z.number(),
});

export type Banner = z.infer<typeof listBannerSchema>;
export type Service = z.infer<typeof servicesSchema>;
