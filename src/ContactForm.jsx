import {useState} from 'react';
function ContactForm()
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [feedback, setFeedback] = useState('');
    
    function handleAdd() {
    if (name.trim() === '' || email.trim() === '' || message.trim() === '')
    {
        setFeedback('Completeaza toate campurile!');
        return; // Nu adauga text gol
    }
    setFeedback('Multumim pentru mesaj, ' + name + '!');
    setName('');
    setEmail('');
    setMessage('');
    }
    return (
<div>
<h3>Contact Form</h3>
<input
value={name}
onChange={(e) => setName(e.target.value)}
placeholder="Nume..."
/>
<input
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="Email..."
/>
<textarea
value={message}
onChange={(e) => setMessage(e.target.value)}
placeholder="Mesaj..."
/>
<button onClick={handleAdd}>Submit</button>
<ul>
    {feedback && <li>{feedback}</li>}
</ul>
</div>
);
}
export default ContactForm;


