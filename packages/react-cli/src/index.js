import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import '@/assets/styles/1.css';
import '@/assets/styles/1.less';
import '@/assets/styles/2.styl';

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}
