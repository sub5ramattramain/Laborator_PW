import { useState, useEffect } from 'react';

function Home() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function () {
        fetch('http://localhost:3000/api/stats')
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('nu s-au putut incarca statisticile de la server.');
                }
                return response.json();
            })
            .then(function (data) {
                setStats(data);
                setLoading(false);
            })
            .catch(function (err) {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>se incarca statisticile globale...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>eroare: {error}</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>bludington - pagina principala</h1>
            <p>salut, cam asta e situatia la proiecte:</p>

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', minWidth: '150px' }}>
                    <h3>total proiecte</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.total}</p>
                </div>

                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', minWidth: '150px' }}>
                    <h3>finalizate</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>{stats.done}</p>
                </div>

                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', minWidth: '150px' }}>
                    <h3>in lucru</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f39c12' }}>{stats.inProgress}</p>
                </div>
            </div>
        </div>
    );
}

export default Home;