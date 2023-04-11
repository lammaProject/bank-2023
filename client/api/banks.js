import { token } from './token';
import { apiUrl } from '../url';

export async function banks() {
  const accounts = await fetch(`${apiUrl}/banks`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const res = await accounts.json();
  return res;
}
