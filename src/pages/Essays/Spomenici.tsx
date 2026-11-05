import { ImageWithSuspense } from '../../components/ImageWithSuspense/ImageWithSuspense'
import { Section } from '../../components/Section/Section'
import { BlockWithStickyTitle } from '../../components/BlockWithStickyTitle/BlockWithStickyTitle'
import { Lightbox } from './Lightbox'
import { GalleryImage, withThumbs, type GalleryPhoto } from './Gallery'
import './Essays.sass'

const slike = import.meta.glob<string>('../../assets/essays/spomenici/*.jpg', {
  eager: true,
  import: 'default'
})
const thumbs = import.meta.glob<string>('../../assets/essays/spomenici/thumbs/*.jpg', {
  eager: true,
  import: 'default'
})
const group = (prefix: string) => withThumbs(slike, thumbs, prefix)

const jasenovac = group('jasenovac-')
const petrovaGora = group('petrova-gora-')
const gacesinLogor = group('gacesin-logor-')
const banija = group('banija-')
const ostali = group('ostali-')
const nacrti = group('nacrt-').map(({ src }) => src)

const nacrtiOpisi = [
  'Dolina grobova, Spomen područje Dotrščina u Zagrebu - nacrt. Izvor: „Planoteka IPU“, kolekcija Instituta za povijest umjetnosti, Zagreb. Godina nepoznata',
  'Spomenik ustanku naroda Banije i Korduna, Petrova gora (Spomenik revoluciji Petrova Gora) – nacrt. Izvor: Državni arhiv u Karlovcu, arhivski fond HR-HDA-2039. Godina: 1979.',
  'Spomen područje Jasenovac, Jasenovac (Memorijalni park Jasenovac)-nacrt. Izvor i godina: časopis Hortikultura. 1972. 2:35.',
  'Memorijalno mjesto dječjeg groblja, Sisak (Spomen park djeci žrtvama)-nacrt. Izvor i godina: časopis Arhitektura. 1975. 155:58.'
]

const Gallery = ({ title, images }: { title: string; images: GalleryPhoto[] }) => (
  <Section noReadMore className='essay-gallery' title={title}>
    <div className='photos-container'>
      {images.map(photo => (
        <GalleryImage key={photo.src} {...photo} alt={title} />
      ))}
    </div>
  </Section>
)

export const Spomenici = () => (
  <>
    <Lightbox />
    <BlockWithStickyTitle title='Spomenička baština Narodnooslobodilačke borbe na području Banije/Banovine i šireg prostora Sisačko-moslavačke županije'>
      <p>
        U sklopu Opservatorija krajobraza Banovine/Banije pokrenuta je aktivnost sustavnog
        kartiranja spomenika i drugih spomen-obilježja posvećenih Narodnooslobodilačkoj borbi.
        Kartiranje je inicijalno temeljeno na registru Indeks srušenih, oštećenih i uklonjenih
        spomenika NOB-a po županijama odnosno naseljima (Novak i Bosanac 2001). Budući da lokacije
        spomenika u navedenom indeksu često nisu precizno određene, provodi se njihovo dodatno
        detaljno lociranje, verifikacija na terenu i dopuna prostornih podataka. Ujedno je
        uspostavljen ujednačeni obrazac za unos dodatnih podataka o svakom lokalitetu. Ovakav
        pristup polazi od potrebe da se spomenička građa obradi kao cjelovit korpus te da se, uz
        kartografski prikaz, omogući i njezina daljnja tipološka, prostorna i interpretativna
        analiza.
      </p>
    </BlockWithStickyTitle>

    <Section noReadMore>
      <p>
        Spomenici i druga spomen-obilježja posvećeni Narodnooslobodilačkoj borbi i žrtvama fašizma
        čine važan segment memorijalne i spomeničke baštine ovog prostora. Riječ je o raznorodnim
        mjestima sjećanja i različitim tipovima spomeničke građe, podizanim u poslijeratnom
        razdoblju nakon Drugog svjetskog rata iz potrebe obilježavanja i komemoriranja ratnih
        događaja, otpora i stradanja tijekom Drugoga svjetskog rata. Takva mjesta predstavljaju dio
        kolektivnog pamćenja lokalnih zajednica te imaju važnu ulogu u oblikovanju društvenog
        sjećanja. Najčešće je riječ o spomen-obilježjima posvećenima poginulim antifašističkim
        borcima, civilnim žrtvama fašističkog terora, istaknutim narodnim herojima, kao i
        lokalitetima vezanima uz mjesta otpora, ustanka i stradanja.
      </p>
      <p>
        Tipologija te spomeničke baštine izrazito je raznolika, a pojedina su obilježja smještana u
        različite prostorne i krajobrazne kontekste — unutar gradskih i izvangradskih područja, u
        oblikovanom urbanom prostoru, ali i u autentičnom prirodnom krajobrazu. U procesu nastanka
        tih memorijalnih prostora i objekata sudjelovali su pripadnici različitih struka, od kipara,
        arhitekata i urbanista do krajobraznih arhitekata, dok su pojedina djela nastajala i kao
        rezultat lokalnih inicijativa, uključujući doprinos lokalnog stanovništva. U tom smislu,
        ovaj korpus ne može se promatrati isključivo kao skup pojedinačnih obilježja, nego kao
        složen društveni, kulturni i prostorni fenomen, nastao kroz različite modele oblikovanja i
        funkcije spomenika.
      </p>
      <p>
        Riječ je o spomeničkoj građi koja se i danas nalazi u procesu nestajanja. Brojni su
        spomenici od 1990-ih godina bili srušeni, oštećeni, uklonjeni ili prepušteni dugotrajnom
        propadanju, dok je održavanje velikog dijela preostale baštine često ostalo izvan sustavne
        institucionalne skrbi. U deset godina, od 1990. do 2000. oštećeno je ili uništeno 2.964
        spomen-obilježja NOB-a i antifašističke baštine, među njima 731 spomenik umjetničke ili
        kulturno-povijesne vrijednosti (Hrženjak, 2001.) Unatoč tomu, ni nakon toga razdoblja nije
        uspostavljen sustavan i djelotvoran model njihova očuvanja i održavanja, pa su brojna
        spomenička djela ostala izložena daljnjoj devastaciji, propadanju i postupnom nestajanju.
        Održavanje velikog dijela ove baštine često je prepušteno inicijativi pojedinaca, lokalnih
        udruga i organizacija, zbog čega mnogim lokalitetima prijeti trajan gubitak, ne samo iz
        krajobrazne slike prostora nego i iz memorije mjesta.
      </p>
    </Section>
    <Section noReadMore>
      <p className='essay-aside'>
        U sklopu Opservatorija krajobraza Banije/Banovine stoga su pokrenute dvije međusobno
        povezane aktivnosti: sustavno kartiranje i dokumentiranje spomenika te istraživanje uloge
        krajobraznih arhitekata u oblikovanju memorijalnih prostora. Time se spomenici ne promatraju
        samo kao pojedinačni objekti, nego i kao prostorne strukture upisane u krajolik, čije je
        razumijevanje moguće tek kroz povezivanje povijesnih, memorijskih, oblikovnih i prostornih
        aspekata njihove pojavnosti.
      </p>
    </Section>

    <Gallery title='Memorijalno područje Jasenovac' images={jasenovac} />
    <Gallery title='Petrova gora' images={petrovaGora} />
    <Gallery title='Gaćešin logor' images={gacesinLogor} />
    <Gallery title='Spomenici Banija' images={banija} />
    {/* TODO: the ten unnamed camera files from the source folder; heading to be confirmed */}
    <Gallery title='Ostali spomenici' images={ostali} />

    <Section noReadMore style={{ marginBottom: 16 }}>
      <p>
        U okviru aktivnosti Opservatorija pripremljen je i znanstveni članak{' '}
        <u>Krajobrazna arhitektura u spomeničkoj baštini Hrvatske</u> – razdoblje druge polovice 20.
        stoljeća koji se bavi ulogom krajobrazne arhitekture u spomeničkoj baštini Hrvatske u drugoj
        polovici 20. stoljeća (Pereković, Bunjak-Pajdak i Andlar), a trenutno je u postupku objave.
        U nastavku se donosi njegov sažetak te neki specifični grafički prilozi prikupljeni u sklopu
        rada, odnosno originalne tlocrtne osnove krajobraznih projekata.
      </p>
      <p className='essay-aside'>
        Druga polovica 20. st. bila je vrijeme izgradnje brojnih spomeničkih djela posvećenih
        Narodnooslobodilačkoj borbi tijekom Drugog svjetskog rata. Autorstvo takvih spomeničkih
        cjelina neupitno je pripadalo i krajobraznim arhitektima, no njihov doprinos u realizacijama
        rjeđe je spominjan i ponekad zanemaren. U radu se preispituje doprinos krajobraznih
        arhitekata spomeničkoj baštini Hrvatske. Utvrđeni su autori krajobraznih osnova spomeničkih
        cjelina i osnovna obilježja njihova stvaralaštva. Najveći doprinos krajobrazni arhitekti
        ostvarili su u djelima u kojima je spomenik u izravnoj vezi s krajobrazom kao dijelom
        vizualne cjeline. Pritom se pojavljuju kao autori, suautori ili suradnici na raznolikim
        projektnim zadacima.
      </p>
    </Section>

    {nacrti.map((src, i) => (
      <Section noReadMore key={src} style={{ margin: 0 }}>
        <figure className='essay-figure'>
          <figcaption className='essay-aside nacrt'>{nacrtiOpisi[i]}</figcaption>
          <ImageWithSuspense src={src} alt={`Nacrt ${i + 1}`} loading='lazy' />
        </figure>
      </Section>
    ))}
  </>
)
