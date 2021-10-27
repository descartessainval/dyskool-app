const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Game = require('../models/game');

//create gmae
// //@route                POST/api/v2/games
// //@desc                 Add a new game
// //@access               Private
exports.createGame = asyncHandler(async (req, res, next) => {
  const game = await Game.create(req.body);
  res.status(201).json({
    success: true,
    game: game,
  });
  // if (!req.body) {
  //   return res.status(400).json({ message: 'content can not be empty' });
  // }
  // // create a gale
  // const game = new Game({
  //   ...req.body,
  // });
  // //save a game
  // game
  //   .save()
  //   .then((game) => {
  //     if (!game) {
  //       res.status(400).json({
  //         message: 'some error occured while creating the game',
  //       });
  //     } else {
  //       res.status(201).json({
  //         success: true,
  //         game: game,
  //       });
  //     }
  //   })
  //   .catch((err) =>
  //     res.status(400).json({
  //       error: err,
  //     })
  //   );
});

// //@route                GET /api/v2/games
// //@desc                 get all games
// //@access               Private
exports.getGames = asyncHandler(async (req, res, next) => {
  const games = await Game.find();
  if (!games) {
    return next(`Cannot get games. Maybe games was not found`, 401);
  }
  res.status(201).json({
    success: true,
    count: games.length,
    games: games,
  });
  // Game.find()
  //   .then((game) => {
  //     if (!game) {
  //       res.status(400).json({
  //         message: `cannot get games. Maybe  games  were not found`,
  //       });
  //     } else {
  //       res.status(201).json({
  //         success: true,
  //         count: game.length,
  //         game: game,
  //       });
  //     }
  //   })
  //   .catch((err) => res.status(500).json(err));
});

// retrieve  game by ID
// //@route                GET /api/v2/game/:id
// //@desc                 Get single game
// //@access               Private
exports.getGame = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const game = await Game.findById(id);
  if (!game) {
    return next(
      new ErrorResponse(
        `Cannot get game with id-${id}. Maybe game was not found`,
        401
      )
    );
  }
  res.status(200).json({
    success: true,
    game: game,
  });
  // Game.findById(id)
  //   .then((game) => {
  //     if (!game) {
  //       res.status(401).json({
  //         message: `cannot get game exercice  with  id-${id} . Maybe is not found!`,
  //       });
  //     } else {
  //       res.status(200).json({
  //         success: true,
  //         game: game,
  //       });
  //     }
  //   })
  //   .catch((error) =>
  //     res.status(404).json({
  //       error: `cannot get game exercice  with  id-${id} . Maybe is not found!`,
  //     })
  //   );
});

// update a game
// //@route                PUT /api/v2/game/:id
// //@desc                 Update single game
// //@access               Private
exports.upDateGame = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let game = await Game.findById(id);
  if (!game) {
    return next(new ErrorResponse(`game not found with id ${id}`, 404));
  }
  game = await Game.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    msg: `Update game ${id}`,
    game: game,
  });
  //   if (!req.body) {
  //     res.status(400).json({ message: 'data update can not be empty' });
  //     return;
  //   }
  //   const id = req.params.id;
  //   Game.findByIdAndUpdate(id, req.body, {
  //     new: true,
  //     runValidators: true,
  //   })
  //     .then((game) => {
  //       if (!game) {
  //         res.status(400).json({
  //           msg: `cannot update update game exercice  with  id-${id}, maybe game-exercice is not found `,
  //         });
  //       } else {
  //         res.status(200).json({
  //           success: true,
  //           msg: `Update game exercice ${id}`,
  //           game: game,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
});

// delete a game
// //@route                DELETE /api/v2/game/:id
// //@desc                 Delete single game
// //@access               Private
exports.deleteGame = asyncHandler(async (req, res) => {
  const id = req.params.id;
  let game = await Game.findById(id);
  if (!game) {
    return next(new ErrorResponse(`game not found with id ${id}`, 404));
  }

  await game.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
  // Game.findByIdAndRemove(id)
  //   .then((data) => {
  //     if (!data) {
  //       res.status(400).json({
  //         message: `cannot delete game exercice  with  id-${id}. Maybe game  was not found! `,
  //       });
  //     } else {
  //       res.status(200).json({ success: true, data: {} });
  //     }
  //   })
  //   .catch((err) => res.status(500).json(err));
});
