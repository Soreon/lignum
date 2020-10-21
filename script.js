import Lignum from './lignum.js';

const data = [
  {
    name: 'Test 1',
    img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3',
    children: [
      {
        name: 'Test 1.1',
        img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3',
        children: [
          {
            name: 'Test 1.1.1',
            children: [
              { name: 'Test 1.1.1.1', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { name: 'Test 1.1.1.2', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { name: 'Test 1.1.1.3', children: [] },
              { name: 'Test 1.1.1.4', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { name: 'Test 1.1.1.5', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { name: 'Test 1.1.1.6', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
            ],
          },
          { name: 'Test 1.1.2', children: [] },
          { name: 'Test 1.1.3', children: [] },
          { name: 'Test 1.1.4', children: [] },
          { name: 'Test 1.1.5', children: [] },
          { name: 'Test 1.1.6', children: [] },
        ],
      },
      { name: 'Test 1.2', children: [] },
      { name: 'Test 1.3', children: [] },
      { name: 'Test 1.4', children: [] },
      { name: 'Test 1.5', children: [] },
      { name: 'Test 1.6', children: [] },
    ],
  },
  {
    name: 'Test 2',
    children: [
      { name: 'Test 2.1', children: [] },
      { name: 'Test 2.2', children: [] },
      { name: 'Test 2.3', children: [] },
      { name: 'Test 2.4', children: [] },
      { name: 'Test 2.5', children: [] },
      { name: 'Test 2.6', children: [] },
      { name: 'Test 2.7', children: [] },
      { name: 'Test 2.8', children: [] },
      { name: 'Test 2.9', children: [] },
    ],
  },
];

const options = {
  checkbox: true,
  labelClick: 'toggleWrap',
};

const container = document.getElementById('container');
const lig = new Lignum(container, options, data);
