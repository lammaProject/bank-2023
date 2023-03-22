import { token } from './token';
import { apiUrl } from '../url';

export async function getAllCurriences() {
  const accounts = await fetch(`${apiUrl}/all-currencies`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const res = await accounts.json();
  return res;
}
