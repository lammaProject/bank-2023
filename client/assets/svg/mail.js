/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';

export const mailIcon = el('svg');
mailIcon.innerHTML += `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z" fill="white"/>
</svg>
`;

export const darkMail = el('svg');
darkMail.innerHTML += `
<svg  viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842548 0.928533 -0.00101238 2 9.11911e-07H18C19.1046 9.11911e-07 20 0.895432 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z" fill="#182233"/>
</svg>
`;
