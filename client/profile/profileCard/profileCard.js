/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import axios from 'axios';
import { apiUrl } from '../../url';
import { getImg } from '../../header/header';

export function profileCard() {
  const imgObj = {};
  const h1 = el('h1.profileCard__h1', 'Изменить фото профиля');
  const btnClose = el('button.profileCard__btnClose', 'X');
  const img = el('img.profileCard__img');
  getImg().then((res) => {
    if (res) {
      img.src = res.payload.src;
    //   img.style.transform = `scale(${res.payload.transform})`;
    //   img.style.left = `${res.payload.left}%`;
    }
  });
  const circle = el('div.profileCard__circle', img);
  const control = el('input.profileCard__control', {
    type: 'range', min: '50', max: '100', value: '50',
  });
  const divImg = el('div.profileCard__divImg', circle, control);
  const saveImg = el('button.profileCard__saveImg', 'SAVE IMG');

  const addImg = el('input.profileCard__addImg', { type: 'file', accept: 'image/*' });
  addImg.addEventListener('change', (ev) => {
    function previewImage(event) {
      const reader = new FileReader();
      console.log(reader);
      reader.onload = () => {
        const output = document.querySelector('.profileCard__img');
        output.src = reader.result;
        imgObj.src = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }

    previewImage(ev);
  });
  control.addEventListener('input', () => {
    const { value } = control;
    const scale = value / 50;
    console.log(scale);
    img.style.transform = `scale(${scale})`;
    imgObj.transform = scale;
  });

  let isDragging = false;
  let startX; let
    startY;
  let open;

  img.addEventListener('click', (e) => {
    isDragging = !isDragging;
    startX = e.clientX - divImg.offsetLeft;
    img.style.left = `${open}%`;
  });

  divImg.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const clX = e.clientX;
      const x = clX - startX;
      img.style.left = `${open}%`;
      open = x;
      imgObj.left = open;
    }
  });

  saveImg.addEventListener('click', async () => {
    async function postImg(src, transform, left) {
      await axios.post(
        `${apiUrl}/profileImg`,

        {
          src,
          transform,
          left,
        },

      );

      document.location.reload();
    }
    postImg(imgObj.src, imgObj.transform, imgObj.left);
    // localStorage.setItem('profileImg', JSON.stringify(imgObj));
  });

  const divTop = el('div.profileCard__divTop', h1, addImg, btnClose, divImg, saveImg);
  const container = el('div.profileCard__container', divTop);
  return container;
}
