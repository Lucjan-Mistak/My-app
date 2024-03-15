import React from 'react';

function Production() {
  return (
    <div className="container">
      <h2>Produkcja</h2>
      <form>
        <div>
          <label>Wybierz produkt:</label>
          <select>
            <option value="22x145x1200 I">22x145x1200 I</option>
            <option value="22x145x1200 IA">22x145x1200 IA</option>
            <option value="22x145x1200 IB">22x145x1200 IB</option>
            <option value="22x145x1200 II">22x145x1200 II</option>
            <option value="22x100x1200 I">22x100x1200 I</option>
            <option value="22x100x1200 IA">22x100x1200 IA</option>
            <option value="22x100x1200 IB">22x100x1200 IB</option>
            <option value="22x100x1200 II">22x100x1200 II</option>
            <option value="22x145x800 I">22x145x800 I</option>
            <option value="22x145x800 II">22x145x800 II</option>
            <option value="Kant 78x100">Kant 78x100</option>
            <option value="Kant 78x145">Kant 78x145</option>
          </select>
        </div>
        <div>
          <label>Ilość:</label>
          <input
            type="number"
          />
        </div>
        <button type="submit">Dodaj do raportu produkcji</button>
      </form>
    </div>
  );
}

export default Production;