import { useState, useEffect } from 'react';

function App() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

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
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === '' || character.status.toLowerCase() === statusFilter.toLowerCase())
  );

  const favoriteCharacters = characters.filter((character) =>
    favorites.includes(character.id)
  );

  if (loading) return <div style={{ padding: '20px', color: '#1f2937' }}>Laden...</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f3f4f6', color: '#1f2937', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'blue' }}>Rick and Morty Explorer</h1>

      {/* Filters */}
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Zoek op naam..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            width: '300px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        >
          <option value="">Alle Statussen</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      {/* Favoriete karakters */}
      {favoriteCharacters.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>Favoriete Karakters</h2>
          <div style={{ display: 'grid', gap: '20px', marginTop: '10px' }}>
            {favoriteCharacters.map((character) => (
              <div
                key={character.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  padding: '10px',
                  backgroundColor: '#e6f3fa',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                }}
              >
                <img
                  src={character.image}
                  alt={character.name}
                  style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748' }}>{character.name}</h3>
                  <p><strong>Status:</strong> {character.status}</p>
                  <p><strong>Species:</strong> {character.species}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}