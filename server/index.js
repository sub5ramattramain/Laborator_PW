const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dashboard')
    .then(function () {
        console.log('Conectat la MongoDB!');
    })
    .catch(function (err) {
        console.error('Eroare conectare MongoDB:', err);
    });
const PORT = 3000;


app.use(cors());
app.use(express.json());

const Project = require('./models/Project');

app.get('/', function (req, res) {
    res.json({ message: 'Serverul functioneaza!' });
});

app.get('/api/projects', async function (req, res) {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Eroare ' + err });
    }
});

/*app.get('/api/projects/:id', function(req, res) {
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
*/
app.post('/api/projects', async function (req, res) {
    try {
        const newProject = new Project({
            title: req.body.title,
            tech: req.body.tech,
            done: req.body.done || false,
        });
        const saved = await newProject.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/projects/:id', function (req, res) {
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