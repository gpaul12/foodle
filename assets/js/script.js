// The following two ids need to be added in the html so that the meal and drink ingredients will render

var drinkIngredientsEl = document.getElementById('drinkIngredients');
var mealIngredientsEl = document.getElementById('mealIngredients');
var getFoodleButton = document.getElementById('get-foodle');

getFoodleButton.addEventListener('click', function() {
  // need to add code to clear out the previous foodle search before rendering the new one
  getRandomMeal();
  getRandomDrink();
});

function getRandomMeal() {
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

  var mealIngredientsHeading = document.createElement('h2');
  mealIngredientsHeading.textContent = 'Meal Ingredients';
  mealIngredientsEl.appendChild(mealIngredientsHeading);

  for (var i = 0; i < mealIngredients.length; i++) {
    var mealIngredientEl = document.createElement('p');
    mealIngredientEl.textContent = mealIngredients[i];
    mealIngredientsEl.appendChild(mealIngredientEl);
  }
}

function getRandomDrink() {
  var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  var drinkIngredients = [];
  
  fetch(requestUrl)
    .then(function (response) {
      return response.json().then(function(data) {
        console.log('strDrink', data.drinks[0].strDrink);
        console.log('strDrink', data.drinks[0].strInstructions);
        console.log('strDrink', data.drinks[0].strDrinkThumb);
        console.log('strDrink', data.drinks[0].strGlass);

        var drinkData = data.drinks[0];
        for (var key in drinkData) {
          if (key.startsWith('strIngredient')) {
            if (!drinkData[key]) {
              delete drinkData[key];
            } else {
              var singleIngredient = drinkData[key];
              drinkIngredients.push(singleIngredient);
            }
          }
        }
        renderDrinkIngredients(drinkIngredients);
      });
    });
};

function renderDrinkIngredients(ingredients) {

  var drinkIngredientsHeading = document.createElement('h2');
  drinkIngredientsHeading.textContent = 'Drink Ingredients';
  drinkIngredientsEl.appendChild(drinkIngredientsHeading);

  for (var i = 0; i < ingredients.length; i++) {
    var ingredientEl = document.createElement('p');
    ingredientEl.textContent = ingredients[i];
    drinkIngredientsEl.appendChild(ingredientEl);
  }
}
