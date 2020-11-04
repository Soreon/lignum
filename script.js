import Lignum from './lignum.js';

const data = [
  {
    id: 'test1',
    name: 'TestTestTestTestTestTestTest 1',
    img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3',
    open: true,
    checkboxState: 'unchecked',
    data: {
      test1: 'dazudhaz',
      test2: 321654
    },
    children: [
      {
        id: 'test1.1',
        name: 'Test 1.1',
        open: true,
        img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3',
        children: [
          {
            id: 'test1.1.1',
            name: 'TestTestTestTestTestTestTest 1.1.1',
            children: [
              { id: 'test1.1.1.1', hidden: true, name: 'Test 1.1.1.1', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { id: 'test1.1.1.2', name: 'Test 1.1.1.2', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { id: 'test1.1.1.3', name: 'Test 1.1.1.3', children: [] },
              { id: 'test1.1.1.4', name: 'Test 1.1.1.4', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { id: 'test1.1.1.5', name: 'Test 1.1.1.5', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
              { id: 'test1.1.1.6', name: 'Test 1.1.1.6', children: [], img: 'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' },
            ],
          },
          { id: 'test1.1.2', name: 'Test 1.1.2', open: true, children: [
            { id: 'test1.1.2.1', hidden: true, name: 'Test 1.1.2.1', children: [] },
            { id: 'test1.1.2.2', hidden: true, name: 'Test 1.1.2.2', children: [] },
            { id: 'test1.1.2.3', hidden: true, name: 'Test 1.1.2.3', children: [] },
            { id: 'test1.1.2.4', hidden: true, name: 'Test 1.1.2.4', children: [] },
            { id: 'test1.1.2.5', hidden: true, name: 'Test 1.1.2.5', children: [] },
          ] },
          { id: 'test1.1.3', name: 'Test 1.1.3', children: [] },
          { id: 'test1.1.4', name: 'Test 1.1.4', children: [] },
          { id: 'test1.1.5', name: 'Test 1.1.5', children: [] },
          { id: 'test1.1.6', name: 'Test 1.1.6', children: [] },
        ],
      },
      { id: 'test1.2', name: 'Test 1.2', children: [] },
      { id: 'test1.3', name: 'Test 1.3', children: [] },
      { id: 'test1.4', name: 'Test 1.4', children: [] },
      { id: 'test1.5', name: 'Test 1.5', children: [] },
      { id: 'test1.6', name: 'Test 1.6', children: [] },
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
  {
    id: 'test3', name: 'Test 3', children: [
      { id: 'test3.1', name: 'Test 3.1', children: [] },
      { id: 'test3.2', name: 'Test 3.2', children: [] },
      { id: 'test3.3', name: 'Test 3.3', children: [] },
      { id: 'test3.4', name: 'Test 3.4', children: [] },
      { id: 'test3.5', name: 'Test 3.5', children: [] },
      { id: 'test3.6', name: 'Test 3.6', children: [] },
      { id: 'test3.7', name: 'Test 3.7', children: [] },
      { id: 'test3.8', name: 'Test 3.8', children: [] },
      {
        id: 'test3.9', name: 'Test 3.9', children: [
          { id: 'test3.9.1', name: 'Test 3.9.1', children: [] },
          { id: 'test3.9.2', name: 'Test 3.9.2', children: [] },
          { id: 'test3.9.3', name: 'Test 3.9.3', children: [] },
          { id: 'test3.9.4', name: 'Test 3.9.4', children: [] },
          { id: 'test3.9.5', name: 'Test 3.9.5', children: [] },
          { id: 'test3.9.6', name: 'Test 3.9.6', children: [] },
          { id: 'test3.9.7', name: 'Test 3.9.7', children: [] },
          { id: 'test3.9.8', name: 'Test 3.9.8', children: [] },
          { id: 'test3.9.9', name: 'Test 3.9.9', children: [] },
        ]
      },
    ]
  },
];

const options = {
  checkbox: true,
  labelClick: 'toggleWrap',
  disableButtonIfAllChildrenHidden: true,
};

const lig = new Lignum('#container', options, data);
window.lig = lig;
