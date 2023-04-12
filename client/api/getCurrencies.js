import { token } from './token';
import { apiUrl } from '../url';
import { errorApi } from '../error/errorApi';

export async function getCurrencies() {
  try {
    const accounts = await fetch(`${apiUrl}/currencies`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const res = await accounts.json();
    return res;
  } catch (err) {
    console.log(err, 'getCurrencies.js');
    document.body.innerHTML = '';
    document.body.append(errorApi());
  }
}
