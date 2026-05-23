import { useState, useEffect } from 'react';
import Card from './Card';
import './styles.css';

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
    console.log("id-ul pe care incerc sa il sterg este:", id);
    try {
      if (window.confirm('sigur doriti sa stergeti acest proiect?')) {
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

      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="titlu proiect..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="text"
          placeholder="tehnologii..."
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          required
          className="form-input"
        />
        <button type="submit" className="btn btn-dark">
          adauga
        </button>
      </form>

      <h3>proiecte</h3>

      <input
        type="text"
        placeholder="cauta dupa titlu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-input"
      />

      {projects
        .filter(function (project) {
          return project.title.toLowerCase().includes(search.toLowerCase());
        })
        .map(function (project) {
          const currentId = project._id || project.id;

          if (editingId === currentId) {
            return (
              <div key={currentId} className="form-container" style={{ borderStyle: 'dashed', borderWidth: '2px', borderColor: '#3498db' }}>
                <h4>editare proiect</h4>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="form-input"
                />
                <input
                  type="text"
                  value={editTech}
                  onChange={(e) => setEditTech(e.target.value)}
                  className="form-input"
                />
                <button onClick={() => handleSaveEdit(currentId)} className="btn btn-blue">
                  salveaza
                </button>
                <button onClick={() => setEditingId(null)} className="btn btn-gray">
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

      <div className="form-container">
        <h4>statistici</h4>
        <p>total proiecte: {projects.length}</p>
        <p>finalizate: {projects.filter(p => p.done).length}</p>
        <p>in lucru: {projects.filter(p => !p.done).length}</p>
      </div>
    </div>
  );
}

export default ProjectList;