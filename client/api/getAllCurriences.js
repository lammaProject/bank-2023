import { token } from './token';
import { apiUrl } from '../url';
import { errorApi } from '../error/errorApi';

export async function getAllCurriences() {
  try {
    const accounts = await fetch(`${apiUrl}/all-currencies`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const res = await accounts.json();
    return res;
  } catch (err) {
    console.log(err, 'getAllCurriences.js');
    document.body.innerHTML = '';
    document.body.append(errorApi());
  }
}
