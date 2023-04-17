/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-dupe-else-if */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import axios from 'axios';
import { apiUrl } from '../../url';
import { getImg } from '../../header/header';
import { mainload } from '../../app.js';

function load() {
  const loader = el('svg.loader__change--profile');
  loader.innerHTML += `
  <svg width="64" height="65" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32.5" r="31" stroke="#116ACC" stroke-width="2"/>
  <mask id="path-2-inside-1_1_694" fill="white">
    <path d="M64 32.5C64 36.7023 63.1723 40.8635 61.5641 44.7459C59.956 48.6283 57.5989 52.1559 54.6274 55.1274C51.6559 58.0989 48.1283 60.456 44.2459 62.0641C40.3634 63.6723 36.2023 64.5 32 64.5V62.5001C35.9397 62.5001 39.8408 61.7241 43.4805 60.2164C47.1203 58.7088 50.4275 56.499 53.2132 53.7132C55.999 50.9275 58.2088 47.6203 59.7164 43.9805C61.2241 40.3408 62.0001 36.4397 62.0001 32.5H64Z"/>
  </mask>
  <path d="M64 32.5C64 36.7023 63.1723 40.8635 61.5641 44.7459C59.956 48.6283 57.5989 52.1559 54.6274 55.1274C51.6559 58.0989 48.1283 60.456 44.2459 62.0641C40.3634 63.6723 36.2023 64.5 32 64.5V62.5001C35.9397 62.5001 39.8408 61.7241 43.4805 60.2164C47.1203 58.7088 50.4275 56.499 53.2132 53.7132C55.999 50.9275 58.2088 47.6203 59.7164 43.9805C61.2241 40.3408 62.0001 36.4397 62.0001 32.5H64Z" stroke="#B3CEE2" stroke-width="4" mask="url(#path-2-inside-1_1_694)"/>
</svg>
  `;
  return loader;
}

export function profileCard() {
  // loader
  document.body.prepend(mainload());

  const imgObj = {};
  const h1 = el('h1.profileCard__h1', 'Изменить фото профиля');
  const img = el('img.profileCard__img');
  const circle = el('div.profileCard__circle', load());
  const control = el('input.profileCard__control', {
    type: 'range', min: '50', max: '100', value: '50',
  });
  const divImg = el('div.profileCard__divImg', circle, control);
  const saveImg = el('button.profileCard__saveImg', 'Сохранить измения');
  const addImg = el('input#addImg.profileCard__addImg', { type: 'file', accept: 'image/*' });
  const label = el('label.label-cast', { for: 'addImg' }, 'Добавить');
  const divCost = el('div.divCost', label, addImg);
  const divBottom = el('div.profileCard__divBottom', divCost, saveImg);

  getImg().then((res) => {
    if (res.payload.src) {
      circle.lastElementChild.remove();
      const srcImg = Buffer.from(res.payload.src).toString();
      img.src = srcImg;
      img.style.transform = `scale(${res.payload.transform})`;
      img.style.left = `${res.payload.left}`;
      img.style.top = `${res.payload.top}`;
      if (res.payload.transform) control.value = res.payload.transform * 50;
      circle.append(img);
      document.body.firstElementChild.remove();
    }
  });

  addImg.addEventListener('change', (ev) => {
    function previewImage(event) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const output = document.querySelector('.profileCard__img');
        output.src = e.target.result;
        output.style.transform = 'scale(1)';
        control.value = 50;

        const buffer = Buffer.from(e.target.result);
        imgObj.src = buffer;
      };
      reader.readAsDataURL(event.target.files[0]);
    }

    previewImage(ev);
  });
  control.addEventListener('input', () => {
    const { value } = control;
    const scale = value / 50;
    img.style.transform = `scale(${scale})`;
    imgObj.transform = scale;

    if (Number(img.getBoundingClientRect().width.toString().slice(0, 2)) < Math.abs(Number(img.style.left.split('%')[0]))) {
      img.style.top = '0%';
      img.style.left = '0%';
    }
  });

  let isDragging = false;
  let startX; let
    startY;

  img.addEventListener('click', (e) => {
    isDragging = !isDragging;
    startX = e.clientX - divImg.offsetLeft;
    startY = divImg.offsetHeight;
    img.style.left = `${img.style.left}`;
    img.style.top = `${img.style.top}`;
  });

  divImg.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const clX = e.clientX;
      const clY = e.clientY;
      const x = clX - startX;
      const y = clY - startY;

      img.style.left = `${x}%`;
      img.style.top = `${y}%`;

      if (img.getBoundingClientRect().bottom < divImg.getBoundingClientRect().bottom) {
        if (String((control.value / 50)).length === 3) {
          img.style.top = `-${String((control.value / 50)).slice(-1)}${String((control.value / 50)).slice(0, 1)}%`;
        } else {
          img.style.top = `-${(control.value / 50).toString().split('.')[1]}%`;
        }
      }
      if (img.style.transform.includes('scale(1)') && y < 0) {
        img.style.top = '0%';
      }

      if (img.getBoundingClientRect().top > divImg.getBoundingClientRect().top) {
        img.style.top = '0%';
      }
      if (img.style.transform.includes('scale(1)') && x < 0) {
        img.style.left = '0%';
      }

      if (-(control.value / 50).toString().split('.')[1] > x) {
        if (String((control.value / 50)).length === 3) {
          if (`${-(control.value / 50).toString().split('.')[1]}${(control.value / 50).toString().split('.')[0]}` > x) {
            img.style.left = `-${String((control.value / 50)).slice(-1)}${String((control.value / 50)).slice(0, 1)}%`;
          }
        } else {
          img.style.left = `${-(control.value / 50).toString().split('.')[1]}%`;
        }
      }
      if (x > 0) {
        img.style.left = '0%';
      } if (x < -100 && img.style.transform.includes('scale(2')) {
        img.style.left = '-100%';
      }
      imgObj.left = img.style.left;
      imgObj.top = img.style.top;
    }
  });

  saveImg.addEventListener('click', async () => {
    async function postImg(src, transform, left, top) {
      await axios.post(
        `${apiUrl}/profileImg`,

        {
          src,
          transform,
          left,
          top,
        },

      );

      document.location.reload();
    }
    postImg(imgObj.src, imgObj.transform, imgObj.left, imgObj.top);
  });

  const divTop = el('div.profileCard__divTop', h1);
  const container = el('div.profileCard__container', divTop, divImg, divBottom);
  return container;
}
