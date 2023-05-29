import React, { useMemo, useRef, useState } from 'react';
import i from './nav.module.scss';

function Search() {
  const [items, itemsSet] = useState([]);
  const [query, querySet] = useState('');
  const inputRef = useRef();

  const derivedState = useMemo(() => {
    return items.filter(i => {
      return i.includes(query);
    });
  }, [items, query]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputRef);
    const value = inputRef.current.value;
    if (value === '') return;
    itemsSet(prev => {
      return [...prev, value];
    });
    inputRef.current.value = '';
  }

  const list = items.map(item => <p>{item}</p>);

  return (
    <div className={i.log}>
      <input
        type="search"
        value={query}
        onChange={e => querySet(e.target.value)}
      ></input>
      <br />
      <form onSubmit={handleSubmit}>
        {/* <input type='text' ref={inputRef}></input> */}
        {/* <button type="submit">add</button> */}
      </form>
      {list} :: {derivedState}
    </div>
  );
}

export default Search;
