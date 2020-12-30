import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// react에서는 한 개의 컴포넌트만 랜더링 할 수 있음. 따라서, 많은 컴포넌트를 사용하고 싶다면,
// App 안에서 여러가지 js 파일들을 적용해야 함.

ReactDOM.render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

