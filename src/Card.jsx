function Card({ id, _id, title, tech, done, onDelete, onToggle, onEdit }) {
  const currentId = _id || id;
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
      <h4>{title}</h4>
      <p><strong>tehnologii:</strong> {tech}</p>
      <p>
        <strong>status:</strong> {done ? 'finalizat' : 'in lucru'}
      </p>
      <button
        onClick={() => onToggle(currentId, done)}
        style={{
          marginTop: '10px',
          marginRight: '10px',
          padding: '5px 10px',
          backgroundColor: done ? '#f39c12' : '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        schimba status
      </button>
      <button
        onClick={onEdit}
        style={{
          marginTop: '10px',
          marginRight: '10px',
          padding: '5px 10px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        editeaza
      </button>
      <button
        onClick={() => onDelete(currentId)}
        style={{
          marginTop: '10px',
          padding: '5px 10px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        sterge
      </button>
    </div>
  );
}

export default Card;