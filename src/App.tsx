import { useState, useEffect } from 'react';

// State voor karakters en andere functionaliteiten
const [characters, setCharacters] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('');
const [favorites, setFavorites] = useState<number[]>([]);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [statusFilter, setStatusFilter] = useState('');
const [sortBy, setSortBy] = useState<'name' | 'status'>('name');
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
const [theme, setTheme] = useState<'light' | 'dark'>('light');

// Fetch data bij paginawijziging
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setLoading(false);
    } catch (error) {
      console.error('Fout bij het ophalen van data:', error);
      setLoading(false);
    }
  };
  fetchData();

  const savedFavorites = localStorage.getItem('favorites');
  if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
}, [page]);

// Observer voor lazy loading
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }, { threshold: 0.1 });

  const target = document.querySelector('#pagination');
  if (target) observer.observe(target);

  return () => observer.disconnect();
}, [page, totalPages]);

// Toggle favorieten
const toggleFavorite = (id: number) => {
  let updatedFavorites: number[];
  if (favorites.includes(id)) {
    updatedFavorites = favorites.filter((favId) => favId !== id);
  } else {
    updatedFavorites = [...favorites, id];
  }
  setFavorites(updatedFavorites);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

// Toggle thema
const toggleTheme = () => {
  setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
};

// Filter en sorteer karakters
const filteredCharacters = characters
  .filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === '' || character.status.toLowerCase() === statusFilter.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else {
      return sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
    }
  });