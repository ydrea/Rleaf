import { Link } from 'react-router'

import { BlockWithStickyTitle } from '../../components/BlockWithStickyTitle/BlockWithStickyTitle'

export const essays = [
  {
    slug: 'poljoprivredno-koristenje-zemljista',
    title: 'Poljoprivredno korištenje zemljišta na području Banije/Banovine danas'
  },
  {
    slug: 'analiza-krajobraza',
    title: 'Analiza krajobraza regije Banije/Banovine'
  },
  {
    slug: 'spomenicka-bastina-nob',
    title:
      'Spomenička baština Narodno-oslobodilačke borbe na području Banije/Banovine i šireg prostora Sisačko-moslavačke županije'
  }
]

export const Essays = () => (
  <BlockWithStickyTitle title='eseji'>
    <ul>
      {essays.map(({ slug, title }) => (
        <li key={slug}>
          <Link to={`/essays/${slug}`}>{title}</Link>
        </li>
      ))}
    </ul>
  </BlockWithStickyTitle>
)
