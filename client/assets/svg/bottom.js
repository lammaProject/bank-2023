/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';

export const bottomIcon = el('svg.bottom__icon');
bottomIcon.innerHTML += `
<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0.5L5 5.5L10 0.5H0Z" fill="#182233"/>
</svg>
`;

// export const bottomIconSvg = svg({
//   width: 24,
//   height: 22,
//   viewBox: '0 0 24 22',
//   xmlns: 'http://www.w3.org/2000/svg',
// }, [
//   el('path', {
//     d: 'M7 8.5L12 13.5L17 8.5H7Z',
//     fill: '#182233',
//   }),
// ]);
