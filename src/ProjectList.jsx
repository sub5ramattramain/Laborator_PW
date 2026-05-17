import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(function() {
    fetch('http://localhost:3000/api/projects')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>se incarca...</p>;
  }

  return (
    <div>
      <h3>proiecte</h3>
      
      <input 
        type="text" 
        placeholder="cauta dupa titlu..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        style={{ marginBottom: '15px', padding: '5px' }}
      />
      
      {projects
        .filter(function(project) {
          return project.title.toLowerCase().includes(search.toLowerCase());
        })
        .map(function(project) {
          return <Card key={project.id} {...project} />;
        })}

      <div style={{ border: '1px solid #ccc', marginTop: '20px', padding: '10px', borderRadius: '5px' }}>
        <h4>statistici</h4>
        <p>total proiecte: {projects.length}</p>
        <p>finalizate: {projects.filter(p => p.done).length}</p>
        <p>in lucru: {projects.filter(p => !p.done).length}</p>
      </div>
    </div>
  );
}

export default ProjectList;