/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';

function load() {
  const loader = el('svg.loader--profile');
  loader.innerHTML += `
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="31" stroke="#6B7280" stroke-width="2"/>
  <mask id="path-2-inside-1_1_698" fill="white">
  <path d="M64 32C64 36.2023 63.1723 40.3635 61.5641 44.2459C59.956 48.1283 57.5989 51.6559 54.6274 54.6274C51.6559 57.5989 48.1283 59.956 44.2459 61.5641C40.3634 63.1723 36.2023 64 32 64V62.0001C35.9397 62.0001 39.8408 61.2241 43.4805 59.7164C47.1203 58.2088 50.4275 55.999 53.2132 53.2132C55.999 50.4275 58.2088 47.1203 59.7164 43.4805C61.2241 39.8408 62.0001 35.9397 62.0001 32H64Z"/>
  </mask>
  <path d="M64 32C64 36.2023 63.1723 40.3635 61.5641 44.2459C59.956 48.1283 57.5989 51.6559 54.6274 54.6274C51.6559 57.5989 48.1283 59.956 44.2459 61.5641C40.3634 63.1723 36.2023 64 32 64V62.0001C35.9397 62.0001 39.8408 61.2241 43.4805 59.7164C47.1203 58.2088 50.4275 55.999 53.2132 53.2132C55.999 50.4275 58.2088 47.1203 59.7164 43.4805C61.2241 39.8408 62.0001 35.9397 62.0001 32H64Z" stroke="#D1D5DB" stroke-width="4" mask="url(#path-2-inside-1_1_698)"/>
  </svg>
    `;
  return loader;
}

export function errorApi() {
  const title = el('div.errorApi__title', 'Ошибка соеденения');
  const reload = el('svg');
  const tooltipCont = el('div.errorApi__tooltipCont', reload);
  reload.style.cursor = 'pointer';
  reload.innerHTML += `
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5C21.9939 18.0203 17.5203 22.4939 12 22.5ZM11 15.5V17.5H13V15.5H11ZM11 7.5V13.5H13V7.5H11Z" fill="#182233"/>
</svg>
  `;
  const tooltip = el('div.errorApi__tooltip', 'Перезагрузите');
  tooltipCont.addEventListener('mousemove', () => {
    tooltipCont.append(tooltip);
  });

  tooltipCont.addEventListener('mouseleave', () => {
    tooltipCont.lastElementChild.remove();
  });

  tooltipCont.addEventListener('click', () => { document.location.reload(); });

  const div = el('div.errorApi__div', title, tooltipCont);
  const container = el('div.errorApi__container', div, load());
  return container;
}
