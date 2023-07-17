import { useState } from 'react';

export const Login = () => {
  const [pass, passSet] = useState('');
  return (
    <div>
      Login
      <input
        type="password"
        placeholder="Password..."
        value={pass}
        onChange={e => passSet(e.target.value)}
      />
      <button type="submit">Log In</button>
    </div>
  );
};
