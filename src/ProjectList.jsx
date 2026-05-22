import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTech, setEditTech] = useState('');

  useEffect(function () {
    fetch('http://localhost:3000/api/projects')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('nu s-au putut descarca datele de la server.');
        }
        return response.json();
      })
      .then(function (data) {
        setProjects(data);
        setLoading(false);
      })
      .catch(function (err) {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, tech: tech, done: false }),
      });

      if (!response.ok) {
        throw new Error('eroare la adaugarea proiectului');
      }

      const newProject = await response.json();

      setProjects([...projects, newProject]);
      setTitle('');
      setTech('');
    } catch (err) {
      console.error('eroare:', err);
    }
  }

  async function handleDelete(id) {
    console.log("ID-ul pe care incerc sa il sterg este:", id);
    try {
      if (window.confirm('Sigur doriti sa stergeti acest proiect?')) {
        const response = await fetch('http://localhost:3000/api/projects/' + id, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('eroare la stergerea proiectului');
        }

        setProjects(projects.filter(p => p._id !== id));

      }
    } catch (err) {
      console.error('eroare:', err);
    }
  }

  async function handleToggle(id, currentDone) {
    try {
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !currentDone }),
      });

      if (!response.ok) {
        throw new Error('eroare la toggle');
      }

      const updatedProject = await response.json();

      setProjects(projects.map(p => p._id === id ? updatedProject : p))
    } catch (error) {
      console.error(error);
    }
  }

  function startEditing(project) {
    setEditingId(project._id || project.id);
    setEditTitle(project.title);
    setEditTech(project.tech);
  }

  async function handleSaveEdit(id) {
    try {
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, tech: editTech }),
      });

      if (!response.ok) {
        throw new Error('eroare la salvarea editarii');
      }

      const updatedProject = await response.json();
      setProjects(projects.map(p => (p._id || p.id) === id ? updatedProject : p));
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <p>se incarca...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>eroare: {error}</p>;
  }

  return (
    <div>
      <h3>adauga proiect</h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <input
          type="text"
          placeholder="titlu proiect..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%', maxWidth: '300px' }}
        />
        <input
          type="text"
          placeholder="tehnologii..."
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%', maxWidth: '300px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '4px' }}>
          adauga
        </button>
      </form>

      <h3>proiecte</h3>

      <input
        type="text"
        placeholder="cauta dupa titlu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '15px', padding: '5px', width: '100%', maxWidth: '300px' }}
      />

      {projects
        .filter(function (project) {
          return project.title.toLowerCase().includes(search.toLowerCase());
        })
        .map(function (project) {
          const currentId = project._id || project.id;

          if (editingId === currentId) {
            return (
              <div key={currentId} style={{ border: '2px dashed #3498db', padding: '15px', margin: '10px 0', borderRadius: '5px' }}>
                <h4>editare proiect</h4>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%', maxWidth: '300px' }}
                />
                <input
                  type="text"
                  value={editTech}
                  onChange={(e) => setEditTech(e.target.value)}
                  style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%', maxWidth: '300px' }}
                />
                <button
                  onClick={() => handleSaveEdit(currentId)}
                  style={{ padding: '5px 10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', marginRight: '10px', cursor: 'pointer' }}
                >
                  salveaza
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  style={{ padding: '5px 10px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  anuleaza
                </button>
              </div>
            );
          }

          return (
            <Card
              key={currentId}
              {...project}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={() => startEditing(project)}
            />
          );
        })}

      <div style={{ border: '1px solid #ccc', marginTop: '20px', padding: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <h4>statistici</h4>
        <p>total proiecte: {projects.length}</p>
        <p>finalizate: {projects.filter(p => p.done).length}</p>
        <p>in lucru: {projects.filter(p => !p.done).length}</p>
      </div>
    </div>
  );
}

export default ProjectList;