import React from 'react';
import Select from 'react-select';

import t from './header.module.scss';
//
const filters = [
  { value: 'url1', label: 'URL1' },
  { value: 'url2', label: 'URL2' },
  { value: 'url3', label: 'URL3' },
];
//

function Selekt() {
  function cusTom(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#554400',
        primary25: 'orange',
        primary50: 'moccasin',
      },
    };
  }
  return (
    <div>
      <div>
        <Select
          theme={cusTom}
          placeholder="foto"
          className={t.selekt}
          isSearchable
          options={filters}
          getOptionLabel={option => option.label}
          getOptionValue={option => option.value}
        />
      </div>
    </div>
  );
}

export default Selekt;
