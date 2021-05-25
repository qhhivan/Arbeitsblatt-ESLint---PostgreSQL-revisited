const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const {
  getAllCocktails,
  getCocktail,
  filterByPrice,
  deleteCocktail,
  createCocktail,
  updatePrice,
} = require('../model/cocktail');

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

// Aufgabe 6
router.get(
  '/cocktail/:price',
  asyncHandler(async (req, res) => {
    const result = await filterByPrice(req.params.price);
    res.status(result.code).json(result);
  }),
);

router.get(
  '/cocktail/',
  asyncHandler(async (req, res) => {
    const result = await filterByPrice(req.query.price);
    res.status(result.code).json(result);
  }),
);

// Aufgabe 7
router.delete(
  '/cocktail/:name',
  asyncHandler(async (req, res) => {
    const result = await deleteCocktail(req.params.name);
    res.status(result.code).json(result);
  }),
);

// Aufgabe 8
// Post ist INSERT
router.post(
  '/newCocktail/',
  asyncHandler(async (req, res) => {
    const result = await createCocktail(req.body);
    res.status(result.code).json(result);
  }),
);

// Aufgabe 9
// PATCH ist Update
router.patch(
  '/cocktail/:name',
  asyncHandler(async (req, res) => {
    const result = await updatePrice(req.params.name, req.body.preis);
    res.status(result.code).json(result);
  }),
);

module.exports = router;
