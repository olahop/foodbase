const express = require('express');
const Food = require('../models/Food');
const xlsx = require('node-xlsx');

const router = express.Router();

/* 
GET setup/
development route that adds the data from models/Matvaretabellen.xslx to the database
*/
router.get('/', async function(req, res, next) {

    const completeDocument = xlsx.parse('data/Matvaretabellen.xlsx');
    const foods = completeDocument[0].data

    var currentCategory = ''
    var food
    for (food of foods) {
        if (food[0] === Math.round(food[0])) {
            switch(food[0]) {
                case 1:
                  currentCategory = 'Meieriprodukter'
                  break;
                case 2:
                  currentCategory = 'Egg'
                  break;
                case 3:
                  currentCategory = 'Kjøtt'
                  break;
                case 4:
                  currentCategory = 'Sjømat'
                  break;
                case 5:
                  currentCategory = 'Korn- og bakervarer'
                  break;
                case 6:
                  currentCategory = 'Grønnsaker, frukt og bær'
                  break;
                case 7:
                  currentCategory = 'Sukker og søte produkter'
                  break;
                case 8:
                  currentCategory = 'Margarin, smør, matolje o.l.'
                  break;
                case 9:
                  currentCategory = 'Drikke'
                  break;
                case 10:
                  currentCategory = 'Div ferdigretter, produkter og ingredienser'
                  break;
                case 11:
                  currentCategory = 'Spedbarnsmat'
                  break;
            }
        }
        if (food[2] && food[2] !== 'Spiselig del' && food[2] !== '%') {
            const newFood = new Food({ 
                Name: food[1], 
                Fat: food[10],
                Protein: food[66],
                Carbohydrates: food[56],
                Category: currentCategory,
                KiloJoule: food[6],
                KiloCalories: food[8],
            })
            await newFood.save()
        }
    }
    res.send('DB data added')
});

/* 
DELETE setup/
development route that removes all data from the database
*/
router.delete('/', async function(req, res, next) {

  await Food.deleteMany({});

  res.send('DB data deleted')
});

module.exports = router;
