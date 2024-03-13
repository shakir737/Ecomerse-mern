import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import Layout from '../scenes/layout';

export default function PrivateRoute() {
  const { token } = useSelector((state) => state.auth);
  return token ? <Layout /> : <Navigate to='/login' />;
}
