function Card({ id, _id, title, tech, done, onDelete }) {
  const currentId = _id || id;
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
      <h4>{title}</h4>
      <p><strong>tehnologii:</strong> {tech}</p>
      <p>
        <strong>status:</strong> {done ? 'finalizat' : 'in lucru'}
      </p>
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