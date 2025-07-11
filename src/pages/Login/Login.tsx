import { useEffect, useState, type MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logon, selectValid } from '../../redux/rtk/authSlice';

export const Login = () => {
  const fix = process.env.REACT_APP_PASS;
  const [pass, passSet] = useState(localStorage.getItem('pass') || '');
  const valid = useSelector(selectValid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(pass, valid);
    localStorage.setItem('pass', pass);
  }, [pass]);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
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
    <form style={{ position: 'absolute', top: '50vh' }}>
      Login
      <input
        type='text'
        placeholder='Password...'
        value={pass}
        onChange={(e) => passSet(e.target.value)}
      />
      <button type='submit' onClick={handleSubmit}>
        {' '}
        Log In
      </button>
    </form>
  );
};
