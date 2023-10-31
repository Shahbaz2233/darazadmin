import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>
  <App />
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
{/* Same as */}
<ToastContainer />
</>
);
