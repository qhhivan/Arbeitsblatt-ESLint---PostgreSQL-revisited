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
    [name],
  );
  return {
    code: 200,
    data: rows,
  };
}

// Aufgabe 6
async function filterByPrice(price) {
  const { rows } = await db.query(
    'SELECT cname, preis from cocktail where preis < $1 order by preis desc',
    [price],
  );
  return {
    code: 200,
    data: rows,
  };
}

// Aufgabe 7
async function deleteCocktail(name) {
  const { rows } = await db.query('SELECT * from cocktail where cname = $1', [
    name,
  ]);
  if (rows.length > 0) {
    await db.query(
      'DELETE from besteht where (SELECT cid from cocktail where  cname = $1 ) = cid',
      [name],
    );
    await db.query(
      'DELETE from bestellt where (SELECT cid from cocktail where  cname = $1) = cid',
      [name],
    );
    await db.query('DELETE from cocktail where cname = $1', [name]);

    return {
      code: 200,
      data: `Cocktail ${name} is deleted`,
    };
  }
  return {
    code: 400,
    data: `Cocktail ${name} not found `,
  };
}
// Aufgabe 8
async function createCocktail({ name, preis, zubereitung, kid, zgid, sgid }) {
  const { rows } = await db.query(
    'INSERT INTO cocktail (cname, preis, zubereitung, kid, zgid, sgid) values ($1, $2, $3, $4, $5, $6) returning cid;',
    [name, preis, zubereitung, kid, zgid, sgid],
  );
  console.log(rows.cid);
  return {
    code: 200,
    data: `Your new Cocktail has ID ${rows.cid}`,
  };
}

// Aufgabe 9
async function updatePrice(name, preis) {
  await db.query('UPDATE cocktail set preis = $1 where cname = $2', [
    preis,
    name,
  ]);
  return {
    code: 200,
    data: `New Price: ${preis}`,
  };
}

// Export
module.exports = {
  getAllCocktails,
  getCocktail,
  filterByPrice,
  deleteCocktail,
  createCocktail,
  updatePrice,
};
