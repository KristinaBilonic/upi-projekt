import React from 'react';

const Placeno = () => {
  const toTicket = () => location.href = '/karta';
  return (
    <div className="container" style={{ height: '450px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1>Uspješno plaćanje!</h1>
        <div style={{ marginTop: '20px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-check" style={{ color: 'white', fontSize: '30px' }}></i>
          </div>
        </div>
        <button onClick={toTicket} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>Vidi kartu</button>
      </div>
    </div>
  );
};

export default Placeno;