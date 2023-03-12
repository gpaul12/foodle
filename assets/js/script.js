var drinkIngredientsEl = document.getElementById("drinkIngredients");
var mealIngredientsEl = document.getElementById("mealIngredients");
var getFoodleButton = document.getElementById("get-foodle");
var mealPictureEl = document.getElementById("mealPicture");
var drinkPictureEl = document.getElementById("drinkPicture");
var saveButton = document.getElementById('save-button');
var clearButton = document.getElementById('clear-button');
var myFoodlesEl = document.getElementById('myFoodles');

var myFoodles = [];
var mealResult;
var drinkResult;

var modalInstructionsEl = document.getElementById("modal-instructions");
var modalFoodtitleEl = document.getElementById("modal-food-title");
var modalMealPicEl = document.getElementById("modal-meal-picture");
var modalDrinkPicEl = document.getElementById("modal-drink-image-container");
var modalMealIngEl = document.getElementById("modal-ingredients");

getFoodleButton.addEventListener("click", function () {
  // need to add code to clear out the previous foodle search before rendering the new one
  mealResult = getRandomMeal();
  drinkResult = getRandomDrink();
});

saveButton.addEventListener('click', function() {

  var myFoodle = {
    mealIngredients: mealResult.ingredients,
    mealImg: mealResult.img,
    mealTitle: mealResult.title,
    mealInstructions: mealResult.instructions,
    drinkIngredients: drinkResult.ingredients,
    drinkImg: drinkResult.img,
    drinkTitle: drinkResult.title,
    drinkInstructions: drinkResult.instructions,
  };

  console.log('myFoodle', myFoodle);

  var storedFoodles = JSON.parse(localStorage.getItem("myFoodles"));

  if (storedFoodles !== null) {
    myFoodles = storedFoodles;
  }

  myFoodles.push(myFoodle);
  localStorage.setItem('myFoodles', JSON.stringify(myFoodles));
  renderMyFoodles();
});

clearButton.addEventListener('click', function(){
  localStorage.removeItem('myFoodles');
});

function getRandomMeal() {
  var requestRecipe = "https://www.themealdb.com/api/json/v1/1/random.php";
  var meal = {
    ingredients: [],
  };

  fetch(requestRecipe).then(function (response) {
    return response.json().then(function (data) {

      meal.img = data.meals[0].strMealThumb;
      meal.title = data.meals[0].strMeal;
      meal.instructions = data.meals[0].strInstructions;

      modalMealPicEl.setAttribute("src", data.meals[0].strMealThumb);
      modalInstructionsEl.textContent = data.meals[0].strInstructions;
      modalFoodtitleEl.textContent = data.meals[0].strMeal;
      

      var mealData = data.meals[0];
      for (var key in mealData) {
        if (key.startsWith("strIngredient")) {
          if (!mealData[key]) {
            delete mealData[key];
          } else {
            var singleMealIngredient = mealData[key];
            meal.ingredients.push(singleMealIngredient);
          }
        }
      }
      renderMealIngredients(mealIngredients);
      mealPictureEl.setAttribute("src", data.meals[0].strMealThumb);
    });
  });

  return meal;
}

function renderMealIngredients(mealIngredients) {
  var mealIngredientsHeading = document.createElement("h2");
  mealIngredientsHeading.textContent = "Meal Ingredients";
  mealIngredientsEl.appendChild(mealIngredientsHeading);

  for (var i = 0; i < mealIngredients.length; i++) {
    var mealIngredientEl = document.createElement("p");
    mealIngredientEl.textContent = mealIngredients[i];
    mealIngredientsEl.appendChild(mealIngredientEl);
  }
}

function getRandomDrink() {
  var requestUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  var drink = {
    ingredients: [],
  };

  fetch(requestUrl).then(function (response) {
    return response.json().then(function (data) {

      drink.img = data.drinks[0].strDrinkThumb;
      drink.title = data.drinks[0].strDrink;
      drink.instructions = data.drinks[0].strInstructions;

      modalDrinkPicEl.setAttribute("src", data.drinks[0].strDrinkThumb);


      var drinkData = data.drinks[0];
      for (var key in drinkData) {
        if (key.startsWith("strIngredient")) {
          if (!drinkData[key]) {
            delete drinkData[key];
          } else {
            var singleIngredient = drinkData[key];
            drink.ingredients.push(singleIngredient);
          }
        }
      }
      renderDrinkIngredients(drinkIngredients);
      drinkPictureEl.setAttribute("src", data.drinks[0].strDrinkThumb);
    });
  });
  return drink;
}

function renderDrinkIngredients(ingredients) {
  var drinkIngredientsHeading = document.createElement("h2");
  drinkIngredientsHeading.textContent = "Drink Ingredients";
  drinkIngredientsEl.appendChild(drinkIngredientsHeading);

  for (var i = 0; i < ingredients.length; i++) {
    var ingredientEl = document.createElement("p");
    ingredientEl.textContent = ingredients[i];
    drinkIngredientsEl.appendChild(ingredientEl);
  }
}
//code for Bulma modal
document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });
});

function renderMyFoodles() {
  var savedFoodles = JSON.parse(localStorage.getItem("myFoodles"));

  for (var i = 0; i < savedFoodles.length; i++) {
    var myFoodlesMealPic = document.createElement('img');
    myFoodlesMealPic.setAttribute('src', savedFoodles[i].mealImg);
    myFoodlesEl.appendChild(myFoodlesMealPic);
  }
}

renderMyFoodles();