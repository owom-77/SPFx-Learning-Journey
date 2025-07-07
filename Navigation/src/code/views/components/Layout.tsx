import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    }}
  >
    <Header />
    <main style={{ flexGrow: 1, overflowY: 'auto', marginTop: '60px' }}>
      <Outlet />
    </main>
    <Footer />

    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </div>
);

export default Layout;
