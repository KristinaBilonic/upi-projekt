import React from 'react';

const NijePlaceno = () => {
  const toOrder = () => location.href = '/narudzba';
  return (
    <div className="container" style={{ height: '450px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1>Neuspješno plaćanje</h1>
        <div style={{ marginTop: '20px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-times" style={{ color: 'white', fontSize: '30px' }}></i>
          </div>
        </div>
        <button onClick={toOrder} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>Povratak na narudžbu</button>
      </div>
    </div>
  );
};

export default NijePlaceno;