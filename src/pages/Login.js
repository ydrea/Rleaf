import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { switchT } from '../redux/rtk/authSlice';
import { Router } from 'react-router-dom';

//
export const Login = () => {
  const [pass, passSet] = useState('');
  const dispatch = useDispatch();
  //
  const valid = () => {
    pass === process.env.PASS;
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(switchT());
    passSet('');
    Router.push('/upload');
  };

  return (
    <form onSubmit={handleSubmit}>
      Login
      <input
        type="password"
        placeholder="Password..."
        value={pass}
        onChange={e => passSet(e.target.value)}
      />
      <button type="submit" disabled={!valid()}>
        Log In
      </button>
    </form>
  );
};
