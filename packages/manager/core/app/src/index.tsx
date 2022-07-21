import React from 'react';
import { createRoot } from 'react-dom/client';

import Hello from './hello';

const root = createRoot(document.querySelector('#app'));

root.render(
  <React.StrictMode>
    <Hello name="word" />
  </React.StrictMode>,
);
