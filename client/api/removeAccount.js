import axios from 'axios';
import { token } from './token';
import { apiUrl } from '../url';
import { errorApi } from '../error/errorApi';

export async function removeAccount(id) {
  try {
    axios.post(
      `${apiUrl}/create-account/delete`,
      {
        id,
      },
      {
        headers: { Authorization: `Basic ${token}` },
      },
    );
  } catch (err) {
    console.log(err, 'postCurrencyBuy.js');
    document.body.innerHTML = '';
    document.body.append(errorApi());
  }
}
