# foodbase
Dette prosjektet ble satt opp i forbindelse med prosjekt 3 i emnet IT2810 Webutvikling ved Norges teknisk-naturvitenskapelige universitet(NTNU). 
Oppgaven for prosjektet var å lage en søkbar katalog med valgfri data med dynamisk innlasting fra ende til ende.

## Avhengigheter
For å kjøre prosjektet lokalt på sin egen pc er man avhengig av å installere følgende:
<ul>
<li><a href="https://nodejs.dev/">Node.js</a> - JavaScript kjøremiljø</li>
<li><a href="https://www.npmjs.com/">npm</a> - Node Package Manager installert som del av Node.js</li>
<li><a href="https://www.mongodb.com/">MongoDB</a> - NoSQL database </li>
</ul>


## Frontend

### Teknologi
Utgangspunktet for prosjektet var å benytte [React](https://reactjs.org) til å bygge frontend av applikasjonen.
React er kort fortalt et populært JavaScript bibliotek for å bygge brukergrensesnitt.
Vi initierte dermed prosjektet ved å kjøre kommandoen `npx create-react-app`, som oppgaven ba om.
I prosjektet bruker vi [Redux](https://redux.js.org) for å lagre data og hente den ut i de ulike delene av applikasjonen. 
I Store lagrer vi fem verdier for å hele tida ha kontroll på tilstanden. 
Disse består av dataen som vi henter fra databasen, søk, filter, sortering og sorteringsretning. 

**Tredjepartsbiblioteker og -komponenter**
<br>

Vi har brukt noen tredjepartsbiblioteker og -komponenter i utviklingern. Dette er primært for enkelthetsskyld.
Å lage egne komponenter tar lang tid, så import av modal og ferdiglaget select knapp sparte oss for en god del ressurser. 
I tillegg importerte vi et graf-bibliotek og -komponent for å ordne en alternativ, grafisk datavisning.
Spesielt sistnevnte er forholdsvis komplekse, slik at det ville vært nærmest urealistisk for oss å bygget disse på egenhånd.
For å gjøre tabellen vår responsiv valgte vi å benytte en litt spesiell tabellkomponent kalt react-super-responsive-table,
vi gikk inn med litt skepsis til denne, da den ikke virket å bli så hyppig lastet ned i prosjekter, men når vi fikk
implementert den på en god måte og den virket å tilfredstille våre krav valgte vi å gå for denne. Før vi bestemte oss for 
å implementere denne skal det nevnes at vi prøvde å implementere @material-core sine tabellkomponenter, men at disse
ikke fungerte responsivt som vi hadde håpet og dermed ble skrotet for overnevnte alternativ.
Til slutt ble det brukt noen bredt anbefalte biblioteker for å forenkle testingen.
Uten påfølgende tredjepartsbiblioteker og -komponenter, ville det blitt mye vanskeligere å få tilfredstilt
alle kravene ved prosjektet innen hensiktsmessig tid. 

<ul>
<li><a href="https://www.npmjs.com/package/react-plotlyjs">React-PlotlyJS</a> - React komponent for Plotly.JS grafer</li>
<li><a href="https://plot.ly/javascript/">Plotly.js</a> - Åpen-kilde grafbibliotek for JavaScript</li>
<li><a href="https://react-select.com/home">React Select</a> - Fleksibel og stylet select komponent for React</li>
<li><a href="https://www.npmjs.com/package/react-modal">react-modal</a> - Modal komponent for React</li>
<li><a href="https://www.npmjs.com/package/react-super-responsive-table">react-super-responsive-table</a> - 
Responsiv tabellkomponent for React</li>
<li><a href="https://fetch.spec.whatwg.org/">whatwg-fetch</a> - Ressurs for å få fetch-kallene over på XHR-format for Cypress</li>
<li><a href="https://airbnb.io/enzyme/">Enzyme</a> - Ressurs for å enklere enhetsteste react komponenter</li>
</ul>

### Kom i gang
Start frontend delen av applikasjonen ved å bruke kommandoen `npm start` i client-mappen. Dersom det er første gang
man forsøker å gjøre dette på maskinen må man først bruke kommandoen `npm install` for å installere alle node-moduler
applikasjonen er bygd på og avhenger av. For å bygge en distribuerbar versjon av applikasjonen 
kjører man kommandoen `npm run build`.


### Testing

#### Hva ble testet?
På frontenden tester vi flere ulike elementer. Vi har satt opp snapshottesting på react-komponentene vi bruker. 
I tillegg har vi tester for reducerne som blir brukt for gi nye tilstander i Store. 
På de komponentene som har egen tilstand med funksjoner for å endre denne, har vi lagt til unittester for funksjonene. 
Til slutt har vi benyttet Cypress for å få til ende-til-ende-testing. 
Her testes brukerinteraksjon med enkeltkomponenter og flere av dem.
Applikasjonen ble også testet funksjonelt ved brukerinterakjson i flere nettlesere og enheter. 

#### Hvordan gjennomførte gruppa testing?
Gruppa startet med å skrive tester tidlig for å sjekke at funksjonaliteten fungerte som tenkt. 
I tillegg, er en fordel med dette at man kan kjøre testene i watch mode og få beskjed når man har endret noe som får testene til å feile. 
Dette ble ikke gjennomført så godt, derfor måtte gruppa senere i prosjektet oppdatere disse. 
Derimot har gruppa lært av dette og ønsker å benytte seg i større grad av denne funksjonaliteten senere. 
Testene ble også i hovedsak skrevet av en person. Dette kan både være positivt fordi da er det lettere at flere har kontroll på alle deler av applikasjonen. 
Samtidig er det en fordel om folk som gjør endringer og som for tester til å feile, oppdaterer testene for å gjenspeile endringene. 
Derfor vil gruppa prøve å fordele testing utover til av medlemmene i neste prosjekt. 


#### Hvordan ble applikasjonen testet og hvorfor ble den testet slik?
Kravet for prosjektet er å ha systematisk enhetstesting og automatisert ende-til-ende testing med Jest og Cypress.
Når det kommer til enhetstesting så går dette å teste enkeltfunksjoner og deres output isolert. 
Derfor følte gruppen det var naturlig at reducere knyttet til Redux ble testet. 
Samtidig tenkte vi at å teste funksjoner som ikke returnerer noe, men endrer tilstanden, kan testes isolert og sees på som enhetstester.
Å teste enkeltkomponenter med bare Jest ble prøvd, men var veldig utfordrende. 
Derfor ble Enzyme brukt på toppen av Jest for å lettere kunne håndtere instanser av reactkomponentene. 

Det ble laget en test for å teste at input til en reactkomponent fikk en en action til å bli sendt til Store. 
Men, denne ble ansett som en integrasjonstest av gruppa. 
Og siden det ikke var en del av kravspesifikasjonen ble det ikke lagd flere for å teste de andre komponentene.

Jest ble også brukt for å ha snapshot-tester av react-komponentene. 
Her var det utordringer på grunn av at flere av dem var knyttet til Redux-store.
Dette ble løst ved å eksportere komponentene uten Redux-tilkoblingen, og deretter gjennomføre snapshot-tester på dem. 

Ende-til-ende testing ble gjennomført ved å teste at brukerinteraksjon på nettsida hadde lik oppførsel som tenkt. 
Først ble enkel interaksjon ved komponentene testet. Både TableRow og Modalen ble testet ved å simulere brukerklikk ved hjelp av Cypress. 
Disse ble testet for om de viser riktig informasjon før og etter interaksjon fra brukerens side. 
Så ble det laget tester for om klientsiden av programmet henter daten fra tjenersiden og viser det frem på riktig måte (DataFetch). 
Search-komponenten blir også testet, om brukerens input førte til at riktige resultater blir hentet og vist fram. 
Ideelt sett skulle alle komponentene her blit testet, så hadde teamet hadde lenger tid ville det blitt gjennomført. 
Likevel føler vi at vi har fått på plass en del tester for kjernefunksjonalitet. 

Når det kommer til manuell testing ble dette gjort ved å bruke nettleserne Chrome og Safari. 
For å teste resposivt design ble inspiserings-funksjonaliteten i nettleserne brukt flittig. 
I tillegg ble nettsiden testet på mobile enheter. 

#### Kjøre tester

For å kjøre disse kommandoene så må du først gå inn i client-mappen. 
=> cd to_root_folder/client/

`npm test`
For unit-testing, integrasjonstesting og snapshot-tester brukes [Jest](https://jestjs.io).
Når du benytter denne kommandoen vil alle snapshottester, unit-tester av reducere og komponenter kjøre. 

`npm run test:cypress`
For ende-til-ende-testing blir [Cypress](https://www.cypress.io/) brukt. 
Ved å bruke denne kommandoen vil du kunne se alle Cypress-testene som blir kjørt og om de feiler eller består. 

`npm run test:all`
For å kjøre alle testene, både [Cypress-](https://www.cypress.io/) og [Jest-](https://jestjs.io)testene, så kjør denne kommandoen.

`npm run cypress`
For å åpne Cypress og kjøre deres applikasjon i interaktiv modus, så bruk denne kommandoen. 
Her kan du gå igjennom alle testene på enkelt vis ved å trykke på *Run all specs* i øvre høyre hjørne. 
Da vil du kunne se hva brukeren gjør til enhver tid og hoppe frem og tilbake i tid. 


### Søk, filtrering og sortering

Vi har valgt å implementere et dynamisk søkefelt for siden som oppdaterer tabellen i real time. Hensikten med dette er å gi brukeren
en større interaksjonsfølelse og gir samtidig rask feedback på søk. Ulempen med dette er at vi sender mange requests til tjenersiden. 
Ikke alle disse er like nødvendige dersom brukeren vet hva den leter etter. I tillegg kan det virke forstyrrende at tabellen oppdaterer seg kontinuerlig. 
Tatt dette i betraktning så valgte vi å gå for den responsive løsningen. Denne funksjonaliteten ville blitt brukertestet dersom vi hadde hatt lenger tid på prosjektet. 

Ved innlasting vises de 20 første artiklene uten noen filtrering. 
Brukeren kan selv legge på ønsket filter basert på predefinerte kategorier og tabellen vil oppdateres deretter. 
Filteret påvirker dataen som hentes og dermed også den dataen som vises i den grafiske fremstillingen. 
Vårt datasett bestod av matvarer og derfor følte vi det var naturlig at filtreringa kunne bli gjort kategoriene som matvarene var tilegnet. 
Vi kunne hatt flere felter som kunne filtreres på. Men etter diskusjon kom vi fram til at søk tar seg av mye av denne funksjonaliteten. 
I tillegg ville flere kategorier for filtrering gjort applikasjonen mer kompleks for brukeren. 

Standard ved innlasting av siden er alfabetisk sortering av matvarene. 
Brukeren kan enkelt endre sortering ved å klikke på ønsket kategori i tabellhodet. 
Valgt kategori er markert med en pil ved siden av kategorinavnet. 
Denne viser hvilken vei matvarene er sortert, i synkende/stigende rekkefølge.
Ved å trykke på valgt kategori vil rekkefølgen snu. 
Denne funksjonaliteten var vi enige om fra starten.
Alle medlemmene så på dette som en brukervennlig løsning. 
Det som kan kommenteres er at kategoriene i tabellhodet ikke inviterer spesielt til brukerinteraksjon. 

Søk og filtrering ligger som egne komponenter i components-mappa i client. Filtrering ligger bygget inn i TableHeader-komponenten. 
Alle disse veridene blir lagret i store slik at TableContent kan hente ut verdiene og sende kall til tjenersiden av applikasjonen. 


### Tabellarisk fremvisning av data
For fremvisning av data har vi valgt å bruke react-super-responsive-table, en komponent som gjør det enkelt å bygge responsive tabeller. Vi valgte komponenten da det gjorde det mulig å produsere gode og intuitive tabelløsninger for bruker, som var godt tilpasset bruk på ulike enheter. Hver matvare er representert som en rad i tabellen og gir informasjon om varens protein-, fett- og karbohydratinnhold.

Dersom brukeren ønsker utvidet informasjon om en artikkel kan man trykke på raden, som vil utvide seg og oppgi
noe mer informasjon. Brukeren vil da også få mulighet til å rangere artikkelen på en skala fra 0-5. 
Rangeringen lagres i databasen og den utvidede raden gir en gjennomsnittlig 
rangering for artikkelen basert på brukernes tilbakemeldinger. 

For å håndtere den store datamengden har vi valgt å laste inn 20 mat-objekter når siden lastes, samt implementert loadOnScroll for tabellen, slik at den laster inn 20 nye mat-objekter hver gang brukeren når nærmer seg bunnen av tabellen.

### Responsivt design
For å gi en best mulig brukeropplevelse har vi etterstrebet et responsivt design for produktet. Vi har aktivt søkt etter tredjepartsbiblioteker som i størst mulig grad støtter responsivt design og valgte derfor blant annet å gå for React-Super-Responsive-Table. Dette er et bibliotek for tabellarisk fremvisning av data som leverer en god og effektiv løsning som skallerer godt mellom ulike enheter. 

For øvrige komponenter på siden har vi implementert responsivt design gjennom bruk av Flexbox og media-queries. Vi valgte denne løsningen da det ga oss god kontroll over hvordan siden skallerer på ulike enheter basert på egne breakpoints og vi kunne dermed enkelt skape et optimalt design for hver enhet. 

Selv om vi har etterstrebet et godt responsivt design for siden, er ikke alle implementasjoner optimalisert for dette. Plotly-biblioteket gir i utgangspunktet ikke noen god løsning for skallering av punktplott til nettleservindu. Dette har vi derfor måttet løse ved bruk media-queries og predefinerte breakpoints. Skallering skjer imidlertid ikke automatisk, så modal-vinduet må lukkes og åpnes for at skalleringen skal oppdateres. Vi har likevel vurdert det til at man som bruker sjeldent vil skallere vinduet under bruk, så denne svakheten vil derfor ikke være synlig på tvers av ulike enheter.

### Avansert fremvisning av data
For alternativ fremvisning av data er det laget et todimensjonalt punktplott for næringsinnhold. Brukeren kan selv velge hvilket næringsinnhold man ønsker representert på hver av aksene. Punktplottet er tenkt til å kunne gi brukeren en oversikt over matvarers næringsinnhold relativt til hverandre, herunder proteiner, karbohydrater og fett. Plottet er laget ved ved bruk av react-plotly.js, et rammeverk for avansert grafisk fremvisning av data som bygger videre på d3.js biblioteket.

Vi ønsket i utgangspunktet å implementere en tredimensjonal fremvisning av næringsinnhold, hvor fett, proteiner og karbohydrater hver fikk sin egen akse. Vi fant imidlertid ikke noe bibliotek som gav oss en grafikk som vi var fornøyd med og vi vurderte også en tredimensjonal løsning å være vanskelig å tolke for brukere. Vi avsto derfor fra denne løsningen og lot heller brukeren selv definere næringsinnhold for aksene. 

Punktplottet er bygd som en egen komponent (Graphics.js) og lagt inn i en modal. Vi valgte også å legge modalen i en egen komponent (Dataviewer.js) da vi mente dette ga en mer oversiktlig struktur som er lettere å forholde seg til. Her er Graphics lagt som en underkomponent til DataViewer, da DataViewer avhenger direkte av Graphics. Ved å legge punktplottet i en modal kan brukeren selv velge om man ønsker å se næringsplottet eller ikke, samtidig som man opprettholder en oversiktlig single-page applikasjon. Vi har valgt å gjøre grafisk fremvisning av data tilgjengelig for tablett og pc, men ikke for mobil fremvisning. Dette skyldes at punktplottet innholder for mye informasjon til å kunne gi en tilstrekkelig fremvisning av data for mobilbrukere. 

## Server

### Oppsett
Databaseoppsettet krever installert og initiert MongoDB. For dette kan man eventuelt følge denne veiledningen: 
[Install MongoDB](https://docs.mongodb.com/manual/installation/).
Serveren startes opp ved kallet `node app.js` inne i server-mappa. Dersom det er første gang man kjører serveren et sted må man, 
i likhet med frontend først installere alle avhengigheter ved kallet `npm install`.

### Oversikt
For å implementere backend har vi brukt [ExpressJS](https://expressjs.com) til 
REST APIet og [Mongoose](https://mongoosejs.com) som database.
Grunnen til at vi valgte Mongoose er at det er et database system som er forholdsvis enkelt å forstå, samtidig som
en av oss hadde benyttet det i et prosjekt tidligere. Hovedfilen, [app.js](./server/app.js) inneholder initiering av Express, 
oppkobling mot databasen og routere for å fordele ulike api-spørringer.
De ulike routerne i vår server er delt mellom kall for oppsett av databasen og en med funksjonaliteten som grensesnittet krever.
Tilgjengelige API-spørringer er nevnt under. Disse behandles i server/routes/food.js og suppleres av server/models/Food.js, som er en
statisk fil som inneholder schema for et Food-objekt i databasen. Denne eksporteres som en mongoose-model og den er dermed
tilgangspunktet med databasen og kan hente og oppdatere databasen ved kall som `User.find()` og `User.findAndUpdate()`.
Dataen vi har benyttet for prosjektet er hentet fra [Matportalen.no](https://www.matportalen.no) sin matvaretabell,
vedlagt i server/data/Matvaretabellen.xlsx.
<br>

For å imøtekomme kravet om at brukere skal kunne manipulere databasen har vi valgt å implementere et ratingssystem
hvor det trigges et PUT-kall til backend, som så sørger for at databasen blir oppdatert for den aktuelle matvaren.

### Utvikling
Under arbeidet med server benyttet vi et utviklingsverktøy som heter [nodemon](https://www.npmjs.com/package/nodemon).
Dette verktøyet gir samme oppførsel når man jobber med node-server som ved arbeid med React, ved at serveren automatisk
restartes når man lagrer endringer i koden, noe som er veldig praktisk.

#### Tredjeparts moduler
Vedlagt data er som nevnt valgt å benytte på .xlsx-format. For å lese fra denne filen og legge til databasen har vi installert og
benyttet oss av tredjepartsmodulen [node-xlsx](https://www.npmjs.com/package/node-xlsx). Vi valgte å benytte denne fordi modulen er
forholdsvis hyppig brukt globalt og vi raskt fikk anvendt den på tiltenkt oppgave, som var å lese av xslx.lagret data.

### Testing
Til testing benyttes [Jest](https://jestjs.io) for å sjekke at de API-kallene som er tilgjengelig returnerer tiltenkte verdier.
I frontend stikktester Cypress også dette ved å trigge ulike kall til databasen i forbindelse med ende-til-ende testing.

### API

Ressurser:
- GET api/food/one/:id
- GET api/food/many
- PUT api/food/:id

#### GET api/food/one/:id

Henter ut utvidet informasjon om én matvare.

| Parameter | Beskrivelse |
| ------ | ------ |
| id - *String* | Den unike id"en som ett food-objekt har i databasen |


Eksempel - **GET api/food/one/5daac8f709725e8d3f60804a**:
```
{
    "Rating": 0,
    "NumOfRatings": 0,
    "_id": "5daac8f709725e8d3f60804a",
    "Name": "Kremfløte, 38 % fett, laktosefri",
    "Fat": 38,
    "Protein": 2.1,
    "Carbohydrates": 3,
    "Category": "Meieriprodukter",
    "KiloJoule": 1493,
    "KiloCalories": 362,
    "__v": 0
}
```



#### GET api/food/many

Henter noe informasjon om flere matvarer innenfor gitte paramtetre, 20 om gangen.

| Parameter | Gyldige verdier | Beskrivelse |
| ------ | ------ | ------ |
| filter - *String* | "Alle"(default), "Div ferdigretter, produkter og ingredienser", "Drikke", "Egg", "Grønnsaker, frukt og bær", "Kjøtt", "Korn- og bakervarer", "Margarin, smør, matolje o.l.", "Meieriprodukter", "Sjømat", "Spedbarnsmat", "Sukker og søte produkter" | Den grupperingen av mat man ønsker å hente ut |
| range - *Number* | Alle numre. 0 er default. | Hvor mange elementer man allerede har hentet ut |
| sort - *String* | "Name", "Fat", "Carbohydrates", "Protein" | Hvilken verdi man ønsker å sortere matvarene etter |
| sortAsc - *String* | Alle | DESC sortering er default. Dersom parameteret er med i spørrigen vil sorteringen være ASC |
| search - *String* | Alle mulige strenger | Spesifiserer ved del-av-navn hvilke objekter man ønsker å inkludere i resultatet |


Eksempel respons:
```
{
  "food": [
      {
          "_id": "5daac8f909725e8d3f6086aa",
          "Name": "Fruktpuré, med eple, jordbær, banan og blåbær, fra 6 mnd, HiPP",
          "Fat": 0.1,
          "Protein": 0.3,
          "Carbohydrates": 11.2
      },
      {
          "_id": "5daac8f909725e8d3f6086a9",
          "Name": "Fruktpuré, med eple, fersken, blåbær og bringebær, fra 6 mnd, HiPP",
          "Fat": 0.1,
          "Protein": 0.4,
          "Carbohydrates": 10.8
      }
  ]
}
```


#### PUT api/food/:id

Legger til en ny vurdering i et produkts rating og returnerer det oppdaterte produktet.

| Parameter | Beskrivelse |
| ------ | ------ |
| id - *String* | Den unike id'en som ett food-objekt har i databasen |


| Body | Gyldige verdier | Beskrivelse |
| ------ | ------ | ------ |
| value - *Number* | 0, 1, 2, 3, 4, 5 | Den nye rating verdien man ønsker å påvirke et produkt med |


Eksempel - **PUT api/food/:id**:
```
{
    "updatedFood": {
        "Rating": 4.5,
        "NumOfRatings": 5,
        "_id": "5d987f528f4d4b59b7dd7f80",
        "Name": "Helmelk, 3,9 % fett",
        "Fat": 3.9,
        "Protein": 3.3,
        "Karbohydrates": 4.6,
        "Category": "Meieriprodukter",
        "KiloJoule": 278,
        "KiloCalories": 67,
        "__v": 0
    }
}
```

## Authors

* **Bjørn Are Therkelsen** - [batherk](https://github.com/batherk)
* **Lars-Magnus Underhaug**
* **Ola Hermann Opheim** - [olahop](https://github.com/olahop)
