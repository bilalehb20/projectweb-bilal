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
  const favoriteCharacters = characters.filter((character) =>
    favorites.includes(character.id)
  );
  
  if (loading) return <div style={{ padding: '20px', color: '#1f2937' }}>Laden...</div>;
  
  function App() {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: theme === 'light' ? '#f3f4f6' : '#1f2937',
        color: theme === 'light' ? '#1f2937' : '#f3f4f6',
        fontFamily: 'Arial, sans-serif',
        transition: 'all 0.3s',
      }}>
        <button
          onClick={toggleTheme}
          style={{
            padding: '8px 16px',
            backgroundColor: theme === 'light' ? '#007BFF' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
        >
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        {/* Filters */}
        <div style={{ margin: '20px 0', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Zoek op naam..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px', width: '300px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
          >
            <option value="">Alle Statussen</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'status')}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
          >
            <option value="name">Sorteer op Naam</option>
            <option value="status">Sorteer op Status</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
          >
            <option value="asc">Oplopend</option>
            <option value="desc">Aflopend</option>
          </select>
        </div>
  
        {/* Favoriete karakters */}
        {favoriteCharacters.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>Favoriete Karakters</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px' }}>
              {favoriteCharacters.map((character) => (
                <div
                  key={character.id}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    padding: '10px',
                    backgroundColor: '#e6f3fa',
                    width: 'calc(16.666% - 16.67px)',
                    boxSizing: 'border-box',
                  }}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    style={{ width: '80px', height: '80px', borderRadius: '50%', display: 'block', margin: '0 auto' }}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748' }}>{character.name}</h3>
                    <p><strong>Status:</strong> {character.status}</p>
                    <p><strong>Species:</strong> {character.species}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Lijst met gefilterde karakters */}
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>Alle Karakters (Pagina {page})</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px' }}>
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <div
              key={character.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '5px',
                padding: '10px',
                backgroundColor: '#fff',
                width: 'calc(16.666% - 16.67px)',
                boxSizing: 'border-box',
              }}
            >
              <img
                src={character.image}
                alt={character.name}
                style={{ width: '100px', height: '100px', borderRadius: '50%', display: 'block', margin: '0 auto' }}
              />
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748' }}>{character.name}</h3>
                <p><strong>Status:</strong> {character.status}</p>
                <p><strong>Species:</strong> {character.species}</p>
                <p><strong>Gender:</strong> {character.gender}</p>
                <p><strong>Location:</strong> {character.location.name}</p>
                <p><strong>Origin:</strong> {character.origin.name}</p>
              </div>
              <button
                onClick={() => toggleFavorite(character.id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: favorites.includes(character.id) ? '#ff4d4d' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'block',
                  margin: '10px auto 0',
                }}
              >
                {favorites.includes(character.id) ? 'Verwijder Favoriet' : 'Voeg toe als Favoriet'}
              </button>
            </div>
          ))
        ) : (
          <p>Geen karakters gevonden.</p>
        )}
      </div>

      {/* Paginering */}
      <div id="pagination" style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{
            padding: '8px 16px',
            backgroundColor: page === 1 ? '#ccc' : '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: page === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Vorige
        </button>
        <span style={{ padding: '8px' }}>
          Pagina {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          style={{
            padding: '8px 16px',
            backgroundColor: page === totalPages ? '#ccc' : '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: page === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          Volgende
        </button>
      </div>
    </div>
  );

  export default App;