import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(function() {
    fetch('/data/projects.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setProjects(data.projects);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>se incarca...</p>;
  }

  return (
    <div>
      <h3>Proiecte</h3>
      <input 
        type="text" 
        placeholder="Caută după titlu..." 
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
    </div>
  );
}

export default ProjectList;