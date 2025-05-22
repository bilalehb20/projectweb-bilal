import { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.jpg';
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: { name: string };
  origin: { name: string };
}
const translations = {
  nl: {
    searchPlaceholder: 'Zoek op naam...',
    searchButton: 'Zoekopdracht',
    lightMode: 'Lichtmodus',
    darkMode: 'Donkermodus',
    home: 'Thuis',
    favorites: 'Favorieten',
    language: 'Taal:',
    allStatuses: 'Alle Statussen',
    sortByName: 'Sorteren op Naam',
    sortByStatus: 'Sorteren op Status',
    asc: 'A-Z',
    desc: 'Z-A',
    noCharacters: 'Geen karakters gevonden.',
    noFavorites: 'Geen favorieten toegevoegd.',
    allCharacters: 'Alle Karakters (Pagina',
    myFavoriteCharacters: 'Mijn Favoriete Karakters',
    previous: 'Vorige',
    pageOf: 'Pagina',
    next: 'Volgende',
    status: 'Status',
    species: 'Soort',
    gender: 'Geslacht',
    location: 'Locatie',
    origin: 'Oorsprong',
    // Status vertalingen
    statusAlive: 'Levend',
    statusDead: 'Dood',
    statusUnknown: 'onbekend',
    // Soort vertalingen
    speciesHuman: 'Mens',
    speciesAlien: 'Buitenaards wezen',
    // Geslacht vertalingen
    genderMale: 'Man',
    genderFemale: 'Vrouwelijk',
    genderUnknown: 'onbekend',
    // Locatie en oorsprong vertalingen (specifieke locaties)
    locationAbadango: 'Abadango',
    locationTesticleMonsterDimension: 'Testikel Monster Dimensie',
    locationCitadelOfRicks: 'Citadel van Ricks',
    locationWorldendersLair: 'Wereldender\'s hol',
    locationEarthReplacementDimension: 'Aarde (Vervangingsdimensie)',
    locationEarthC137: 'Aarde (C-137)',
    locationAnatomyPark: 'Anatomiepark',
    locationInterdimensionalCable: 'Interdimensionale kabel',
    originAbadango: 'Abadango',
    originUnknown: 'onbekend',
    // Alt-tekst vertalingen
    logoAlt: 'Rick en Morty Logo',
    characterImageAltPrefix: 'Afbeelding van', // Voor "Afbeelding van [character.name]"
  },
en: {
    searchPlaceholder: 'Search by name...',
    searchButton: 'Search',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    home: 'Home',
    favorites: 'Favorites',
    language: 'Language:',
    allStatuses: 'All Statuses',
    sortByName: 'Sort by Name',
    sortByStatus: 'Sort by Status',
    asc: 'A-Z',
    desc: 'Z-A',
    noCharacters: 'No characters found.',
    noFavorites: 'No favorites added.',
    allCharacters: 'All Characters (Page',
    myFavoriteCharacters: 'My Favorite Characters',
    previous: 'Previous',
    pageOf: 'Page',
    next: 'Next',
    status: 'Status',
    species: 'Species',
    gender: 'Gender',
    location: 'Location',
    origin: 'Origin',
    // Status vertalingen
    statusAlive: 'Alive',
    statusDead: 'Dead',
    statusUnknown: 'unknown',
    // Soort vertalingen
    speciesHuman: 'Human',
    speciesAlien: 'Alien',
    // Geslacht vertalingen
    genderMale: 'Male',
    genderFemale: 'Female',
    genderUnknown: 'unknown',
    // Locatie en oorsprong vertalingen (specifieke locaties)
    locationAbadango: 'Abadango',
    locationTesticleMonsterDimension: 'Testicle Monster Dimension',
    locationCitadelOfRicks: 'Citadel of Ricks',
    locationWorldendersLair: 'Worldender\'s Lair',
    locationEarthReplacementDimension: 'Earth (Replacement Dimension)',
    locationEarthC137: 'Earth (C-137)',
    locationAnatomyPark: 'Anatomy Park',
    locationInterdimensionalCable: 'Interdimensional Cable',
    originAbadango: 'Abadango',
    originUnknown: 'unknown',
    // Alt-tekst vertalingen
    logoAlt: 'Rick and Morty Logo',
    characterImageAltPrefix: 'Image of', // Voor "Image of [character.name]"
  },
};
function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>(''); // Voor zoekinvoer
  const [favorites, setFavorites] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'status'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [view, setView] = useState<'home' | 'favorites'>('home');
  const [language, setLanguage] = useState<string>('nl'); // Voor taalkeuze
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await response.json();
        setCharacters(data.results as Character[]);
        setTotalPages(data.info.pages as number);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
     fetchData();
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites) as number[]);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme as 'light' | 'dark');
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) setLanguage(savedLanguage);
    else localStorage.setItem('language', language); // Sla standaardtaal op
  }, [page]);
  const toggleFavorite = (id: number): void => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
const toggleTheme = (): void => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (e.type === 'click') {
      setSearchTerm(inputValue);
    } else if (e.type === 'keydown' && 'key' in e && (e as React.KeyboardEvent<HTMLInputElement>).key === 'Enter') {
      setSearchTerm(inputValue);
    }
  };
const resetState = () => {
    setSearchTerm(''); // Reset zoekterm
    setInputValue(''); // Reset invoerveld
    setStatusFilter(''); // Reset statusfilter
    setPage(1); // Reset pagina naar 1
    setView('home'); // Zorg dat de view naar Home gaat
  };
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };
  const filteredCharacters = characters
    .filter(
      (character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === '' || character.status.toLowerCase() === statusFilter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      return sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
    });
  const favoriteCharacters = characters.filter((character) => favorites.includes(character.id));
  const t = translations[language as 'nl' | 'en'];
  const translateCharacterData = (key: string, value: string) => {
    const translationKey = `${key}${value.replace(/\s/g, '')}`; // Bijv. statusAlive, locationAbadango
    return t[translationKey as keyof typeof t] || value; // Val terug op originele waarde als vertaling niet bestaat
  };
if (loading) {
  return <div className="text-center mt-10 text-lg text-gray-600">Loading...</div>;
}
if (!characters.length && !loading) {
  return <div className="text-center mt-10 text-lg text-red-600">Geen personages gevonden of fout bij het laden.</div>;
}
  return (
    <div className={`app-container ${theme}`}>
      {/* Header met logo en zoekbalk */}
      <header className="app-header">
        <img
          src={logo}
          alt={t.logoAlt} // Vertaalde alt-tekst voor logo
          className="logo"
          onClick={resetState} // Reset bij klik op logo
        />
        <div className="search-container">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            onKeyDown={handleSearch}
            className="search-bar"
          />
          <button onClick={handleSearch} className="search-button">
            {t.searchButton}
          </button>
        </div>
      </header>
      {/* Navigatie */}
      <nav className="nav-bar">
        <button onClick={resetState} className={view === 'home' ? 'active' : ''}>
          {t.home}
        </button>
        <button onClick={() => setView('favorites')} className={view === 'favorites' ? 'active' : ''}>
          {t.favorites}
        </button>
      </nav>
      {/* Gebruikersvoorkeuren */}
      <div className="preferences-section">
        <div className="preferences-options">
          <button onClick={resetState} className="preference-button">
            {t.home}
          </button>
          <button onClick={() => setView('favorites')} className="preference-button">
            {t.favorites}
          </button>
          <label className="language-label">
            {t.language}
            <select value={language} onChange={handleLanguageChange}>
              <option value="nl">{language === 'nl' ? 'Nederlands' : 'Dutch'}</option>
              <option value="en">{language === 'nl' ? 'Engels' : 'English'}</option>
            </select>
          </label>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? t.darkMode : t.lightMode}
          </button>
        </div>
      </div>
       {/* Inhoud op basis van view */}
      {view === 'home' ? (
        <>
          <div className="filters">
            <select
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
            >
              <option value="">{t.allStatuses}</option>
              <option value="Alive">{translateCharacterData('status', 'Alive')}</option>
              <option value="Dead">{translateCharacterData('status', 'Dead')}</option>
              <option value="unknown">{translateCharacterData('status', 'unknown')}</option>
            </select>
            <select
              value={sortBy}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSortBy(e.target.value as 'name' | 'status')
              }
            >
              <option value="name">{t.sortByName}</option>
              <option value="status">{t.sortByStatus}</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSortOrder(e.target.value as 'asc' | 'desc')
              }
            >
              <option value="asc">{t.asc}</option>
              <option value="desc">{t.desc}</option>
            </select>
          </div>
          <div className="character-section">
            <h2>{t.allCharacters} {page})</h2>
            <div className="character-list">
              {filteredCharacters.length > 0 ? (
                filteredCharacters.map((character) => (
                  <div key={character.id} className="character-card">
                    <img
                      src={character.image}
                      alt={`${t.characterImageAltPrefix} ${character.name}`} // Vertaalde alt-tekst voor karakterafbeeldingen
                    />
                    <h3>{character.name}</h3>
                    <p><strong>{t.status}:</strong> {translateCharacterData('status', character.status)}</p>
                    <p><strong>{t.species}:</strong> {translateCharacterData('species', character.species)}</p>
                    <p><strong>{t.gender}:</strong> {translateCharacterData('gender', character.gender)}</p>
                    <p><strong>{t.location}:</strong> {translateCharacterData('location', character.location.name)}</p>
                    <p><strong>{t.origin}:</strong> {translateCharacterData('origin', character.origin.name)}</p>
                    <span
                      onClick={() => toggleFavorite(character.id)}
                      className={`favorite-star ${favorites.includes(character.id) ? 'selected' : ''}`}
                    >
                      {favorites.includes(character.id) ? '★' : '☆'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="no-results">{t.noCharacters}</p>
              )}
            </div>
          </div>
           <div className="pagination">
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              {t.previous}
            </button>
            <span>{t.pageOf} {page} van {totalPages}</span>
            <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
              {t.next}
            </button>
          </div>
        </>
      ) : (
        <div className="favorites-section">
          <h2>{t.myFavoriteCharacters}</h2>
          {favoriteCharacters.length > 0 ? (
            <div className="character-list">
              {favoriteCharacters.map((character) => (
                <div key={character.id} className="character-card">
                  <img
                    src={character.image}
                    alt={`${t.characterImageAltPrefix} ${character.name}`} // Vertaalde alt-tekst voor karakterafbeeldingen
                  />
                  <h3>{character.name}</h3>
                  <p><strong>{t.status}:</strong> {translateCharacterData('status', character.status)}</p>
                  <p><strong>{t.species}:</strong> {translateCharacterData('species', character.species)}</p>
                  <p><strong>{t.gender}:</strong> {translateCharacterData('gender', character.gender)}</p>
                  <p><strong>{t.location}:</strong> {translateCharacterData('location', character.location.name)}</p>
                  <p><strong>{t.origin}:</strong> {translateCharacterData('origin', character.origin.name)}</p>
                  <span
                    onClick={() => toggleFavorite(character.id)}
                    className={`favorite-star ${favorites.includes(character.id) ? 'selected' : ''}`}
                  >
                    {favorites.includes(character.id) ? '★' : '☆'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">{t.noFavorites}</p>
          )}
        </div>
      )}
    </div>
  );
}
export default App;
