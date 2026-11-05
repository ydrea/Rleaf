import { ImageWithSuspense } from '../../components/ImageWithSuspense/ImageWithSuspense'
import { Section } from '../../components/Section/Section'
import { BlockWithStickyTitle } from '../../components/BlockWithStickyTitle/BlockWithStickyTitle'
import { Lightbox } from './Lightbox'
import { GalleryGrid, GalleryImage } from './Gallery'
import './Essays.sass'

const slike = import.meta.glob<string>('../../assets/essays/krajobraz/*.jpg', {
  eager: true,
  import: 'default'
})
const thumbs = import.meta.glob<string>('../../assets/essays/krajobraz/thumbs/*.jpg', {
  eager: true,
  import: 'default'
})
const src = (name: string) => slike[`../../assets/essays/krajobraz/${name}.jpg`]
const thumb = (name: string) => thumbs[`../../assets/essays/krajobraz/thumbs/${name}.jpg`]

type Foto = [file: string, opis: string]

const Gallery = ({ items }: { items: Foto[] }) => (
  <GalleryGrid style={{ marginTop: '7rem' }}>
    {items.map(([file, opis]) => (
      <GalleryImage key={file} src={src(file)} thumb={thumb(file)} alt={opis} caption={opis} />
    ))}
  </GalleryGrid>
)

const ImageWithCaption = ({ file, opis }: { file: string; opis: string }) => (
  <figure className='essay-figure' style={{ marginTop: 120, borderTop: '1px solid black' }}>
    <figcaption>{opis}</figcaption>
    <ImageWithSuspense
      src={src(file)}
      alt={opis}
      loading='lazy'
      style={{ maxWidth: 1200, margin: 'auto', display: 'block' }}
    />
  </figure>
)

// Photos in the order they appear in the source document, with their captions.
const prirodna: Foto[] = [
  ['mg-8689', 'Una kao jedna od većih rijeka na području'],
  [
    'mg-8353',
    'Dominacija šuma u načinu korištenja zemljišta (pogled na Šumu Orlova kod sela Buzete)'
  ],
  [
    'dji-0199',
    'Velik udio travnjaka, šikara i šumaraka, nastalih kao posljedica prirodne sukcesije na napuštenim poljoprivrednim površinama'
  ]
]

const antropogena: Foto[] = [
  [
    'dji-0883',
    'Dominacija ruralnih, pretežito malih naselja sa zaseočnom strukturom (pogled na zaselak Koljaja u sklopu naselja Mali Gradac)'
  ],
  ['dji-0309', 'Mali zaselak Prnjavor u naselju Staro Selo, s izraženim obilježjima zapuštenosti'],
  [
    'dji-0006',
    'Nasuprot velikom broju ruralnih naselja, malobrojni su i prostorno mali gradovi (panoramski pogled na grad Petrinju)'
  ],
  ['dji-0736', 'Niskointenzivnost i mozaičnost kao glavno obilježje poljoprivrednih površina'],
  ['dji-0549', 'Izrazito zapuštanje poljoprivrednih površina']
]

const vizualna: Foto[] = [
  [
    'mg-9848',
    'Umjereno razvijen reljef dosljedno kultiviran usitnjenim mozaikom poljoprivrednih površina, ali uz uočljive znakove zapuštanja'
  ],
  [
    'mg-5454',
    'Pašnjački travnjaci, nekada dominantno obilježje regije, danas su zbog svoje rijetkosti vizualno osobito uočljivi'
  ],
  [
    'mg-5422',
    'Velik broj ruševina i napuštene imovine, nastalih dijelom i prije potresa, kao sveprisutno vizualno obilježje'
  ],
  [
    'mg-5410',
    'U mnogim selima očuvana je znatna prisutnost drvenih kuća koje pridonose visokom stupnju prostornog identiteta'
  ]
]

const kvalitete: Foto[] = [
  [
    'dji-0180',
    'U pojedinim selima očuvan je veći fond drvene arhitekture te povijesna matrica naselja (pogled na selo Lotine)'
  ],
  [
    'ban-010-411',
    'Veliki broj spomenika Narodnooslobodilačkoj borbi, danas većinom neodržavanih i urušenih (na slici spomenik partizanska zakletva na Šamarici kod Petrinje)'
  ],
  [
    'dji-0086',
    'Značajan broj srednjovjekovnih utvrda kao svjedočanstva vladanja velikaških srednjovjekovnih obitelji te protuosmanskog obrambenog sustava (Utvrda Zrin – najveća i prostorno najčitljivija srednjovjekovna utvrda na Banovini, s najsloženijim fortifikacijskim sklopom u regionalnom kontekstu)'
  ]
]

const promjene: Foto[] = [
  [
    'dji-0745',
    'Iskop kamena kao izražena prostorna promjena na prostoru Bojne, Buzete i Gornjeg Klasnića'
  ],
  [
    'dji-0252',
    'Totalna sječa šume kao jedna od trenutno najizraženijih prostornih promjena (pogled na južni dio Kotar šume)'
  ]
]

export const Krajobraz = () => (
  <>
    <Lightbox />
    <BlockWithStickyTitle title='Analiza krajobraza regije Banije/Banovine'>
      <p>
        Tekst koji slijedi parafraziran je i razrađen prema rezultatima dokumenta Krajobrazna osnova
        Republike Hrvatske, konkretno, Knjiga 3c: Krajobrazna osnova RH makroregionalne i regionalne
        razine – Atlas krajobraza: Gorsko-brdska Panonsko-peripanonska Hrvatska (Andlar i sur.
        2024.)
      </p>
    </BlockWithStickyTitle>

    <Section noReadMore className='essay-section' title='Obuhvat'>
      <p>
        Prostor Banovine/Banije prepoznat je u okviru krajobrazne makroregije Gorsko-brdska
        Panonsko-peripanonska Hrvatska odnosno u sklopu Krajobrazne regije Banovine/Banije.
        Krajobrazna regija Banije/Banovine obuhvaća prostor između Posavine na istoku, grada Siska
        na sjeveroistoku, petrinjsko-sisačko-lekeničkog Pokuplja na sjeveru, rijeke Gline na zapadu,
        donjeg toka rijeke Une i granice s Bosnom i Hercegovinom na jugoistoku, jugu i jugozapadu.
        Predloženi obuhvat krajobrazne regije ne treba izjednačavati s obuhvatom kulturne regije
        Banovine/Banije – naime, obuhvat kulturne regije Banovine/Banije ne samo da se mijenja kroz
        povijest, već i danas nije usuglašen među različitim stručnjacima i znanstvenicima, što i
        nije neobično za kulturne regije obzirom da se ne radi o administrativnim obuhvatima. Stoga,
        obuhvat krajobrazne regije ima višeslojno tumačenje, koje se prvenstveno temelji na
        fizičko-geografskim obilježjima (reljef i geologija), a tek onda na temelju određenih
        tumačenja obuhvata kulture regije.
      </p>
      <p>
        U tom smislu, krajobraznom regijom nisu obuhvaćene prostrane riječne doline, već samo one
        uže i strmijih strana – poput nagnutih padina doline Kupe na području Slane i Vratečkog, ali
        i cjelokupne doline rijeke Une koja je uska i omeđena brdima. Dolina Save, te otvoreni
        dijelovi doline Kupe, s reljefnim i geološkim specifičnostima, nisu obuhvaćeni ovom
        krajobraznom regijom, a to je lako potvrditi i činjenicom da ovi prostori kulturološki više
        pripadaju (kulturnim regijama) Posavini i Pokuplju.
      </p>
      <p>
        Interesantno je bilo usuglasiti zapadnu granicu krajobrazne regije iz razloga što u
        fizičko-geografskom smislu nema jasne granice, odnosno obilježja se kontinuirano nastavljaju
        dalje preko kulturne regije Kordun. U tom smislu ovdje je jače uključen kriterij
        razgraničenja između Banije i Korduna, a jedno od tumačenja ovog razgraničenja danas je
        rijeka Glina.
      </p>
      <ImageWithCaption
        file='karta-regija'
        opis='Prikaz krajobrazne regije Banije/Banovine u sklopu krajobrazne regionalizacije RH (izvor: Andlar i sur, 2024.)'
      />
    </Section>

    <Section noReadMore className='essay-section' title='Općenito'>
      <dl>
        <dt>Naziv krajobraznog tipa</dt>
        <dd>Krajobraz malih riječnih dolina, pobrđa i nižeg gorja</dd>
        <dt>Karakter krajobraza</dt>
        <dd>
          Krajobraz manjih riječnih dolina s malobrojnim i malim gradskim naseljima te pobrđa i
          gorja dominantno definiranih šumama, a manje brojnim raspršenim ruralnim naseljima s
          niskointenzivnom mozaičnom poljoprivredom
        </dd>
        <dt>Definirajući kriteriji</dt>
        <dd>
          <ul>
            <li>Reljef: niže gorje, pobrđe i manje riječne doline</li>
            <li>Geologija: kompleksna i heterogena geološka građa</li>
            <li>Regija: kulturna regija Banovina/Banija s pokupskim dijelom.</li>
          </ul>
        </dd>
        <dt>Ključna obilježja</dt>
        <dd>
          <ul>
            <li>
              Litološka heterogenost (metamorfne, sedimentne vezane i rastresite stijene) i
              kompleksna tektonika s razvijenim navlakama i ljuskama te brojnim rasjedima,
            </li>
            <li>Reljef nižeg gorja, pobrđa i manjih riječnih dolina,</li>
            <li>Gusta mreža trajnih i privremenih tokova,</li>
            <li>
              Dominacija pokrova šume - u višim dijelovima bukove šume, šume hrasta kitnjaka i
              običnog graba, šume hrasta kitnjaka i pitomog kestena, a u nižim šume hrasta lužnjaka
              i običnog graba te vlažne i periodično poplavljene šume s johom i lužnjakom,
            </li>
            <li>
              Malobrojnost (malih) gradova nasuprot velikog broja malih, međusobno raspršenih i
              nepravilnih ruralnih naselja,
            </li>
            <li>
              Poljoprivreda niskog intenziteta u obliku mozaika poljoprivrednih namjena, ali s
              trendom izraženog zapuštanja.
            </li>
          </ul>
        </dd>
      </dl>
      <ImageWithCaption
        file='karta-koristenje'
        opis='Način korištenja zemljišta u krajobraznoj regiji Banija/Banovina (izvor: Andlar i sur, 2024.)'
      />
      <ImageWithCaption
        file='3d-prikaz'
        opis='3d prikaz ključnih obilježja krajobrazne regije Banije/Banovine'
      />
    </Section>

    <Section noReadMore className='essay-section' title='Obilježja krajobraza'>
      <h3>Prirodna obilježja</h3>
      <p>
        Područje ove regije dio je geotektonskog prostora Dinarida, granica između mezozojske
        karbonatne platforme (Vanjski Dinaridi) i bazenskog sedimentacijskog prostora s ofiolitnim
        kompleksom (Unutrašnji Dinaridi). Regiju odlikuje kompleksna tektonika, s navlakama,
        ljuskama i brojnim rasjedima. Geološki je heterogena, s formacijama od devona do holocena,
        uključujući devonske i karbonske šejlove, vapnence, pješčenjake, dolomite,
        magmatsko-sedimentne komplekse, kao i klastične sedimentne naslage (konglomerati,
        pješčenjaci, šljunci, pijesci, lapori, gline) te kvartarne naslage (les, aluvijalni
        sedimenti, sedimenti terasa i poplava).
      </p>
      <p>
        Prostor se može reljefno podijeliti na (1) rubni riječno nizinski prostor, (2)
        prevladavajuće pobrđe padina diseciranih brojnim riječnim dolinama u bujičnjacima te (3)
        raščlanjen niži gorski sustav Zrinske (Piramida, 616 m) i Trgovske gore (Visoka glava 516
        m). Reljef ovog područja odraz je višestrukog izdizanja i smirivanja tektonskih aktivnosti,
        a obilježenih prevladavanjem fluviodenudacijskih procesa, te je oblikovan splet bila,
        grebena i kosa, često bez jasno izraženog smjera pružanja. Geološka građa odnosno litološki
        sastav područja ogleda se i u razvoju različitih morfogenetskih tipova reljefa. Na ovom
        području voda ima dominantan utjecaj na oblikovanje reljefa, odnosno njeno denudacijsko i
        akumulacijsko djelovanje. Stoga su na ovom su području razvijeni fluvijalni,
        fluviodenudacijski, krški, fluviokrški, padinski i nivalni tip reljefa.
      </p>
      <p>
        Područje je bogato vodama; rijekama i potocima, ali i izvorima. Najveće tekućice regije
        dijelovi rijeka Kupe, Gline i Une koje ovdje imaju uglavnom nizinski karakter. Kupa teče
        aluvijalnom ravnicu na sjeveru regije, a najveće pritoke su joj Utinja, Petrinjčica i Glina.
        Rijeka Glina ima najduži tok u obuhvatu (oko 120 km dužine). Una je granična rijeka koja
        teče regijom oko 65 km kroz dolinu do dolaska do aluvijalne ravnice Save gdje izlazi iz
        regije. Najveća pritoka Uni unutar regije je Žirovnica koja prikuplja vode s područja
        Zrinske gore. Od ostalih tekućica izdvaja se rijeka Sunja i potoci Blinja, Jastrebica i
        Graduša koji teku prema sjeveroistoku i ulijevaju se u Savu izvan regije.
      </p>
      <p>
        Na području pobrđa prevladavaju distrična smeđa tla (uglavnom na klastitima i lesu) te
        pseudogleji (na lesu i njegovim derivatima) i rendzine (na različitim karbonatnim
        sedimentima), a mogu se naći i eutrična smeđa tla (na bazičnim magmatskim stijenama, mekim
        vapnencima i sl.) te lesivirana tla (na laporima, derivatima lesa, mekim vapnencima i sl.).
        Na prijelazu prema dolinama Kupe, Une i Save, značajnija je pojava hidromorfnih tala poput
        pseudoglej-gleja, aluvijalnih i močvarno-glejnih tala.
      </p>
      <p>
        Karakteristično je bogatstvo šumama i to oko 60 % ukupne površine. Dominiraju bukove šume, a
        rasprostranjene u središnjem i južnom dijelu regije. Diljem cijele regije rasprostranjene su
        i šume hrasta kitnjaka i običnog graba, te šume hrasta kitnjaka, pitomog kestena i obične
        breze pri čemu po koncentraciji kestena ova regija ima nacionalni značaj. Prema nizinskim
        dijelovima zastupljene su šume hrasta lužnjaka i običnog graba, a u nizinskim vlažne i
        periodično poplavljene šume pretežno nizinskih područja s johom i lužnjakom.
      </p>
      <p>
        Oko 8 % površine regije zauzimaju travnjaci gdje dominiraju mezofilne livade košanice
        Srednje Europe a s manjim površinama su prisutne i bujadnice; ovi travnjaci pripadaju
        ugroženim i/ili rijetkim staništima na području RH, a u stvari ukazuju na pašnjačku
        djelatnost.
      </p>
      <Gallery items={prirodna} />

      <h3>Antropogena obilježja</h3>
      <p>
        Područje ove regije je od prapovijesnih vremena, pa preko antike i predosmanskog srednjeg
        vijeka bila nastanjeno, gospodarski značajno te tranzicijsko i pogranično područje. O
        vitalnosti područja netom prije osmanskih osvajanja danas svjedoči niz ostataka utvrda koje
        su bile u vlasništvu velikaških obitelji (Gvozdansko, Zrin, Hrastovica, Čuntić, Klinac,
        Komogovina, Kostajnica, Gora itd.). Mnoge ove utvrde postaju osnova protuosmalnijskog
        obrambenog sustava unsko-savsko-kupskog prostora. Utvrde gube funkciju, a čime započinje
        višestoljetni period djelovanja Vojne krajine kada se na opustošeni prostor naseljava novo
        stanovništvo te osnivaju sela i razvijaju gradovi. Današnji toponim Banija/Banovina je
        upravo nasljeđe djelovanja Banske krajine kao dijela Vojne krajine. Višestoljetni granični i
        militarizirani način života temeljen na bazičnoj i ekstenzivnoj poljoprivredi je postavio
        temelje današnje organizacije krajobraza, a koja zbog neprisutnosti modernizacijskih procesa
        i nerazvijenosti nije doživjela većih razvojnih promjena u recentnim periodima. Doduše,
        bilježi se kratak period krajem 80.-ih kada ova regija zbog industrijalizacije regija
        doživljava gospodarski uspon i donosi promjene u slici naselja i poljoprivredne prenamjene.
        Međutim, od 1990ih cijela regija je obilježena iseljavanjem, zanemarivanjem i propadanjem
        što između ostaloga ima za rezultat možda i najveći broj napuštene imovine u Hrvatskoj.
      </p>
      <p>
        Danas je ovo dominantno ruralna regija koju gradi gusta mreža ruralnih naselja s tek
        nekoliko manjih gradova. Gustoća ruralnih naselja se ogleda u broju od oko 240 sela sa
        pripadajućih oko 800 zaselaka. Nasuprot većih, nešto pravilnijih linijskih naselja u
        nizinskim i udolinskim dijelovima (uz Kupu i na sunjskom području te na glavnim prometnim
        pravcima), u pobrđu je zastupljenija izrazito rahla matrica malih i zabačenih sela i
        zaselaka, raspršenih po padinama riječnih dolina i hrptovima. Burna recentna povijest
        ostavila je trag u obliku šarolike tipologije izgradnje, međutim i dalje je u znatnoj mjeri
        prisutna drvena arhitektura; pretpostavka je da je ova regija ima najveću koncentraciju u
        Hrvatskoj. U gotovo svim selima izraženo je napuštanje pri čemu se ističu sela uz BiH na
        potezu od Topuskog do Dvora.
      </p>
      <p>
        Gradovi pak (Glina, Petrinja, Hrvatska Kostajnica i Dvor) su gravitacijske točke cijele
        regije i centri ekonomskih, obrazovnih i kulturnih aktivnosti. Radi se o malim gradovima,
        razvijenim na riječnim obalnim stranama, a čije jezgre imaju povijesne, urbanističke,
        arhitektonske i ambijentalne vrijednosti obzirom na njihov razvoja tijekom 18. i 19. st. u
        vrijeme Vojne krajine (zaštićeni kao kulturno dobro). Posebno je važno istaknuti Petrinju
        koja nastaje na ruševinama Hasan-pašine tvrđave krajem 16. stoljeća, danas su očuvani
        slojevi od 18. stoljeća do danas, sa župnom crkvom, trgom i šetalištem kao glavnim gradskim
        akcentom.
      </p>
      <p>
        Izgrađena područja gradova i sela u zadnjih 30 godina uglavnom nisu doživjela većih promjena
        u smislu promjene matrice i širenja građevinskog područja. Veće rijeke su resurs koji je još
        krajem prošlog stoljeća privlačio na izgradnju kuća za sekundarno stanovanje, pa je i danas
        prisutan umjeren trend izgradnje uz rijeku Unu. U manjoj mjeri također, prisutno je širenje
        ruralnih naselja te njihova urbanizacije i to uz Petrinju i Hrvatsku Kostajnicu.
      </p>
      <p>
        Aktivne poljoprivredne površine zauzimaju tek oko četvrtine regije. Najviše ih ima u
        aktivnijim nizinskim i udolinskim dijelovima gdje dominiraju oranice, dok su po pobrđu više
        raspršeni mozaici fragmentirani višom prirodnom vegetacijom, a gdje dominiraju livade i
        pašnjaci. Svjesno sađene i gospodarene živice kao međe poljoprivrednih površina
        karakteristične su, ali i iznimno ugrožene, u selima petrinjskog Pokuplja. U oba slučaja
        radi se o mozaičnim usitnjenim poljoprivrednim površinama, s gotovo neprisutnim intenzivnim
        okrupnjenim nasadima. Tradicionalno je ova regija zbog velikog udjela ograničeno obradivih
        tala, ali opisanih društveno gospodarske povijesti, više bila orijentirana na trajne nasade
        i stočarstvo, manje intenzivno poljodjelstvo. Oko trećine površine danas čine zapuštene
        poljoprivredne površine kojih je oko 33 % a što dodatno ukazuje na depopulaciju regije.
      </p>
      <p>
        Gospodarenje šumama važan je povijesno gospodarski aspekt ovog kraja, posebno u vrijeme
        Vojne krajine, međutim današnji oblik sječe šume, kao trenutno jedan od najizraženijih
        antropogenih utjecaja, donosi okolišno i društveno upitan benefit. Također, iskorištavanje
        kestena koji je dio identiteta ovih zajednica, danas nije dovoljno iskorišten resurs.
        Rudarenje je također djelatnost koja je u povijesti imala važnu gospodarsku ulogu.
        Specifičnost stijena Trgovske gore činila je područje od interesa još u vrijeme Ilira i
        Rimljana, ali i u kasnom srednjem vijeku kada su podizane spomenute utvrde, između ostaloga
        za kontrolu rudnika. Zrinski su svoju moć ali obranu teritorija dobrim dijelom temeljili na
        iskorištavanju ruda Trgovske gore i kovanju novca. Danas je diljem područja više kamenoloma,
        među kojima se površinom i gospodarskim značajem ističe onaj uz selo Bojna.
      </p>
      <Gallery items={antropogena} />

      <h3>Vizualno doživljajna obilježja</h3>
      <p>
        Vizualno se jasno mogu odvojiti cjeline nizinskog dijela, pobrđa i gorja. Dominira pobrđe
        koje iako relativno reljefno raščlanjeno, zbog velikog udjela više prirodne vegetacije,
        vizura uglavnom svedenih na manja izolirana nerijetko teško dostupna područja sela/zaselaka.
        Generalno, na tom prostranom području pobrđa vlada ujednačenost velikog broja izoliranih
        ambijenata i mozaične namjene s velikim udjelom prirodne vegetacije pri čemu je mali broj
        akcenata i vizualno istaknutih. Navedeno uvjetuje (u pozitivnom i negativnom smislu)
        nepreglednost prostora. Područja nizina i glavnih prometnih pravaca pak su definirana nešto
        većom aktivnošću, većom cirkulacijom ljudi i povezanošću, uostalom zbog činjenice da su se
        ovdje razvila veća naselja. Međutim, zbog veće koncentracije novije, nerijetko s ambijentom
        neusklađene izgradnje i vizualne nesagledivosti prostora van naselja, prisutan je niži
        stupanj vizualne prepoznatljivosti. I treća cjelina, šumovita gorja, nemaju razvijenu i
        prikladnu prometnu i rekreacijsku infrastrukturu stoga su uglavnom teško dostupna i van
        vizualne percepcije.
      </p>
      <p>
        Iako su karakteristični bogatstvo prirodne vegetacije, mozaičnost i niski intenzitet
        poljoprivrede te mjestimično slikovita te zabačena i arhaična sela, možda i upečatljiviji je
        dojam napuštanja i zanemarivanja. Prvenstveno se radi o velikom broju ruševina i napuštene
        imovine, nastalih i prije potresa, ali i neuređena prometna infrastruktura i neartikulirani
        i neuređeni javni otvoreni prostori. Nadalje, velike površine i način sječe šuma koji sami
        po sebi donosi negativan vizualni utjecaj, neposredno utječe na stanje prometnica koje su
        oštećene uslijed prijevoza drva; na sličan način utjecaj imaju pravci kojima se prometuje
        uslijed odvoza iskopanog kamena. I konačno, velika je količina otpada u potocima, a koji su
        posljedica nekontroliranog odlaganja na padinama potoka. Sve navedeno znatno utječe na
        kvalitetu života te neprivlačnost za ostanak, nastanjivanje i posjećivanje.
      </p>
      <Gallery items={vizualna} />
    </Section>

    <Section noReadMore className='essay-section' title='Kvalitete krajobraza'>
      <h3>Prirodne kvalitete</h3>
      <ul>
        <li>
          Prirodnost i posebna obilježja vegetacije; veliki udio šuma, a izdvajaju se područja
          velike koncentracije kestena čija važnost se može sagledati na nacionalnom nivou,
        </li>
        <li>Prirodnost; veliki udio više prirodne vegetacije u poljoprivrednom krajobrazu,</li>
        <li>
          Prirodnost i posebna obilježja voda odnosno bogatstvo voda (rijeka, potoka i izvora),
        </li>
        <li>
          Navedena prirodnost odnosno šumovitost, bogatstvo vodama te geološke specifičnosti
          uvjetuju prisutnost prirodnih vrijednosti i stoga nešto veći površinski udio prostora
          vrijedne prirode; uz Značajni krajobraz Kotar - Stari gaj tu su i veće površine NATURA
          područja. Tome treba pridružiti i inicijativu za zaštitu regionalnog parka Zrinska gora.
        </li>
      </ul>
      <h3>Antropogene kvalitete</h3>
      <ul>
        <li>
          Povijesni značaj; ostaci utvrda kao svjedočanstvo vladanja velikaških srednjovjekovnih
          obitelji te protuosmanskog obrambenog sustava,
        </li>
        <li>
          Povijesni značaj i posebnost morfologije gradskih naselja; povijesne jezgre Gline,
          Petrinje, Hrvatske Kostajnice i Dvora kao svjedočanstva djelovanja Vojne krajine,
        </li>
        <li>
          Posebnost uzorka, smještaja i organizacije naselja, posebnosti poljoprivrednih
          krajobraznih uzoraka te povijesni značaj: vrijedni ruralni kulturni krajobraz pobrđa - tip
          raspršenih sela i zaselaka u pobrđu uokvirenih u mozaičnu poljoprivrednu niskog
          intenziteta kao vrijedno svjedočanstvo vremena Vojne krajine. Izdvajaju se pojedina sela
          očuvanih matrica te veće koncentracije drvene arhitekture; Luščani, Mali Šušnjar, Klinac,
          Ćukurani, Martinovići, Trnovac Glinski itd.,
        </li>
        <li>
          Kulturna simboličnost; asocijacijski značaj Zrinske gore obzirom na povezanost s
          velikaškom obitelji knezova Zrinskih,
        </li>
        <li>
          Kulturna simboličnost; memorijalna područja i njihova simbolička važnost područja za
          obranu u domovinskom i II svj. ratu.
        </li>
      </ul>
      <h3>Vizualno-doživljajne kvalitete</h3>
      <ul>
        <li>
          Kompleksnost, prostorni identitet i koherentnost vidljivi u mozaičnosti poljoprivrednog
          krajobraza te zabačenosti ambijenata sela i zaselaka - kao atraktivniji krajobrazi
          izdvajaju se oni na višim nadmorskim visinama te s većom koncentracijom drvene
          arhitekture,
        </li>
        <li>
          Prostorni identitet i vizualna cjelovitost: krajobraz rijeke Une i Gline u većem dijelu
          tokova koji prolaze regijom.
        </li>
      </ul>
      <h3>Postojeće promjene</h3>
      <ul>
        <li>
          Izražena depopulacija praćena napuštanjem gradova, sela i poljoprivrede, odnosno velikim
          udjelom napuštene imovine, uključujući zanemarivanje kulturne baštine (zaštićene i manje
          poznate); utvrde, stare gradske jezgre, ruralne cjeline,
        </li>
        <li>
          Gradovi i sela s nerazvijenom i zapuštenom infrastrukturom otvorenih prostora (posebno
          biciklističkom, pješakom, rekreacijskom, boravišnom),
        </li>
        <li>
          Prepuštenost obala potoka (Petrinjčice, Gline, Utinje, Sunje) sukcesiji prirodne
          vegetacije i njihova nedostupnost,
        </li>
        <li>
          Neprikladne prostorne promjene i okolišna onečišćenja toka rijeke Kupe (ujedno NATURA 2000
          područja) usred sve intenzivnijeg korištenja od strane stanovnika i posjetitelja
          (uklanjanje prirodne vegetacije, modeliranja obale, improvizirani kampovi i privezišta,
          otpad itd.),
        </li>
        <li>U manjoj mjeri iskop kamena (14 postojećih eksploatacijskih polja),</li>
        <li>
          Znatan je utjecaj otpad u potocima i rijekama, koji zajedno s loše kontroliranim
          korištenjem zaštitnih sredstava utječu na lošu kvalitetu voda u riječnim tokovima,
        </li>
        <li>Minirana područja,</li>
        <li>Ugroženost šuma sječom i bolestima.</li>
      </ul>
      <Gallery items={kvalitete} />

      <h3>Promjene</h3>
      <Gallery items={promjene} />
    </Section>

    <Section noReadMore className='essay-section essay-references' title='Literatura'>
      <ul>
        <li>
          Andlar, G., Hrdalo, I., Koščak Miočić-Stošić, V., Tomić Reljić, D., Krklec, K., Rubinić,
          V., Šteko, V. i sur. (2024): Analitička podloga za izradu Krajobrazne osnove Republike
          Hrvatske. Knjiga 3c: Krajobrazna osnova RH makroregionalne i regionalne razine – Atlas
          krajobraza: Gorsko-brdska Panonsko-peripanonska Hrvatska. Ministarstvo prostornoga
          uređenja, graditeljstva i državne imovine, Zagreb.
        </li>
      </ul>
    </Section>
  </>
)
