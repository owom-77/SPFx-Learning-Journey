import * as React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Home from '../../../code/views/components/Home';
import Login from '../../../code/views/components/Login';
import ContactUs from '../../../code/views/components/ContactUs';
import About from '../../../code/views/components/About';
import SignUp from '../../../code/views/components/SignUp';
import Layout from '../../../code/views/components/Layout';
import Product from '../../../code/views/components/Product';
import UserDashBoard from '../../../code/views/components/User/UserDashBoard';

import { IRoutingProps } from './IRoutingProps';
import { toast } from 'react-toastify';

const Routing: React.FC<IRoutingProps> = ({
  sp,
  listName,
  orderListName,
  description,
  isDarkTheme,
  environmentMessage,
  hasTeamsContext,
  userDisplayName
}) => {
  const UserDashWithProps: React.FC = () => {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const onLogout = (): void => {
      localStorage.removeItem('user');
      navigate('/login');
      toast.success("Logout Successfully");
    };

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <UserDashBoard user={user} onLogout={onLogout} orderListName={orderListName} sp={sp} />;
  };

  const ProductWithProps: React.FC = () => (
    <Product sp={sp} orderListName={orderListName} />
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login sp={sp} listName={listName} />} />
          <Route path="signup" element={<SignUp sp={sp} listName={listName} />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="product" element={<ProductWithProps />} />
          <Route path="product/:category" element={<ProductWithProps />} />
          <Route path="user-dash" element={<UserDashWithProps />} />
        </Route>
      </Routes>
    </Router>
  );
};


export default Routing;
