/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TransactionData {
  trx_date: number;
  trx_by: string;
  transaction_id: string;
  trx_mode: string;
  trx_type: string;
  amount: number;
  balance: number;
  remarks?: any;
}
