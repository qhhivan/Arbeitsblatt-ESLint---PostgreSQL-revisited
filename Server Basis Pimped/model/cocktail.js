const db = require('../db');

// Aufgabe 4
async function getAllCocktails() {
  const { rows } = await db.query('SELECT  cname, preis from cocktail');
  return {
    code: 200,
    data: rows,
  };
}

// Aufgabe 5
async function getCocktail(name) {
  const { rows } = await db.query(
    'SELECT zbez FROM zutat join besteht on zutat.zid = besteht.zid join cocktail c on besteht.cid = c.cid where cname = $1',
    [name]
  );
  return {
    code: 200,
    data: rows,
  };
}

// Export
module.exports = { getAllCocktails, getCocktail };
