import z from 'zod';

export const topUpSchema = z.object({
  top_up_amount: z
    .string()
    .min(1, 'Nominal wajib diisi')
    .refine((val) => /^\d+$/.test(val), {
      message: 'Nominal harus angka',
    })
    .refine((val) => Number(val) >= 10_000, {
      message: 'Minimum nominal top up 10.000',
    })
    .refine((val) => Number(val) <= 1_000_000, {
      message: 'Maksimum nominal top up 1.000.000',
    }),
});

export const paymentTransactionSchema = z.object({
  service_code: z.string().nullable(),
});

export const historyTransactionSchema = z.object({
  invoice_number: z.string(),
  transaction_type: z.string(),
  description: z.string(),
  total_amount: z.number(),
  created_on: z.string(),
});

export const historyTransactionResponse = z.object({
  offset: z.number(),
  limit: z.number(),
  records: z.array(historyTransactionSchema),
});

export type TopUpAmountFormInput = z.input<typeof topUpSchema>;
export type TopUpAmountPayload = z.output<typeof topUpSchema>;
export type PaymentTransactionPayload = z.infer<typeof paymentTransactionSchema>;

export type HistoryTransaction = z.infer<typeof historyTransactionResponse>;
export type Transaction = z.infer<typeof historyTransactionSchema>;
