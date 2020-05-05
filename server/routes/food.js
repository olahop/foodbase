const express = require('express');
const Food = require('../models/Food');

const router = express.Router();

/* 
GET api/food/many/
params: filter, range, sort, sortDir, search
returns all foods which satisfy the given parameters
*/
router.get('/many', async function(req, res, next) {
  const { filter, range, sort, sortAsc, search } = req.query;
  let food, sortDirection, sorting, startRange

  { sortAsc ? sortDirection = 1 : sortDirection = -1 }
  { sort ? sorting = sort : sorting = 'Name'}
  { range ? startRange = parseInt(range) : startRange = 0}

  if (filter && search) {
    food = await Food.find({ 
      Category: filter,
      Name: new RegExp(search, 'i')
    }, 'Name Fat Carbohydrates Protein', function (err, docs) { })
    .sort({[sorting]: sortDirection})
    .limit(20)
    .skip(startRange)

  } else if (filter && filter !== 'Alle') {
    food = await Food.find({ 
      Category: filter
    }, 'Name Fat Carbohydrates Protein', function (err, docs) { })
    .sort({[sorting]: sortDirection})
    .limit(20)
    .skip(startRange)

  } else if (search) {
    food = await Food.find({ 
      Name: new RegExp(search, 'i')
    }, 'Name Fat Carbohydrates Protein', function (err, docs) { })
    .sort({[sorting]: sortDirection})
    .limit(20)
    .skip(startRange)

  } else {
    food = await Food.find({ }, 
    'Name Fat Carbohydrates Protein', function (err, docs) { })
    .sort({[sorting]: sortDirection})
    .limit(20)
    .skip(startRange)
  }

  res.send({ food });
});

/* 
GET api/food/one/:id
returns all information about the foods specified by id
*/
router.get('/one/:id', async function(req, res, next) {
  const { id } = req.params

  const food = await Food.findOne({ _id: id}, function (err, docs) { })

  res.send( food );
});

/* 
PUT api/food/:id
adds a value and recalculate to the food with req.params.id and return the updated food-object
*/
router.put('/:id', async function(req, res, next) {
  const { value } = req.body
  let numOfRatings, newRating

  const oldFood = await Food.findOne({ _id: req.params.id}, function (err, docs) { })

  numOfRatings = oldFood.NumOfRatings + 1
  
  if(oldFood.NumOfRatings && oldFood.Rating) {
    newRating = (((oldFood.Rating)*(oldFood.NumOfRatings))+value)/numOfRatings
  } else {
    newRating = value
  }

  const updatedFood = await Food.findOneAndUpdate({ _id: req.params.id}, {
    Rating: newRating,
    NumOfRatings: numOfRatings
  }, {
    new: true
  });
  
  res.send({ updatedFood });
});

module.exports = router;
