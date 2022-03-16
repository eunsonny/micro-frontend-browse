import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';


window.renderBrowse = (containerId, navigate) => {
  ReactDOM.render(
    <App navigate={navigate} />,
    document.getElementById(containerId),
  );
  unregister();
}

window.unmountBrowse = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
}
