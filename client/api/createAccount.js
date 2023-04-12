import { apiUrl } from '../url';
import { token } from './token';
import { errorApi } from '../error/errorApi';

export async function createAccount() {
  try {
    const create = await fetch(`${apiUrl}/create-account`, {
      method: 'post',
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const res = await create.json();
    return res;
  } catch (err) {
    console.log(err, 'createAccount.js');
    document.body.innerHTML = '';
    document.body.append(errorApi());
  }
}
