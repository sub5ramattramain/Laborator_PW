import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>404 — pagina nu exista</h2>
      <p>adresa url este invalida \(^_^)/</p>
      
      <Link 
        to="/" 
        style={{ 
          display: 'inline-block', 
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#2C3E50', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '6px' 
        }}
      >
        intoarce-te acasa
      </Link>
    </div>
  );
}

export default NotFound;