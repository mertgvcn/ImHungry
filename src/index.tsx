import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//production ortamında tooları engelliyoruz.
import {disableReactDevTools} from '@fvilers/disable-react-devtools' //npm i @fvilers/disable-react-devtools



//disable devtools to others
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

