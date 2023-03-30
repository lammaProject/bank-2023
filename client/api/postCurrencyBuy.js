import axios from 'axios';
import { token } from './token';
import { apiUrl } from '../url';

export async function postCurrencyBuy(from, to, amount) {
  const res = await axios.post(
    `${apiUrl}/currency-buy`,
    {
      from,
      to,
      amount,
    },
    {
      headers: { Authorization: `Basic ${token}` },
    },
  );
  const transfer = res;
  return transfer.data;
}
