import type { ReactNode } from 'react';

import { Nav } from './components/Nav/Nav';
import './layout.css';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Nav />
      <div className='izkompenzuj'>{children}</div>
    </>
  );
};
