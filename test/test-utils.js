import React from 'react';
import { render } from 'react-testing-library';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import App from '../src/components/App';

const customRender = (node, options, initialState) => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const context = {
    insertCss: () => {},
    pathname: '',
    store: mockStore(initialState),
    query: {},
  };
  const rendered = render(<App context={context}>{node}</App>, options);
  return {
    ...rendered,
    rerender: newUi =>
      customRender(newUi, {
        container: rendered.container,
        baseElement: rendered.baseElement,
      }),
  };
};

// re-export everything
export * from 'react-testing-library';

// override render method
export { customRender as render };
