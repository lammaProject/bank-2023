import { apiUrl } from '../url';
import { token } from './token';

export async function createAccount() {
  const create = await fetch(`${apiUrl}/create-account`, {
    method: 'post',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const res = await create.json();
  return res;
}
