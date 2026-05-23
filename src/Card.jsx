import './styles.css';

function Card({ id, _id, title, tech, done, onDelete, onToggle, onEdit }) {
  const currentId = _id || id;
  const cardClass = done ? 'card card-done' : 'card card-progress';
  
  return (
    <div className={cardClass}>
      <h4 style={{ marginTop: 0 }}>{title}</h4>
      <p><strong>tehnologii:</strong> {tech}</p>
      <p>
        <strong>status:</strong> {done ? 'finalizat' : 'in lucru'}
      </p>
      
      <button className={done ? 'btn btn-gray' : 'btn btn-green'} onClick={() => onToggle(currentId, done)}>
        {done ? 'redeschide' : 'finalizeaza'}
      </button>

      <button className="btn btn-blue" onClick={onEdit}>
        editeaza
      </button>

      <button className="btn btn-red" onClick={() => onDelete(currentId)}>
        sterge
      </button>
    </div>
  );
}

export default Card;