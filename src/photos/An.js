import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

const duration = 1000;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

// type Props = { url: string }
function FadeChanger({ url }) {
  const [currentUrl, setCurrentUrl] = useState(url);
  // const [anime, setAnime] = useState<boolean>(true)

  // useEffect(() => {
  //   setAnime(false)
  // }, [url])

  return (
    <Transition
      in={url === currentUrl}
      onExited={() => {
        setCurrentUrl(url);
      }}
      timeout={duration}
    >
      {state => (
        <div
          style={{
            width: '100px',
            height: '100px',
            background: `url(${currentUrl})`,
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        ></div>
      )}
    </Transition>
  );
}

const Demo = () => {
  const [num, setNum] = useState(0);
  const incNum = () => setNum(v => v + 1);

  return (
    <div>
      <FadeChanger
        url={`https://avatars.dicebear.com/4.5/api/male/${num}.svg`}
      />
      <button onClick={incNum}>change</button>
    </div>
  );
};

export default () => <Demo />;
