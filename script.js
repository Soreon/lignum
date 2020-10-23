import Lignum from './lignum.js';

const data = [
  {
    id: 'test1',
    name: 'Test 1',
    img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3',
    data: {
      test1: 'dazudhaz',
      test2: 321654
    },
    children: [
      {
        id: 'test1.1',
        name: 'Test 1.1',
        img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3',
        children: [
          {
            id: 'test1.1.1',
            name: 'Test 1.1.1',
            children: [
              { id: 'test1.1.1.1', hidden: true, name: 'Test 1.1.1.1', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { id: 'test1.1.1.2', name: 'Test 1.1.1.2', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { id: 'test1.1.1.3', name: 'Test 1.1.1.3', children: [] },
              { id: 'test1.1.1.4', name: 'Test 1.1.1.4', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { id: 'test1.1.1.5', name: 'Test 1.1.1.5', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { id: 'test1.1.1.6', name: 'Test 1.1.1.6', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
            ],
          },
          { id: 'test1.1.2', name: 'Test 1.1.2', children: [] },
          { id: 'test1.1.3', name: 'Test 1.1.3', children: [] },
          { id: 'test1.1.4', name: 'Test 1.1.4', children: [] },
          { id: 'test1.1.5', name: 'Test 1.1.5', children: [] },
          { id: 'test1.1.6', name: 'Test 1.1.6', children: [] },
        ],
      },
      { id:'test1.2', name: 'Test 1.2', children: [] },
      { id:'test1.3', name: 'Test 1.3', children: [] },
      { id:'test1.4', name: 'Test 1.4', children: [] },
      { id:'test1.5', name: 'Test 1.5', children: [] },
      { id:'test1.6', name: 'Test 1.6', children: [] },
    ],
  },
  {
    id: 'test2',
    name: 'Test 2',
    children: [
      { id: 'test2.1', name: 'Test 2.1', children: [] },
      { id: 'test2.2', name: 'Test 2.2', children: [] },
      { id: 'test2.3', name: 'Test 2.3', children: [] },
      { id: 'test2.4', name: 'Test 2.4', children: [] },
      { id: 'test2.5', name: 'Test 2.5', children: [] },
      { id: 'test2.6', name: 'Test 2.6', children: [] },
      { id: 'test2.7', name: 'Test 2.7', children: [] },
      { id: 'test2.8', name: 'Test 2.8', children: [] },
      { id: 'test2.9', name: 'Test 2.9', children: [] },
    ],
  },
];

const options = {
  checkbox: true,
  labelClick: 'toggleWrap',
};

const lig = new Lignum('#container', options, data);
