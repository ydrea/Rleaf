import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  logon,
  logoff,
  setPassword,
  selectPwd,
  selectValid,
} from '../redux/rtk/authSlice';
import { redirect, useNavigate } from 'react-router-dom';

//
export const Login = () => {
  const fix = 'pwd';
  const [pass, passSet] = useState('');
  const valid = useSelector(selectValid);
  // const pwd = useSelector(selectPwd);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  useEffect(() => {
    console.log(pass, valid);
  }, [pass]);
  // };
  const handleSubmit = e => {
    e.preventDefault();
    try {
      const token = pass;
      if (token === fix) {
        dispatch(logon());
        navigate('/upload');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      Login
      <input
        type="text"
        placeholder="Password..."
        value={pass}
        onChange={e => passSet(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        {' '}
        Log In
      </button>
    </form>
  );
};
