console.log('hello');

function getRandomDrink() {
  var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  
  fetch(requestUrl)
    .then(function (response) {
      return response.json().then(function(data) {
        console.log('random drink', data);
      })
    })
};

getRandomDrink();

function getRandomRecipe() {
  var requestRecipe = 'https://www.themealdb.com/api/json/v1/1/random.php';

  fetch(requestRecipe)
    .then(function (response) {
      return response.json().then(function(data) {
        console.log('random recipe', data);
      })
    })
};

getRandomRecipe();



