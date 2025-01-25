import React, { useState, useEffect } from 'react';
import './ucitavanje.css';

function Ucitavanje() {
  const [showPage, setShowPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loading-page">
      {showPage && (
        <div>
          <h1>Obrada...</h1>
          <div className="loading-icon">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ucitavanje;