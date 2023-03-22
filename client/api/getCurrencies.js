import { token } from './token';
import { apiUrl } from '../url';

export async function getCurrencies() {
  const accounts = await fetch(`${apiUrl}/currencies`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const res = await accounts.json();
  return res;
}
