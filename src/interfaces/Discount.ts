export interface IDiscount {
  id: string;
  name: string;
  description: string;
  remaining_amount: number;
  time_begin: number;
  time_end: number;
  value: number;
  code: string;
  enabled: boolean;
}

export const DiscountInitialValue: IDiscount = {
  id: 'cc0f0e6c-9679-4381-8345-631a4404e2fa',
  name: 'Discount 12%',
  description: 'Discount all by 12%',
  remaining_amount: 97,
  time_begin: 1007769600000,
  time_end: 1670457600000,
  value: 12.0,
  code: '1234',
  enabled: true,
};
