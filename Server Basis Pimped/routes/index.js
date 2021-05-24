const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const { getAllCocktails, getCocktail } = require('../model/cocktail');

// Aufgabe 4
// Implementiere die Route, welche Namen und Preise aller Cocktails zurückliefert

router.get(
  '/allcocktails',
  asyncHandler(async (req, res) => {
    const result = await getAllCocktails();
    res.status(result.code).json(result);
  }),
);

// Aufgabe 5
router.get(
  '/:name/Zutaten',
  asyncHandler(async (req, res) => {
    const result = await getCocktail(req.params.name);
    res.status(result.code).json(result);
  }),
);

module.exports = router;
