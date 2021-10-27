const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Definition = require('../models/Definition');

//retrieve all definititons from the DB
//route                 GET /api/v2/maths
//@desc(description)    Get All Definition
//@access               Private
exports.getDefinitions = asyncHandler(async (req, res, next) => {
  const definitions = await Definition.find();
  if (!definitions) {
    return next(
      new ErrorResponse(
        `Cannot get Definition. Maybe Definition was not found`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    count: definitions.length,
    definitions: definitions,
  });

  // step1=> promisse
  // Definition.find()
  //   .then((definitions) => {
  //     if (!definitions) {
  //       res.status(400).json({
  //         message: `cannot found Definitions. Maybe Definition was not found`,
  //       });
  //     } else {
  //       res.status(201).json({
  //         success: true,
  //         count: definitions.length,
  //         definitions: definitions,
  //       });
  //     }
  //   })
  //   .catch((error) => res.status(400).json(error));
});

//Route                 POST /api/v2/definitions
//@desc(description)    Add a new definition
//@access               Private
exports.createDefinition = asyncHandler(async (req, res, next) => {
  const definition = await Definition.create(req.body);
  res.status(201).json({
    success: true,
    definition: definition,
  });

  // step 1 promisse
  // // create a definition
  // const definition = new Definition({
  //   ...req.body,
  // });
  // //save a definition
  // definition
  //   .save()
  //   .then((definition) => {
  //     if (!definition) {
  //       res.status(400).json({
  //         message: 'some error occured while creating the definition',
  //       });
  //     } else {
  //       res.status(201).json({
  //         success: true,
  //         definition: definition,
  //       });
  //     }
  //   })
  //   .catch((err) =>
  //     res.status(400).json({
  //       error: err,
  //     })
  //   );
});

//retrieve  definititon by id from the DB
//route                 GET /api/v2/maths/:id
//@desc(description)    Get single math
//@access               Private
exports.getDefinition = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const definition = await Definition.findById(id);
  if (!definition) {
    return next(
      new ErrorResponse(
        `Cannot get Definition with id-${id}. Maybe Definition was not found`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    definition: definition,
  });

  // Definition.findOne({ _id: id })
  //   .then((definition) => {
  //     if (!definition) {
  //       res.status(404).json({az
  //         message: `Cannot get Definition with id-${id}. Maybe Definition was not found `,
  //       });
  //     } else {
  //       res.status(200).json({
  //         success: true,
  //         definition: definition,
  //       });
  //     }
  //   })
  //   .catch((error) => res.status(500).json(error));
});

// update a definition by id
//Route                 PUT /api/v2/definitions
//@desc(description)    Update a single definition
//@access               Private
exports.updateDefinition = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let definition = await Definition.findById(id);
  if (!definition) {
    return next(new ErrorResponse(`Definition not found with id ${id}`, 404));
  }
  definition = await Definition.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    msg: `Update definition ${id}`,
    definition: definition,
  });
  // step 1 promisse
  // if (!req.body) {
  //   res.status(400).json({ message: 'data update can not be empty' });
  // }
  // const id = req.params.id;
  // Definition.findByIdAndUpdate(id, req.body, {
  //   new: true,
  //   runValidators: true,
  // })
  //   .then((definition) => {
  //     if (!definition) {
  //       res.status(400).json({
  //         msg: `cannot update update definition exercice  with  id-${id}, maybe definitions-exercice is not found `,
  //       });
  //     } else {
  //       res.status(200).json({
  //         success: true,
  //         msg: `Update definition exercice ${id}`,
  //         definition: definition,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

// delete definition with the specified id in the request
// //@route                DELETE /api/v2/game/:id
// //@desc(description)    Delete single game
// //@access               Private
exports.deleteDefinition = asyncHandler(async (req, res, err, next) => {
  const definition = await Definition.findById(req.params.id);
  if (!definition) {
    return next(
      new ErrorResponse(`Definition not found with id ${req.params.id}`, 404)
    );
  }
  await definition.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
  // step 1 promisse
  // const id = req.params.id;
  // Definition.findByIdAndRemove({ _id: id })
  //   .then((data) => {
  //     if (!data) {
  //       res.status(404).json({
  //         message: `cannot delete Definition with id-${id}. Maybe Definition was not found `,
  //       });
  //     } else {
  //       res.status(200).json({ success: true, data: {} });
  //     }
  //   })
  //   .catch((err) => res.status(400).json(err));
});

// type async structure
// exports.blabla = async (req, res) => {

//   try {
//     const blabla = await blabla.find();
//     if (!blabla) {
//       return res.status(400).json({ success: false });
//     }
//     res.statu(200).json({ success: true, data: blabla });
//   } catch (error) {
//     res.status(404).json({ success: false });
//   }
// };
