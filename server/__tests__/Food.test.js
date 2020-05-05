const fetch = require('node-fetch');

const serverUrl = 'http://localhost:4000/';

const getManyReferance = 
{
  'food': [
      {
          '_id': '5daac8f909725e8d3f6086aa',
          'Name': 'Fruktpuré, med eple, jordbær, banan og blåbær, fra 6 mnd, HiPP',
          'Fat': 0.1,
          'Protein': 0.3,
          'Carbohydrates': 11.2
      },
      {
          '_id': '5daac8f909725e8d3f6086a9',
          'Name': 'Fruktpuré, med eple, fersken, blåbær og bringebær, fra 6 mnd, HiPP',
          'Fat': 0.1,
          'Protein': 0.4,
          'Carbohydrates': 10.8
      }
  ]
}

const getOneReferance = 
  {
    'Rating': 0,
    'NumOfRatings': 0,
    '_id': '5daac8f709725e8d3f60804a',
    'Name': 'Kremfløte, 38 % fett, laktosefri',
    'Fat': 38,
    'Protein': 2.1,
    'Carbohydrates': 3,
    'Category': 'Meieriprodukter',
    'KiloJoule': 1493,
    'KiloCalories': 362,
    '__v': 0
  }

describe('GET api/food/one/:id test', () => {
  it('should test that all info on one item is retrieved', async () => {
    fetch(serverUrl + 'api/food/one/5daac8f709725e8d3f60804a', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(response => expect(response).toEqual(getOneReferance))
  });
});

describe('GET api/food/many/ test', () => {
  it('should test that info on specified items are retrieved', async () => {
    const filter = 'Spedbarnsmat';
    const search = 'blåbær';
    const sort = 'Protein';
    const sortAsc = 'true';
    const range = '0'
    const fetchURl = (serverUrl + 'api/food/many?'
      + 'filter=' + filter + '&'
      + 'search=' + search + '&'
      + 'sort=' + sort + '&'
      + 'sortAsc=' + sortAsc + '&'
      + 'range=' + range
    )

    fetch(fetchURl, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(response => expect(response).toEqual(getManyReferance))
  });
});

describe('PUT api/food/:id test', () => {
  it('should test that rating change after called and new rating is returned', async () => {
    const testRating = Math.floor(Math.random() * 6);
    let oldRating, oldNumOfRatings, ratingReferance

    await fetch(serverUrl + 'api/food/one/5daac8f709725e8d3f60805c', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(response => {
      oldRating = response.Rating; 
      oldNumOfRatings = response.NumOfRatings;
    })

    const numOfRatingsReferance = oldNumOfRatings + 1
    if(oldNumOfRatings) {
      ratingReferance = ((oldRating * oldNumOfRatings) + testRating) / numOfRatingsReferance
    } else {
      ratingReferance = testRating
    }
    
    await fetch(serverUrl + 'api/food/5daac8f709725e8d3f60805c', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        'value': testRating
      })
    })
    .then(res => res.json())
    .then(response => {
      expect(response.updatedFood.Rating).toEqual(ratingReferance);
      expect(response.updatedFood.NumOfRatings).toEqual(numOfRatingsReferance);
    })
  });
});
