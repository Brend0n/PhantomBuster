import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PHANTOM_LOCAL_STORAGE } from './constants';
import { Dashboard } from './pages/Dashboard';


let localStorage: { [PHANTOM_LOCAL_STORAGE]: { [key: string]: string } };
let mockGetItem: jest.Mock<any>;
let mockSetItem: jest.Mock<any>;
let mockRemoveItem: jest.Mock<any>;

const renderDashboard = () => { render(<MemoryRouter><Dashboard /></MemoryRouter>); }

describe('dashboard', () => {
  beforeEach(() => {
    localStorage = { [PHANTOM_LOCAL_STORAGE]: {} };
    mockGetItem = jest.fn().mockImplementation((key: string,) => localStorage[PHANTOM_LOCAL_STORAGE][key]);
    mockSetItem = jest.fn().mockImplementation((key: string, value: any) => {
      localStorage[PHANTOM_LOCAL_STORAGE] = {
        [key]: value,
        ...localStorage[PHANTOM_LOCAL_STORAGE]
      }
    });
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: (...args: string[]) => mockGetItem(...args),
        setItem: (...args: string[]) => mockSetItem(...args),
        removeItem: (...args: string[]) => mockRemoveItem(...args),
      },
    });
  })

  it('should renders the dashboard with correct data', () => {
    const testPhantom = {
      id: '1234',
      name: 'myCustomPhantom',
      script: 'random description',
      manifest: { tags: { categories: ['cat1', 'cat2'] } }
    }
    window.localStorage.setItem(PHANTOM_LOCAL_STORAGE, JSON.stringify({ [testPhantom.id]: testPhantom }));
    renderDashboard();
    screen.getByText(testPhantom.name);
    expect(screen.getByText(testPhantom.name)).toBeDefined();
  });
});

