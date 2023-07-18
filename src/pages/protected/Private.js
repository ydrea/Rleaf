import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectValid } from '../../redux/rtk/authSlice';
//
const Private = () => {
  const valid = useSelector(selectValid);
  return valid ? <Outlet /> : <Navigate to="/login" />;
};
export default Private;
