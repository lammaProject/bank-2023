import { token } from './token';
import { apiUrl } from '../url';
import { getCardId } from '../utils';
import { errorApi } from '../error/errorApi';

export async function getAccountId() {
  try {
    const accounts = await fetch(`${apiUrl}/account/${getCardId}`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const res = await accounts.json();
    return res;
  } catch (err) {
    console.log(err, 'getAccountid.js');
    document.body.innerHTML = '';
    document.body.append(errorApi());
  }
}
