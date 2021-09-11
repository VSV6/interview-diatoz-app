import React from 'react';
import { Provider } from "react-redux";

import configureStore from './src/store/configureStore'
import Navigator from './src/components/navigation';

const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
}
