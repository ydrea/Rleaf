export type Photo = {
  geojson: string;
  rank: number;
  id: number;
  signatura: string;
  naziv: string;
  naziv_eng: string;
  opis: string;
  opis_eng: string;
  lokacija: string;
  datum_sni: string;
  kategorija: string;
  autor: string;
  copyright: string;
  copyright_holder: string;
  tagovi: string;
  doi: string;
  url_image: string | null;
  url_thumb: string | null;
};

export type Option = {
  value: string;
  label: string;
};

export type Filters = {
  label: string;
  options: Option[];
}[];
