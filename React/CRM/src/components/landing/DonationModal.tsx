import React, { useState } from "react";
import "./DonationModal.css";

interface DonationModalProps {
  onClose: () => void;
  onConfirm: (amount: number, date: string) => void;
}

const DonationModal: React.FC<DonationModalProps> = ({
  onClose,
  onConfirm,
}) => {
  // Iniciar con 200 por defecto
  const [amount, setAmount] = useState<number>(200);
  const [date, setDate] = useState<string>("");
  // En caso de que se elija otra cantidad
  const [customAmount, setCustomAmount] = useState<boolean>(false);

  const handleConfirm = () => {
    if (amount > 0 && date) {
      onConfirm(amount, date);
      onClose();
    } else {
      alert("Por favor ingresa una cantidad válida y una fecha.");
    }
  };

  const selectAmount = (value: number) => {
    setAmount(value);
    // Reiniciar si se selecciona una cantidad predefinida
    setCustomAmount(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Realiza una donación</h2>
        <p>
          ¿Cuánto le gustaría donar? Como colaborador de la Fundación Sanders,
          nos aseguramos de que su donación vaya directamente a apoyar nuestra
          causa.
        </p>

        <div className="amount-selector">
          <div className="currency-input">
            <span>MXN</span>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              min="1"
              className="amount-input"
              // Solo habilitado cuando se elige "Otra cantidad"
              disabled={!customAmount}
            />
          </div>
          <div className="amount-buttons">
            <button
              onClick={() => selectAmount(200)}
              className={amount === 200 ? "selected" : ""}
            >
              $200
            </button>
            <button
              onClick={() => selectAmount(250)}
              className={amount === 250 ? "selected" : ""}
            >
              $250
            </button>
            <button
              onClick={() => selectAmount(300)}
              className={amount === 300 ? "selected" : ""}
            >
              $300
            </button>
            <button
              onClick={() => selectAmount(350)}
              className={amount === 350 ? "selected" : ""}
            >
              $350
            </button>
            <button
              onClick={() => selectAmount(400)}
              className={amount === 400 ? "selected" : ""}
            >
              $400
            </button>
            <button
              onClick={() => {
                setAmount(0);
                setCustomAmount(true);
              }}
              className={customAmount ? "selected" : ""}
            >
              Otra cantidad
            </button>
          </div>
        </div>

        <div className="monthly-option">
          <input type="checkbox" id="monthly" />
          <label htmlFor="monthly">Hacer esta donación mensualmente</label>
        </div>

        <label htmlFor="date">Fecha de la donación:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="modal-buttons">
          <button onClick={onClose} className="close-button">
            Cerrar
          </button>
          <button onClick={handleConfirm} className="confirm-button">
            Confirmar donación
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
