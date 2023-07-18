import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSwitch } from '../../redux/rtk/authSlice';
//
const Private = () => {
  const token = useSelector(selectSwitch);
  return token ? <Outlet /> : <Navigate to="/login" />;
};
export default Private;
