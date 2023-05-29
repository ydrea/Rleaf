import React from 'react';
import Select from 'react-select';
import y from './gallery.module.scss';
// import Option from 'react-select/dist/declarations/src/components/Option';

//
export function Gallery() {
  const fotos = [
    { id: 1, ime: 'foto_1' },
    { id: 2, ime: 'foto_2' },
  ];

  //
  return (
    <div className={y.c}>
      <div>
        Gallery <img src="" alt="foto" />
      </div>
      <div className={y.select}>
        <Select
          instanceId="foto"
          options={fotos}
          getOptionLabel={option => option.ime}
          getOptionValue={option => option.id}
        />
      </div>
    </div>
  );
}
