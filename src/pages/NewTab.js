import './styles.css';
import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

/**
 * https://stackoverflow.com/questions/73577234/react-router-6-navigate-to-new-tab-with-state
 */

const navigateExternal = (target, options) => {
  if (options.state) {
    localStorage.setItem('state', JSON.stringify(options.state));
  }
  window.open(target, '_blank', 'noreferrer');
};

const Bar = () => {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem('state'))
  );

  const location = useLocation();

  useEffect(() => {
    localStorage.removeItem('state');
  }, []);

  useEffect(() => {
    if (location.state) {
      setState(location.state);
    }
  }, [location]);

  useEffect(() => {
    console.log('Passed state', { state });
  }, [state]);

  return (
    <>
      <h1>Bar</h1>
      <div>State: {JSON.stringify(state)}</div>
    </>
  );
};

export default function Tab() {
  const navigate = useNavigate();

  const navigateInApp = () => navigate('/bar');
  const navigateOutApp = () =>
    window.open('/bar', '_blank', 'noreferrer');

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/foo">Foo Link in-app</Link>
        </li>
        <li>
          <Link to="/foo" target="_blank">
            Foo Link
          </Link>
        </li>
        <li>
          <a href="/foo" target="_blank">
            Foo anchor-tag
          </a>
        </li>
        <li>
          <button type="button" onClick={navigateInApp}>
            Bar in app
          </button>
        </li>
        <li>
          <button type="button" onClick={navigateOutApp}>
            Bar out app
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() =>
              navigate('/bar', {
                state: { from: 'internal navigation' },
              })
            }
          >
            Bar in app with state
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() =>
              navigateExternal('/bar', {
                state: { from: 'external navigation' },
              })
            }
          >
            Bar out app withb state
          </button>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/foo" element={<h1>Foo</h1>} />
        <Route path="/bar" element={<Bar />} />
      </Routes>
    </div>
  );
}
