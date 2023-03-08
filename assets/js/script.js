var ingredientsEl = document.getElementById('ingredients');
var mealIngredientsEl = document.getElementById('mealIngredients');

function getRandomDrink() {
  var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  var ingredients = [];
  
  fetch(requestUrl)
    .then(function (response) {
      return response.json().then(function(data) {
        // console.log('random drink', data);
        console.log('strDrink', data.drinks[0].strDrink);
        console.log('strDrink', data.drinks[0].strInstructions);
        console.log('strDrink', data.drinks[0].strDrinkThumb);
        console.log('strDrink', data.drinks[0].strGlass);
        // console.log('strDrink', data.drinks[0].strIngredient1);

        var drinkData = data.drinks[0];
        // console.log('drink data', drinkData);
        for (var key in drinkData) {
          if (key.startsWith('strIngredient')) {
            if (!drinkData[key]) {
              delete drinkData[key];
            } else {
              var singleIngredient = drinkData[key];
              ingredients.push(singleIngredient);
              // console.log('singleingredient', singleIngredient);
            }
          }
        }
        renderIngredients(ingredients);
        // console.log('ingredients', ingredients);
      });
    });
};

function renderIngredients(ingredients) {
  // console.log('ingredients in render', ingredients);

  var drinkIngredientsHeading = document.createElement('h2');
  drinkIngredientsHeading.textContent = 'Drink Ingredients';
  ingredientsEl.appendChild(drinkIngredientsHeading);

  for (var i = 0; i < ingredients.length; i++) {
    var ingredientEl = document.createElement('p');
    ingredientEl.textContent = ingredients[i];
    ingredientsEl.appendChild(ingredientEl);
  }
}

getRandomDrink();


function getRandomRecipe() {
  var requestRecipe = 'https://www.themealdb.com/api/json/v1/1/random.php';
  var mealIngredients = [];

  fetch(requestRecipe)
    .then(function (response) {
      return response.json().then(function(data) {
        console.log('random recipe', data);
        console.log('mealname', data.meals[0].strMeal);
        console.log('mealpicture', data.meals[0].strMealThumb);
        console.log('mealrecipe', data.meals[0].strInstructions);
        // console.log('mealingredients', data.meals[0].strMeal);

        var mealData = data.meals[0];
        console.log('mealData', mealData);
        for (var key in mealData) {
          if (key.startsWith('strIngredient')) {
            if (!mealData[key]) {
              delete mealData[key];
            } else {
              var singleMealIngredient = mealData[key];
              mealIngredients.push(singleMealIngredient);
            }
          }
        }
        renderMealIngredients(mealIngredients);
      });
    });
};

function renderMealIngredients(mealIngredients) {
  console.log('ingredients in render', mealIngredients);

  var mealIngredientsHeading = document.createElement('h2');
  mealIngredientsHeading.textContent = 'Meal Ingredients';
  mealIngredientsEl.appendChild(mealIngredientsHeading);

  for (var i = 0; i < mealIngredients.length; i++) {
    var mealIngredientEl = document.createElement('p');
    mealIngredientEl.textContent = mealIngredients[i];
    mealIngredientsEl.appendChild(mealIngredientEl);
  }
}

getRandomRecipe();



