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
  id: '',
  name: '',
  description: '',
  remaining_amount: 97,
  time_begin: 1007769600000,
  time_end: 1670457600000,
  value: 12.0,
  code: '',
  enabled: true,
};
