import { token } from './token';
import { apiUrl } from '../url';
import { errorApi } from '../error/errorApi';

export async function getAccount() {
  try {
    const accounts = await fetch(`${apiUrl}/accounts`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const res = await accounts.json();
    return res;
  } catch (err) {
    console.log(err, 'getAccounts.js');
    document.innerHTML = '';
    document.body.append(errorApi());
  }
}
