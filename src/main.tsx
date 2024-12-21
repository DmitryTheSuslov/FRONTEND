import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'; // Импортируем Provider
import { store } from './store'; // Импортируем ваш store


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}> {/* Оборачиваем Provider */}
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
        basename="/"
      >
        <App />
      </BrowserRouter>
    // </Provider>
  );
  
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register('/serviceWorker.js')
        .then((res) => console.log('Service Worker registered', res))
        .catch((err) => console.log('Service Worker not registered', err));
    });
  }

// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <BrowserRouter basename="my-app">
//         <App />
//     </BrowserRouter>
// )