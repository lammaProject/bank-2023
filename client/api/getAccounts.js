import { token } from './token';
import { apiUrl } from '../url';

export async function getAccount() {
  const accounts = await fetch(`${apiUrl}/accounts`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const res = await accounts.json();
  return res;
}
