const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const French = require('../models/French');

//route                 GET /api/v2/frenchs
//@desc(description)    Get All French exercices
//@access               Private
exports.getFrenchs = asyncHandler(async (req, res, next) => {
  const frenchExercices = await French.find();
  if (!frenchExercices) {
    return next(
      new ErrorResponse(
        'cannot get French exercices. Maybe  French exercices were not found',
        404
      )
    );
  }
  res.status(201).json({
    success: true,
    count: frenchExercices.length,
    frenchExercices: frenchExercices,
  });
  //step1 => promise
  // French.find()
  //   .then((frenchExercices) => {
  //     if (!frenchExercices) {
  //       res.status(400).json({
  //         message: `cannot get French exercices. Maybe  French exercices were not found`,
  //       });
  //     } else {
  //       res.status(201).json({
  //         success: true,
  //         count: frenchExercices.length,
  //         frenchExercices: frenchExercices,
  //       });
  //     }
  //   })
  //   .catch((error) => res.status(500).json({ error }));
});

//Route                 POST /api/v2/frenchs
//@desc(description)    Add a new french exercice
//@access               Private for user
exports.createFrench = asyncHandler(async (req, res, next) => {
  const french = await French.create(req.body);
  res.status(201).json({
    success: true,
    french: french,
  });

  //Pormisse
  //create a french exercice
  // const french = new French({
  //   ...req.body,
  // });
  // console.log(res.body);
  // //savea exercice french inthe dataBase
  // french
  //   .save()
  //   .then(() => res.status(201).json({ success: true, french: french }))
  //   .catch((error) => res.status(400).json({ error }));
});

//route                 GET /api/v2/frenchs/:id
//@desc(description)    Get single french exercice
//@access               Private
exports.getFrench = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const french = await French.findById(id);
  if (!french) {
    return next(
      new ErrorResponse(
        `Cannot get french with id-${id}. Maybe french was not found`,
        401
      )
    );
  }
  res.status(200).json({
    success: true,
    french: french,
  });
  // step 1=>promisse
  // const id = req.params.id;
  // French.findOne({ _id: id })
  //   .then((french) => {
  //     if (!french) {
  //       res.status(404).json({
  //         message: `cannot get french exercice  with  id-${id} . Maybe is not found!`,
  //       });
  //     } else {
  //       res.status(200).json({
  //         success: true,
  //         french: french,
  //       });
  //     }
  //   })
  //   .catch((error) =>
  //     res.status(404).json({
  //       error: `cannot get french exercice  with  id-${id} . Maybe is not found!`,
  //     })
  //   );
});

// Update a french exercice by the id in the request
//Route                 PUT /api/v2/definitions
//@desc(description)    Update a single definition
//@access               Private
exports.modifyFrench = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let french = await French.findById(id);
  if (!french) {
    return next(
      new ErrorResponse(
        `cannot update update french exercice  with  id-${id}, maybe fr-exercice is not found `,
        404
      )
    );
  }
  french = await French.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    msg: `Update French exercice ${id}`,
    french: french,
  });
  // step 1 => promisse
  //   if (!req.body) {
  //     res.status(400).json({ message: 'data update can not be empty' });
  //     return;
  //   }
  //   const id = req.params.id;
  //   French.findByIdAndUpdate(id, req.body, {
  //     new: true,
  //     runValidators: true,
  //   })
  //     .then((french) => {
  //       if (!french) {
  //         res.status(400).json({
  //           msg: `cannot update update french exercice  with  id-${id}, maybe fr-exercice is not found `,
  //         });
  //       } else {
  //         res.status(200).json({
  //           success: true,
  //           msg: `Update French exercice ${id}`,
  //           french: french,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
});

// //@route                DELETE /api/v2/frenchs/:id
// //@desc(description)    Delete single french
// //@access               Private
exports.deleteFrench = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const french = await French.findById(id);
  if (!french) {
    return next(
      new ErrorResponse(
        `cannot delete french exercice  with  id-${id}. Maybe French exercice was not found`,
        404
      )
    );
  }
  await french.remove();
  res.status(200).json({ success: true, data: {} });
  //step1 promisse
  // const id = req.params.id;
  // French.deleteOne({ _id: id })
  //   .then((data) => {
  //     if (!data) {
  //       res.status(400).json({
  //         message: `cannot delete french exercice  with  id-${id}. Maybe French exercice was not found! `,
  //       });
  //     } else {
  //       res.status(200).json({ success: true, data: {} });
  //     }
  //   })
  //   .catch((error) => res.status(500).json(error));
});
