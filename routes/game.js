const express = require('express');
const {
  createGame,
  getGames,
  getGame,
  upDateGame,
  deleteGame,
} = require('../controllers/game');

const router = express.Router();

// middleware
const { protect, authorize } = require('../middleware/auth');

// validation => method destructuring
const { validateGame } = require('../validators/gameValidator');

router
  .route('/')
  .get(
    // protect,
    getGames
  )
  .post(protect, authorize({ admin: true }), validateGame, createGame);
router
  .route('/:id')
  .get(protect, getGame)
  .put(protect, authorize({ admin: true }), upDateGame)
  .delete(protect, authorize({ admin: true }), deleteGame);

module.exports = router;
