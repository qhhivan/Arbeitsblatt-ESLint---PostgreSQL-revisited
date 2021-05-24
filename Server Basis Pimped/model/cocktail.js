const db = require('../db');

// Aufgabe 4
async function getAllCocktails() {
  const { rows } = await db.query('SELECT  cname, preis from cocktail');
  return {
    code: 200,
    data: rows,
  };
}

// Export
module.exports = { getAllCocktails };
