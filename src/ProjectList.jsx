import { useState, useEffect } from 'react';
import Card from './Card'; 

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function() {
    fetch('/data/projects.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(function(err) {
        setError('eroare la incarcarea datelor');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>se incarca...</p>;
  }

  return (
    <div>
      <h3>Proiecte</h3>
      {projects.map((project) => (  
        <Card key={project.id} {...project} />
      ))}
    </div>
  );
}

export default ProjectList;