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
![Screenshot 2025-05-22 160617](https://github.com/user-attachments/assets/58abe17d-9d6d-4257-b43e-a2b23a4aa20e)
![Screenshot 2025-05-22 160714](https://github.com/user-attachments/assets/08d95e06-b4d0-44ad-8ace-825e75f47acd)
![Screenshot 2025-05-22 160636](https://github.com/user-attachments/assets/6e34c24b-b726-465a-ab4c-071a08734035)
![Screenshot 2025-05-22 162852](https://github.com/user-attachments/assets/5f6f1fa8-dd4d-41e5-952c-b8757cff6305)
![Screenshot 2025-05-22 162405](https://github.com/user-attachments/assets/cb91f79c-37be-4a03-b67f-317d01a7aea0)
![Screenshot 2025-05-22 162307](https://github.com/user-attachments/assets/914ad813-9ffa-42fa-8b83-8d9c3da514c8)
![Screenshot 2025-05-22 161927](https://github.com/user-attachments/assets/7e4bbaf5-a217-4dc7-8e4f-d799660a6e61)
![Screenshot 2025-05-22 161248](https://github.com/user-attachments/assets/c70f44f9-189c-4d34-9584-d75357524a9b)


📚 Gebruikte bronnen

Rick and Morty API - rickandmortyapi.com
Vite - vitejs.dev
MDN Web Docs (Fetch, LocalStorage, Arrays)
W3Schools (React, JavaScript, CSS)
Stack Overflow (voor kleine fixes)

Voettekst:
Talen: JavaScript, CSS, HTML

Bedankt voor het checken van mijn app! 😄
