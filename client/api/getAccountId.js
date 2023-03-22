import { token } from './token';
import { apiUrl } from '../url';
import { getCardId } from '../utils';

export async function getAccountId() {
  const accounts = await fetch(`${apiUrl}/account/${getCardId}`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const res = await accounts.json();
  return res;
}
