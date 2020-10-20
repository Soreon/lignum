import Lignum from './lignum.js';

const data = [
  {
    name: 'SanefSig',
    img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3',
    children: [
      {
        name: 'Image container',
        img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3',
        children: [
          {
            name: 'SanefSig',
            children: [
              { name: 'SanefSig', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { name: 'SanefSig', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { name: 'SanefSig', children: [] },
              { name: 'SanefSig', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { name: 'SanefSig', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { name: 'SanefSig', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
            ],
          },
          { name: 'SanefSig', children: [] },
          { name: 'SanefSig', children: [] },
          { name: 'SanefSig', children: [] },
          { name: 'SanefSig', children: [] },
          { name: 'SanefSig', children: [] },
        ],
      },
      { name: 'SanefSig', children: [] },
      { name: 'SanefSig', children: [] },
      { name: 'SanefSig', children: [] },
      { name: 'SanefSig', children: [] },
      { name: 'SanefSig', children: [] },
    ],
  },
  {
    name: 'Sextan',
    children: [
      { name: 'Sextan', children: [] },
      { name: 'Sextan', children: [] },
      { name: 'Sextan', children: [] },
      { name: 'Sextan', children: [] },
      { name: 'Sextan', children: [] },
      { name: 'Sextan', children: [] },
      { name: 'Sextan', children: [] },
      { name: 'Sextan', children: [] },
      { name: 'Sextan', children: [] },
    ],
  },
];

const options = {
  checkbox: true,
  labelClick: 'toggleWrap',
};

const container = document.getElementById('container');
const lig = new Lignum(container, options, data);
