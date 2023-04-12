import axios from 'axios';
import { token } from './token';
import { apiUrl } from '../url';
import { errorApi } from '../error/errorApi';

export async function transferFunds(from, to, amount) {
  try {
    const res = await axios.post(
      `${apiUrl}/transfer-funds`,
      {
        from,
        to,
        amount,
      },
      {
        headers: { Authorization: `Basic ${token}` },
      },
    );
    const transfer = res;
    return transfer.data;
  } catch (err) {
    console.log(err, 'transferFunds.js');
    document.body.innerHTML = '';
    document.body.append(errorApi());
  }
}
