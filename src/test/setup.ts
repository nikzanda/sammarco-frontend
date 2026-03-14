import '@testing-library/jest-dom/vitest';

// Mock window.matchMedia (required by Ant Design responsive observer)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock ResizeObserver (required by Ant Design rc-resize-observer)
global.ResizeObserver = class ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
};

// Mock getComputedStyle for pseudo-elements (jsdom limitation)
const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = (elt: Element, pseudoElt?: string | null) => {
  if (pseudoElt) {
    return {} as CSSStyleDeclaration;
  }
  return originalGetComputedStyle(elt);
};
