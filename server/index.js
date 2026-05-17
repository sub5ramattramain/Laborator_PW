const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const projects = [
    { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
    { id: 2, title: "Calculator Buget", tech: "JS", done: true },
    { id: 3, title: "Dashboard React", tech: "React", done: false },
    { id: 4, title: "API Meteo", tech: "React, API", done: false },
];

app.get('/', function (req, res) {
    res.json({ message: 'Serverul functioneaza!' });
});

app.get('/api/projects', function (req, res) {
    res.json(projects);
});

app.get('/api/projects/:id', function(req, res) {
  const project = projects.find(function(p) {
    return p.id === parseInt(req.params.id);
  });
  
  if (!project) {
    return res.status(404).json({ error: 'not found' });
  }
  
  res.json(project);
});

app.get('/api/stats', function(req, res) {
  const total = projects.length;
  const finalizate = projects.filter(function(p) { return p.done; }).length;
  const inLucru = projects.filter(function(p) { return !p.done; }).length;
  
  res.json({
    total: total,
    finalizate: finalizate,
    inLucru: inLucru
  });
});

app.post('/api/projects', function(req, res) {
  const newProject = {
    id: projects.length + 1,
    title: req.body.title,
    tech: req.body.tech,
    done: req.body.done || false,
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.delete('/api/projects/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const index = projects.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Not found' });
  }

  projects.splice(index, 1);
  res.json({ message: 'Deleted' });
});

app.listen(PORT, function () {
    console.log('Server pornit pe http://localhost:' + PORT);
});