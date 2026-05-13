function Card({ title, tech, done }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
      <h4>{title}</h4>
      <p><strong>something here mate</strong> {tech}</p>
      <p>
        <strong>Status:</strong> {done ? 'finalizat' : 'in lucru'}
      </p>
    </div>
  );
}

export default Card;