 Rick and Morty Karakter App
Projectbeschrijving
Rick and Morty Karakter App is een toffe single-page webapp gemaakt voor Web Advanced. Hij gebruikt de Rick and Morty API om karakters te laten zien, te zoeken, te filteren, te sorteren en op te slaan als favoriet. Je kunt zelfs wisselen tussen talen en thema's!
Functionaliteiten

Zoeken op naam
Filteren op status (Alive, Dead, Unknown)
Sorteren op naam of status (A-Z/Z-A)
Favorieten opslaan met een sterretje (in localStorage)
Paginering om door karakters te bladeren
Licht/donker thema wisselen
Live tijd (bijv. "donderdag 22 mei 2025 16:30")
Taal wisselen (NL/EN)
Responsief ontwerp
Gemaakt met pijlfuncties, .map(), .filter(), ternaire operatoren, async/await

Gebruikte API's
De applicatie maakt gebruik van de gratis Rick and Morty API, met de volgende endpoints:

Karakters:https://rickandmortyapi.com/api/character?page={page}Voor het ophalen van de karakterlijst met paginering.

Karakterdetails:https://rickandmortyapi.com/api/character/{id}Voor extra informatie over een karakter, zoals locatie en oorsprong.

Afleveringen:https://rickandmortyapi.com/api/episode(Gedeeltelijk gebruikt voor afleveringsinformatie.)


Andere gebruikte tools en API's:



API Naam
Beschrijving
Link / Endpoint



Fetch API
Data ophalen
MDN Fetch


LocalStorage API
Opslaan in browser
MDN LocalStorage


JavaScript Array
.filter(), .map()
MDN Array


Vite Build Tool
Snel bouwen
Vite


Implementatie van technische vereisten



Vereiste
Lijnnummers
Waar in code?



✅ Zoekfunctie
225, 168-174
Zoekbalk en handleSearch


✅ Filteren op status
200-208, 269
Dropdown en .filter() voor status


✅ Sorteren op naam
200-208, 280, 289
Sorteert met .sort() (A-Z/Z-A)


✅ Favorieten opslaan
149-152, 157-160
Sterretje en localStorage


✅ Paginering
135-145, 332-338
Knoppen en API per pagina


✅ Licht/donker thema
162-165, 213
Thema-toggle en className


✅ Live tijdweergave
166-180, 257-259
Tijd met useEffect en <div>


✅ Taal wisselen
182-184, 14-118
Taalkeuze en vertalingen


✅ Elementen selecteren
225, 269, 280, 289
Zoekbalk en dropdowns (value=)


✅ Elementen manipuleren
257-259, 301-320, 352-370
Tijd tonen, kaarten met .map()


✅ Evenementen koppelen
220, 225, 269, 280, 289, 315, 366
Knoppen en inputs (onClick)


✅ Constanten (const)
14-118, 120-133
Vertalingen en states


✅ Sjabloonliteralen
213, 303, 354
Classes en alt-teksten (${...})


✅ Iteratie-arrays
200-208, 301-320, 352-370
Filteren, sorteren, kaarten (.map())


✅ Arraymethodes
200-208, 301-320, 352-370
.filter(), .sort(), .map()


✅ Pijlfuncties
155, 162, 168, 169, 182, 225, 269, 280, 289, 302, 353
Events en logica (() => {})


✅ Ternaire operator
213, 238, 239, 316, 367
Classes en sterren (? :)


✅ Callback-functies
200-208, 352
In .filter() en .sort()


✅ Beloften
135-145
API ophalen (async, await)


✅ Async & Wachten
135-145
API calls (await fetch)


✅ Gegevens ophalen
139-140
API-data laden (.json())


✅ JSON manipuleren
139-140
Data in setCharacters


✅ Lokale opslag
149-152, 157-160, 184
Favorieten en settings


✅Validatie formulieren
✅
gedaan


✅ Styling en lay-out
213, 225, 257, 269
Classes (className=...) in App.tsx en App.css


✅ Vite-project
1-404
Gemaakt met Vite (import)


✅ observer-API
✅
gedaan


Installatie en opstarten

Repo klonen
git clone https://github.com/bilalehb20/projectweb-bilal.git


Naar map gaan
cd projectweb-bilal


Dependencies installeren
npm install


Dev-server starten
npm run dev


Open browserGa naar http://localhost:5173 (of wat Vite zegt).


🖼️ Screenshots applicatie en chat
![Screenshot 2025-05-22 160617](https://github.com/user-attachments/assets/873d8e3e-1503-4059-9fed-bc2bed17eb35)

![Screenshot 2025-05-22 160617](https://github.com/user-attachments/assets/68171fa9-f9ad-445b-819f-3d04a329fb2c)

![Screenshot 2025-05-22 160714](https://github.com/user-attachments/assets/bf3ceaab-5026-44ac-97cc-d8327df2eb9a)

![Screenshot 2025-05-22 160714](https://github.com/user-attachments/assets/271e9f34-7d08-4687-a2d8-68fd4b10dafa)

![Screenshot 2025-05-22 161927](https://github.com/user-attachments/assets/0d33c560-2997-464c-9040-010c6e0d5913)
![Screenshot 2025-05-22 162307](https://github.com/user-attachments/assets/6d69dbd9-8ac4-4f56-a2aa-cc15ee931065)

![Screenshot 2025-05-22 162405](https://github.com/user-attachments/assets/b60fdd38-9d83-4e30-a808-f18c6092fc77)

![Screenshot 2025-05-22 162852](https://github.com/user-attachments/assets/9d21d281-fac1-4314-abaa-27a9ce2314e8)

📚 Gebruikte bronnen

Rick and Morty API - rickandmortyapi.com
Vite - vitejs.dev
MDN Web Docs (Fetch, LocalStorage, Arrays)
W3Schools (React, JavaScript, CSS)
Stack Overflow (voor kleine fixes)

Voettekst:
Talen: JavaScript, CSS, HTML

Bedankt voor het checken van mijn app! 😄
