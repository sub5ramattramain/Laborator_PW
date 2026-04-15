import Card from './Card';
import { useState } from 'react';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ContactForm from './ContactForm';
import ProjectList from './ProjectList';

const projects = [
{ title: "Proiect 1", description: "Pagina personala" },
{ title: "Proiect 2", description: "Calculator buget" },
{ title: "Proiect 3", description: "Dashboard React" },
];

function App() {
  const [count, setCount] = useState(0);
  
return (
<div>
<h1>Dashboard</h1>
{projects.map(function(item, index) {
return <Card key={index} title={item.title} description={item.description} />;
})}
<QuickNote />
<TodoList />
<ContactForm />
<ProjectList />
<p>Numele vostru </p><br></br>
<p>Ai apasat de {count} ori</p>
<button onClick={() => setCount(count + 1)}>Click</button>
<button onClick={() => setCount(count-1)}>Unclick</button>
<button onClick={() => setCount(0)}>Reset</button>
</div>
);
}
export default App;