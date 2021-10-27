const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Maths = require('../models/Maths');
const jwt_secret = process.env.JWT_SECRET_KEY;

//route                 GET /api/v2/maths
//@desc(description)    Get All Maths
//@access               Private user
exports.getMaths = asyncHandler(async (req, res, next) => {
  const maths = await Maths.find();
  if (!maths) {
    return next(
      new ErrorResponse(`Cannot get Maths. Maybe maths were not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    count: maths.length,
    maths: maths,
  });
  // Maths.find()
  //   .then((mathExercices) => {
  //     if (!mathExercices) {
  //       res.status(400).json({
  //         message: `cannot get Maths exercices. Maybe  Maths exercices were not found`,
  //       });
  //     } else {
  //       res.status(201).json({
  //         success: true,
  //         count: mathExercices.length,
  //         mathExercices: mathExercices,
  //       });
  //     }
  //   })
  //   .catch((err) => res.status(500).json(err));
});

//route                 POST /api/v2/maths
//@desc(description)    Add maths
//@access               Private
//create maths
exports.createMaths = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const math = await Maths.create(req.body);
  res.status(201).json({
    success: true,
    math: math,
  });

  // // validate request
  // if (!req.body) {
  //   res.status(400).json({ message: 'content can not be empty' });
  //   return;
  // }
  // const maths = new Maths({
  //   ...req.body,
  // });
  // console.log(res.body);
  // maths
  //   .save()
  //   .then(() => res.status(201).json({ success: true, math: maths }))
  //   .catch((err) => res.status(400).json(err));
});

//route                 GET /api/v2/maths/:id
//@desc(description)    Get single math
//@access               Private
exports.getMath = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const math = await Maths.findById(id);
  if (!math) {
    return next(`Cannot get math id ${id}. Maybe can't be found`, 404);
  }
  res.status(200).json({
    success: true,
    math: math,
  });
  // Maths.findById(id)
  //   .then((math) => {
  //     if (!math) {
  //       res.status(404).json({
  //         message: `cannot get math exercice  with  id-${id} . Maybe is not found!`,
  //       });
  //     } else {
  //       res.status(200).json({
  //         success: true,
  //         math: math,
  //       });
  //     }
  //   })
  //   .catch((error) =>
  //     res.status(404).json({
  //       error: `cannot get math exercice  with  id-${id} . Maybe is not found!`,
  //     })
  //   );
});

//route                 PUT /api/v2/maths/:id
//@desc(description)    Update a single maths
//@access               Private
exports.modifyMaths = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let maths = await Maths.findById(id);
  if (!maths) {
    return next(new ErrorResponse(`maths not found with id ${id}`, 404));
  }
  maths = await Maths.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    msg: `Update maths ${id}`,
    maths: maths,
  });
  // Maths.findByIdAndUpdate(id, req.body, {
  //   new: true,
  //   runValidators: true,
  // })
  //   .then((maths) => {
  //     if (!maths) {
  //       res.status(400).json({
  //         msg: `cannot update update maths exercice  with  id-${id}, maybe Mth-exercice is not found `,
  //       });
  //     } else {
  //       res.status(200).json({
  //         success: true,
  //         msg: `Update maths exercice ${id}`,
  //         maths: maths,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

//route                 DELETE /api/v2/maths/:id
//@desc(description)    Delete a single math
//@access               Private
exports.deleteMaths = asyncHandler(async (req, res, next) => {
  // step 3
  const id = req.params.id;
  let maths = await Maths.findById(id);
  if (!maths) {
    return next(new ErrorResponse(`mathsnot found with id ${id}`, 404));
  }
  await maths.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
  // step 1
  //   Maths.deleteOne({ _id: req.params.id })
  //     .then(() => res.status(200).json({ message: 'objet supprimé' }))
  //     .catch((error) => res.status(400).json({ error }));
  // step2
  // const id = req.params.id;
  // Maths.findByIdAndRemove(id)
  //   .then((data) => {
  //     if (!data) {
  //       res.status(400).json({
  //         message: `cannot delete maths exercice  with  id-${id}. Maybe maths exercice was not found! `,
  //       });
  //     } else {
  //       res.status(200).json({ success: true, data: {} });
  //     }
  //   })
  //   .catch((err) => res.status(500).json(err));
});
