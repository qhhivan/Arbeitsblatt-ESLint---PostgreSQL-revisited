const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const { getAllCocktails } = require('../model/cocktail');

// Aufgabe 4
// Implementiere die Route, welche Namen und Preise aller Cocktails zurückliefert

router.get(
  '/all_cocktails',
  asyncHandler(async (req, res) => {
    const result = await getAllCocktails();
    res.status(result.code).json(result);
  }),
);

module.exports = router;
