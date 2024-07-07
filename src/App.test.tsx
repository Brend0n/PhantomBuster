import { render, screen } from '@testing-library/react';
import { PHANTOM_LOCAL_STORAGE } from './constants';
import { Dashboard } from './Dashboard';

const localStorageMock = (function () {
  let store: { [key: string]: any } = {}
  return {
    getItem: function (key: string) {
      return store[key] || null
    },
    setItem: function (key: string, value: string) {
      store[key] = JSON.stringify(value)
    },
    clear: function () {
      store = {}
    }
  }
})()

let localStorage: { [key: string]: string };
let getItemMock;
let setItemMock;
describe('dashboard', () => {

  beforeEach(() => {
    localStorage = {};
    getItemMock = jest.spyOn(window.localStorage, 'getItem').mockImplementation((key) =>
      key in localStorage ? localStorage[key] : null
    );
    setItemMock = jest.spyOn(window.localStorage, 'setItem').mockImplementation(
      (key, value) => (localStorage[key] = value + '')
    );
  });

  it('should renders the dashboard with correct data', () => {
    const testPhantom = {
      id: '1234',
      name: 'myCustomPhantom',
      script: 'random description',
      manifest: { tags: { categories: ['cat1', 'cat2'] } }
    }
    window.localStorage.setItem(PHANTOM_LOCAL_STORAGE, JSON.stringify({ [testPhantom.id]: testPhantom }));
    render(<Dashboard />);
    screen.getByText(testPhantom.name);
    expect(screen.getByText(testPhantom.name)).toBeDefined();
  });
});

