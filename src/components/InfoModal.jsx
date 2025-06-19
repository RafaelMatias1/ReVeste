import React from 'react';
import './InfoModal.css';

const InfoModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="info-modal-overlay">
      <div className="info-modal-card">
        <button className="info-modal-close" onClick={onClose}>×</button>
        <h2>{title}</h2>
        <div className="info-modal-content">{children}</div>
      </div>
    </div>
  );
};

export default InfoModal;
