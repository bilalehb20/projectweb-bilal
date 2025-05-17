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
  
