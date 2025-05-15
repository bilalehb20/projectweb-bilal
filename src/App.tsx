import { useState, useEffect } from 'react';

function App() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        setCharacters(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Fout bij het ophalen van data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ padding: '20px', color: '#1f2937' }}>Laden...</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f3f4f6', color: '#1f2937', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'blue' }}>Rick and Morty Explorer</h1>
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {characters.map((character) => (
          <div
            key={character.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '5px',
              padding: '10px',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
            }}
          >
            <img
              src={character.image}
              alt={character.name}
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748' }}>{character.name}</h2>
              <p><strong>Status:</strong> {character.status}</p>
              <p><strong>Species:</strong> {character.species}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;