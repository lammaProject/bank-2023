import { token } from './token';
import { apiUrl } from '../url';
import { errorApi } from '../error/errorApi';

export async function banks() {
  try {
    const accounts = await fetch(`${apiUrl}/banks`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const res = await accounts.json();
    return res;
  } catch (err) {
    console.log(err, 'banks.js');
    document.body.innerHTML = '';
    document.body.append(errorApi());
  }
}
