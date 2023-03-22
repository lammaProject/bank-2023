import axios from 'axios';
import { token } from './token';
import { apiUrl } from '../url';

export async function transferFunds(from, to, amount) {
  const res = await axios.post(
    `${apiUrl}/transfer-funds`,
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
